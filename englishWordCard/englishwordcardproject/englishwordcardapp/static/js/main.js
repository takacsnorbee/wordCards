const app = new Vue({
    el: '#vue-app',
    delimiters: ['[[',']]'],
    data: {
      isEnglish: true,
      darkMode: false,
      isLoading: true,
      commonList: [],
      homeContent: [],
    },
    component: {
      loader: 'loading-screen',
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
      }
    },
    watch: {
    },
    mounted() {
      this.isLoading = true;

      // get data from localStorage
      if(window.localStorage.darkMode) {
        this.darkMode = JSON.parse(window.localStorage.getItem('darkMode'));
      }
      if(window.localStorage.isEnglish) {
        this.isEnglish = JSON.parse(window.localStorage.getItem('isEnglish'));
      }
      
      // get home page data if user is on the home page
      if (!!document.getElementById("this-is-home-page")) {
        axios.get('/getHomeContent')
        .then(function (response) {
          app.homeContent = [...response.data.home_content];
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function() {
          app.isLoading = false;
        })
      }
      
      // get user lists and words if it is not available yet
      if (!!document.getElementById("this-is-content-page")) {
        axios.get('/getCommonList')
          .then(function (response) {
            app.commonList = response.data; // todo máshogy elnevezni. bármilyen lista jöhet
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            app.isLoading = false;
          });
      }
      if (!document.getElementById("this-is-content-page") && !document.getElementById("this-is-home-page")) {
        this.isLoading = false;
      }
    }
  })
