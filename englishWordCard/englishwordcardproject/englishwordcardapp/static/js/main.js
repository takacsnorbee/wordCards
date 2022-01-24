const app = new Vue({
    el: '#vue-app',
    delimiters: ['[[',']]'],
    data: {
      isEnglish: true,
      darkMode: false,
      isLoading: true,
    },
    component: {
        loader: 'loading-screen'
    },
    computed: {
      
    },
    watch: {
      
    },
    mounted() {
      this.isLoading = false;
    }
  })
