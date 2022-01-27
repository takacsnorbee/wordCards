const app = new Vue({
    el: '#vue-app',
    delimiters: ['[[',']]'],
    data: {
      isEnglish: true,
      darkMode: false,
      isLoading: true,
      commonList: {}
    },
    component: {
      loader: 'loading-screen'
    },
    computed: {
      
    },
    methods: {
      setDarkMode() {
        this.darkMode = !this.darkMode;
        window.localStorage.setItem("darkMode", `${this.darkMode}`);
      },
      setLanguage() {
        this.isEnglish = !this.isEnglish;
        window.localStorage.setItem("isEnglish", `${this.isEnglish}`);
      },
      getCommonList() {
        this.isLoading = true;
        axios.get('/getCommonList')
          .then(function (response) {
            app.commonList = response.data;
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            app.isLoading = false;
          });
      }
    },
    watch: {
      
    },
    mounted() {
      this.isLoading = false;
      if(window.localStorage.darkMode) {
        this.darkMode = JSON.parse(window.localStorage.getItem('darkMode'));
      }
      if(window.localStorage.isEnglish) {
        this.isEnglish = JSON.parse(window.localStorage.getItem('isEnglish'));
      }
    }
  })
