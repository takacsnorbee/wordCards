Vue.component('search-component', {
    template: `
        <div class="search-wrapper">
            <div>
                <h1 class="search-h1">{{this.isEnglish ? 'Search in lists and words' : 'Keresés listák és szavak között'}}</h1>
            </div>
            <div>
                <div class="search-input-wrapper">
                    <input class="search-input" type="text" v-model="searchInput">
                    <span @click="searchInput = ''; sendSearch()">X</span>
                </div>
                <button class="blue-btn search-btn" @click.prevent="sendSearch">{{this.isEnglish ? 'Search' : 'Keresés'}}</button>
            </div>
        </div>
    `,
    data() {
        return {
            searchInput: ''
        }
    },
    computed:{
      isEnglish:{
        get: function(){
            return this.getIsEnglish();
        },
      }
    },
    methods: {
        sendSearch() {
            this.$emit('send-search', this.searchInput);
        }
    },
    inject: ["getIsEnglish"],
});