Vue.component('search-component', {
    template: `
        <div class="search-wrapper">
            <h1>{{this.isEnglish ? 'Search in lists and words' : 'Keresés listák és szavak között'}}</h1> <br>
            <input type="text" v-model="searchInput">
            <button @click.prevent="sendSearch">{{this.isEnglish ? 'Search' : 'Keresés'}}</button>
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