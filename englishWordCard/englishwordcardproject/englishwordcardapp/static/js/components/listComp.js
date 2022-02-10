Vue.component('list-component', {
    template: `
        <div class="list-comp-wrapper">
            <search-component @send-search="getSearch"></search-component>
            <div v-if="searchInput !== ''" class="list-card-comp-wrapper list-card-comp-wrapper-filtered">
                <list-card-comp v-for="(list, i) in filteredList" 
                                :key="list.id" 
                                :name-of-list="list.list_name"
                                :num-of-learnt="calcLearnt(list.id)"
                                :list-id="list.id"></list-card-comp>
            </div>
            <h1 class="list-comp-h1">{{this.isEnglish ? 'Latest lists' : 'Utólsó listáim'}}</h1>
            <div class="list-card-comp-wrapper">
                <list-card-comp v-for="(list, i) in lists.lists_result" 
                                :key="list.id" 
                                v-if="i == lists.lists_result.length-1 || i == lists.lists_result.length-2"
                                :name-of-list="list.list_name"
                                :num-of-learnt="calcLearnt(list.id)"
                                :list-id="list.id"></list-card-comp>
                <div v-if="newListModal && lists.is_loged_in" class="list-card list-card-add-new" @click.stop="newListModal = !newListModal"><img src="/static/img/content/cross.svg" ></div>
                <div v-else-if="!newListModal && lists.is_loged_in" class="list-card list-card-add-new-form-wrapper" v-click-outside="clickOutside">
                    <div @click="newListModal = !newListModal" class="list-card-add-new-back-btn">
                        <h3>{{isEnglish ?  'Cancel' : 'Mégsem'}}</h3>
                    </div>
                    <div class="list-card-add-new-body">
                        <label>{{isEnglish ?  'List name:' :  'Lista neve'}}</label>
                        <input v-model="listNameInput" type="text">
                        <label>{{isEnglish ?  'Description:' :  'Leírás'}}</label>
                        <input v-model="listDescInput" type="text">
                    </div>
                    <div @click="addNewList" class="list-card-add-new-save-btn">
                        <h3>{{isEnglish ?  'Save' : 'Mentés'}}</h3>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            searchInput: '',
            filteredList: [],
            newListModal: true,
            listNameInput: '',
            listDescInput: '',
        }
    },
    component: {
        searchField: 'search-component',
        listCard: 'list-card-comp',
    },
    watch: {
        searchInput() {
            let listsId = [];
            this.filteredList.length = 0;
            if(this.words.words_result != undefined){
                this.words.words_result.map((e) => {
                    if(e.word_away.includes(this.searchInput) || e.word_home.includes(this.searchInput)) {
                        if (!listsId.includes(e.list_of_word_id)) {
                            listsId.push(e.list_of_word_id);
                          }
                    }
                })
                this.lists.lists_result.map((e) => {
                    if(listsId.includes(e.id)) {
                        this.filteredList.push(e);
                    }
                })
            }
            return null;
        }
    },
    methods: {
        clickOutside() {
            this.newListModal = !this.newListModal;
        },
        getSearch(text) {
            this.searchInput = text;
        },
        addNewList() {
            let tempName = this.listNameInput;
            let tempDesc = this.listDescInput;
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.post('/addNewList/', JSON.stringify({'list_name': tempName, 'list_description': tempDesc}))
                .then(function(response) {
                    location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        calcLearnt(id) {
            let sumOfLearnt = 0;
            let percentage = 0;
            let sumOfWords = 0;
            if(this.words.words_result != undefined){
                this.words.words_result.map((e) => {
                    if(e.list_of_word_id === id) {
                        sumOfWords++;
                        if(e.learnt === true) {
                            sumOfLearnt++;
                        }
                    }
                })
                percentage = (sumOfLearnt / sumOfWords * 100).toFixed(2);
            }
            return {'sumOfLearnt': sumOfLearnt, 'percentage': percentage, 'sumOfWords': sumOfWords};
        }
    },
    computed:{
      isEnglish: {
        get: function() {
            return this.getIsEnglish();
        }
      }
    },
    props: ['lists', 'words'],
    inject: ["getIsEnglish"]
});