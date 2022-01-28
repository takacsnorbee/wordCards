Vue.component("switch-button", {
    template: `
        <div id="switch-button">
            <div class="switch-button-control">
                <div class="switch-button" :class="{ enabled: isDarkMode }" @click="toggle">
                    <div class="button"></div>
                </div>
            </div>
        </div>
    `,
    model: {
      prop: "isDarkMode"
    },
    props: ['isDarkMode'],
    methods: {
      toggle: function() {
        this.$emit("toggle-dark-mode");
      }
    }
  });
  