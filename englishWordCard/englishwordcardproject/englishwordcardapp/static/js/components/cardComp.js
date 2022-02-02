Vue.component('card-component', {
    template: `
        <div class="card-comp-wrapper">{{searchInput}}
            <search-component @send-search="getSearch"></search-component>
        </div>
    `,
    data() {
        return {
            searchInput: '',
        }
    },
    component: {
        searchField: 'search-component',
    },
    methods: {
        getSearch(text) {
            this.searchInput = text;
        }
    },
    props: ['lists', 'words']
});