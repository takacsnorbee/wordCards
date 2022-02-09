const app = new Vue({
    el: '#vue-app',
    delimiters: ['[[',']]'],
    data: {
      // settings
      isEnglish: true,
      darkMode: false,
      isLoading: true,
      contentMode: 'list-component',
      chosenListId: -1,
      // data from database
      userLists: [],
      userWords: [],
      homeContent: [],
      // user ratings
      appRating: 0,
      rated: false,
      numOfRatings: 0,
      numOfStars: 0,
    },
    component: {
      loader: 'loading-screen',
      list: 'list-component',
      card: 'card-component'
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
      getIsEnglish() {
        return this.isEnglish;
      },
      setStars(e) {
        this.numOfStars = +e.target.id;
      },
      refreshRating(response) {
        app.appRating = Math.round(response.data.ratings);
        app.rated = response.data.rated;
        app.numOfRatings = response.data.numOfRatings;
      },
      sendRating() {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
        axios.defaults.xsrfCookieName = "csrftoken"
        axios.post('/setRatings/', JSON.stringify({'rating': app.numOfStars}))
        .then(function(response) {
          app.refreshRating(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    provide: function() {
      return {
          getIsEnglish: this.getIsEnglish
      };
    },
    mounted() {
      this.isLoading = true;

      // refress appRating
      axios.get('/getRatings')
      .then(function (response) {
        app.refreshRating(response);
      })
      .catch(function (error) {
        console.log(error)
      })

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
      
      // get user lists and words if user is on the content page
      if (!!document.getElementById("this-is-content-page")) {
        // get words
        axios.get('/getLists')
          .then(function (response) {
            app.userLists = response.data;
          })
          .catch(function (error) {
            console.log(error);
          })

        axios.get('/getWords')
          .then(function (response) {
            app.userWords = response.data;
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
