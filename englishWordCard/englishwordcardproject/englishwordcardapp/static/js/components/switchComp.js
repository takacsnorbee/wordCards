Vue.component("switch-button", {
    template: `
        <div id="switch-button">
            <div class="switch-button-control">
                <div class="switch-button" :class="{ enabled: isEnabled }" @click.stop="toggle">
                    <div class="button"></div>
                </div>
            </div>
        </div>
    `,
    model: {
      prop: "isEnabled"
    },
    props: ['isEnabled'],
    methods: {
      toggle: function() {
        this.$emit("toggle-value");
      }
    }
});
  