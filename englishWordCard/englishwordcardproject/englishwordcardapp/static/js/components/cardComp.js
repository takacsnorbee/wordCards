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
                        <span>
                            <span v-for="(fragment, i) in splittedWordToModify" class="card-main-example-fragment" :key="fragment.id" @click.stop="chooseFragment(fragment.id)">{{fragment.word}}</span>
                        </span>
                        <span>
                            <span v-if="wordsPickedByUser.length !== 0" class="card-main-example-rebuild">{{wordsPickedByUser}}</span>
                            <img v-if="wordsPickedByUser.length !== 0" src="/static/img/content/x-mark.svg" @click="resetPickedWords">
                        </span>
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
            responseWords: [],
            splittedWordsToReset: [],
            splittedWordToModify: [],
            wordsPickedByUser: '',
        }
    },
    component: {
        searchField: 'search-component',
    },
    watch: {
        searchInput() {
            this.searchOn = this.searchInput === '' ? false : true;
        },
        responseWords() {
            this.$emit('refresh-words', this.responseWords);
        },
    }
    ,
    methods: {
        resetPickedWords() {
            this.splittedWordToModify = [...this.splittedWordsToReset];
            this.wordsPickedByUser = '';
        },
        chooseFragment(fragmentId) {
            let tempWord = [];
            this.splittedWordToModify.filter((e) => {
                if(fragmentId === e.id) {
                    this.wordsPickedByUser += e.word;
                    this.wordsPickedByUser += ' ';
                } else {
                    tempWord.push(e);
                }
            });
            this.splittedWordToModify = tempWord;
        },
        deleteCardBtn() {
            console.log('törlés');
            let tempId = this.selectedWord.id;
            if(this.tempId === -1) {
                console.log('ezt nem törölheted')
                return
            } else {
                axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
                axios.defaults.xsrfCookieName = "csrftoken";
                axios.post('/deleteWord/', JSON.stringify({'word_id': tempId, 'list_id': this.listId}))
                    .then((response) => {
                        this.responseWords = {...response.data};
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
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
                let tempWordsList = this.words.words_result.filter( e => e.list_of_word_id === this.listId)
                if(tempWordsList.length === 0) {
                    let tempWord = {
                        id: -1,
                        learnt: false,
                        list_of_word_id: this.listId,
                        sentence_away: 'test one',
                        sentence_home: 'teszt egy',
                        synonyms: '',
                        word_away: 'test',
                        word_home: 'teszt',
                        word_description: '-'
                    }
                    tempWordsList.push(tempWord);
                    return tempWordsList;
                }
                if(this.isLearnt && this.isUnKnown) {
                    return this.words.words_result.filter( e => e.list_of_word_id === this.listId);
                } else {
                    return this.isLearnt ? this.words.words_result.filter( e => e.list_of_word_id === this.listId && e.learnt === true) : this.words.words_result.filter( e => e.list_of_word_id === this.listId && e.learnt === false);
                }
            }
        },
        splittedWords() {
            let tempArray = this.allWords[this.selectedIndex].sentence_away.split(' ');
            tempArray.sort(() => { return 0.5 - Math.random() });
            let tempArrayModified = [];
            tempArray.map((e,i) => {
                tempArrayModified.push({'id': i, 'word': e});
            })
            this.splittedWordToModify = [...tempArrayModified];
            this.splittedWordsToReset = [...tempArrayModified];
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