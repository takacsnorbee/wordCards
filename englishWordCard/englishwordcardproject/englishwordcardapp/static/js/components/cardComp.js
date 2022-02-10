Vue.component('card-component', {
    template: `
        <div class="card-comp-wrapper">
            <div class="card-function-btn-wrapper">
                <div @click="addNewCard" class="blue-btn card-funtion-btn-new">{{isEnglish ? 'Add new card' : 'Új kártya'}}</div>
                <span class="card-function-title">{{actualList.list_name}}</span>
                <div @click="getRandomCard" class="blue-btn card-funtion-btn-random"><img src="/static/img/content/random-icon-button.svg">&nbsp;&nbsp;{{isEnglish ? 'Random card' : 'Véletlenszerű'}}</div>
            </div>
            <div class="card-main-card-wrapper">
                <div class="card-step-left" @click="setSelectedIndexByBtn(-1)"><img src="/static/img/content/arrow-left.svg"></div>
                <div class="card-wrapper">
                    <div class="card-main-top-line">
                        <span v-if="sideAway">{{isEnglish ? 'Foreign - Nativ' : 'Idegen - Anyanyelv'}}</span>
                        <span v-else>{{isEnglish ? 'Nativ - Foreign' : 'Anyanyelv - Idegen'}}</span>
                        <span><img @click="deleteCardBtn" class="card-main-top-line-img" src="/static/img/content/trash-icon.svg"></span>
                    </div>
                    <div class="card-main-word">
                        <span>{{sideAway ? selectedWord.word_away : selectedWord.word_home}}</span>
                    </div>
                    <div class="card-main-meanings-line">
                        <span>{{isEnglish ? 'Meanings' : 'Jelentések'}}</span>
                    </div>
                    <div class="card-main-meanings-details-line">
                        <span>{{selectedWord.word_description.length === 0 ? 'NaN' : selectedWord.word_description}}</span>
                    </div>
                    <div class="card-main-example-line">
                        <span>{{isEnglish ? 'Example sentence:' : 'Példa mondat'}}</span>
                    </div>
                    <div class="card-main-switch-side-btn-wrapper">
                        <button @click.prevent.stop="sideAway = !sideAway" class="green-btn card-main-switch-side-btn">Switch Side</button>
                    </div>
                    <div class="card-main-bottom-line">
                        <span>megtanult kapcsoló</span>
                        <span><img @click="editCardBtn" class="card-main-bottom-line-img" src="/static/img/content/edit-icon.svg"></span>
                    </div>
                </div>
                <div class="card-step-right" @click="setSelectedIndexByBtn(1)"><img src="/static/img/content/arrow-right.svg"></div>
            </div>
            <div class="card-search-wrapper">
                <div v-if="searchOn" class="card-search-match-wrapper">
                    <div v-for="word in filterWordsBySearch" class="card-search-match" @click.stop="setSelectedIndexByMiniCard(word.id)">{{word.word_away}} - {{word.word_home}}</div>
                </div>
                <search-component @send-search="getSearch"></search-component>
            </div>
            <div class="card-range-of-card-wrapper">
                <div v-if="(rangeOfWords.length === 8 || rangeOfWords.length === 6 || rangeOfWords.length === 4 || rangeOfWords.length === 2)" v-for="i in 1" class="card-range-of-card-empty">
                    <div>
                        
                    </div>
                </div>
                <div v-for="(word,i) in rangeOfWords" 
                    :key="word.id" 
                    class="card-range-of-card" 
                    :class="setRangeOfCardClass(i)"
                    @click.stop="setSelectedIndexByMiniCard(word.id)">
                    <div>
                        {{word.word_away}}
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            searchInput: '',
            selectedIndex: 0,
            sideAway: true,
            searchOn: false,
        }
    },
    component: {
        searchField: 'search-component',
    },
    watch: {
        searchInput() {
            this.searchOn = this.searchInput === '' ? false : true;
        }
    }
    ,
    methods: {
        deleteCardBtn() {
            console.log('törlés')
        },
        editCardBtn() {
            console.log('szerkesztés')
        },
        setRangeOfCardClass(index) {
            let displayedMiniCards = this.rangeOfWords.length;
            // main card
            if((displayedMiniCards === 9 && index === 4) || (displayedMiniCards === 8 && index === 3) || (displayedMiniCards === 7 && index === 3) || (displayedMiniCards === 6 && index === 2) || (displayedMiniCards === 5 && index === 2) ||
                (displayedMiniCards === 4 && index === 1) || (displayedMiniCards === 3 && index === 1) || (displayedMiniCards === 2 && index === 0) || (displayedMiniCards === 1 && index === 0)) {
                return 'card-roc-main';
            }
            // main card -1
            if((displayedMiniCards === 9 && index === 3) || (displayedMiniCards === 8 && index === 2) || (displayedMiniCards === 7 && index === 2) || (displayedMiniCards === 6 && index === 1) || (displayedMiniCards === 5 && index === 1) ||
                (displayedMiniCards === 4 && index === 0) || (displayedMiniCards === 3 && index === 0) || (displayedMiniCards === 2 && index === 0))  {
                return 'card-roc-main-min-one';
            }
            // main card -2
            if((displayedMiniCards === 9 && index === 2) || (displayedMiniCards === 8 && index === 1) || (displayedMiniCards === 7 && index === 1) || (displayedMiniCards === 6 && index === 0) || (displayedMiniCards === 5 && index === 0))  {
                return 'card-roc-main-min-two';
            }
            // main card -3
            if((displayedMiniCards === 9 && index === 1) || (displayedMiniCards === 8 && index === 0) || (displayedMiniCards === 7 && index === 0))  {
                return 'card-roc-main-min-three';
            }
            // main card -4
            if((displayedMiniCards === 9 && index === 0))  {
                return 'card-roc-main-min-four';
            }
            // main card +1
            if((displayedMiniCards === 9 && index === 5) || (displayedMiniCards === 8 && index === 4) || (displayedMiniCards === 7 && index === 4) || (displayedMiniCards === 6 && index === 3) || (displayedMiniCards === 5 && index === 3) ||
                (displayedMiniCards === 4 && index === 2) || (displayedMiniCards === 3 && index === 2) || (displayedMiniCards === 2 && index === 1))  {
                return 'card-roc-main-plus-one';
            }
            // main card +2
            if((displayedMiniCards === 9 && index === 6) || (displayedMiniCards === 8 && index === 5) || (displayedMiniCards === 7 && index === 5) || (displayedMiniCards === 6 && index === 4) || (displayedMiniCards === 5 && index === 4))  {
                return 'card-roc-main-plus-two';
            }
            // main card +3
            if((displayedMiniCards === 9 && index === 7) || (displayedMiniCards === 8 && index === 6) || (displayedMiniCards === 7 && index === 6) || (displayedMiniCards === 6 && index === 5))  {
                return 'card-roc-main-plus-three';
            }
            // main card +4
            if((displayedMiniCards === 9 && index === 8) || (displayedMiniCards === 8 && index === 7))  {
                return 'card-roc-main-plus-four';
            }
        },
        getSearch(text) {
            this.searchInput = text;
        },
        addNewCard() {
            console.log('új kártya felvétele. új comp?')
        },
        setSelectedIndexByBtn(step) {
            if(this.selectedIndex === 0 && step === -1) {
                return
            } else if(this.selectedIndex === this.allWords.length-1 && step === 1) {
                return
            } else {
                let tempIndex = this.selectedIndex + step;
                this.selectedIndex = tempIndex;
            }
        },
        setSelectedIndexByMiniCard(cardId) {
            this.allWords.map( (e, index) => {
                this.selectedIndex = e.id === cardId ? index : this.selectedIndex;
            })
        },
        getRandomCard() {
            this.selectedIndex =  Math.floor(Math.random() * this.allWords.length);
        }
    },
    computed:{
        isEnglish: {
            get: function() {
                return this.getIsEnglish();
          }
        },
        actualList: {
            get: function() {
                let tempActualList = this.lists.lists_result.filter( e => e.id === this.listId);
                return tempActualList[0];
            }
        },
        allWords: {
            get: function() {
                if(this.isLearnt && this.isUnKnown) {
                    return this.words.words_result.filter( e => e.list_of_word_id === this.listId);
                } else {
                    return this.isLearnt ? this.words.words_result.filter( e => e.list_of_word_id === this.listId && e.learnt === true) : this.words.words_result.filter( e => e.list_of_word_id === this.listId && e.learnt === false);
                }
            }
        },
        selectedWord() {
            return this.allWords[this.selectedIndex];
        },
        filterWordsBySearch() {
            if(this.searchInput !== '') {
                return this.allWords.filter( word => (word.word_away.includes(this.searchInput) || word.word_home.includes(this.searchInput)))
            } else {
                return null
            }
        },
        rangeOfWords() {
            let index = this.selectedIndex;
            let startIndex = index < 4 ? 0 : index - 4;
            let endIndex = index > this.allWords.length - 5 ? this.allWords.length : index + 5;
            return this.allWords.slice(startIndex, endIndex);
        }
      },
    props: ['lists', 'words', 'listId', 'isForeign', 'isLearnt', 'isUnKnown'],
    inject: ["getIsEnglish"]
});