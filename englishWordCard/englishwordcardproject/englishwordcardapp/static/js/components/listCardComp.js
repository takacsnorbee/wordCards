Vue.component('list-card-comp', {
    template: `
        <div @click="flipListCard" class="list-card">
            <div class="list-card-header">
                <h3>{{nameOfList}}</h3>
            </div>  
            <div v-if="this.aSide" class="list-card-body-up">
                <div class="list-card-learnt-wrapper">
                    <div>%</div>
                    <div>{{numOfLearnt.percentage}} {{isEnglish ? 'learnt':'megtanult'}} ({{numOfLearnt.sumOfLearnt}} {{isEnglish ? 'words':'szó'}})</div>
                </div>
                <div class="list-card-word-num-wrapper">
                    <div>W</div>
                    <div>{{numOfLearnt.sumOfWords}} {{isEnglish ? 'words in the list':'szó a listán'}}</div>
                </div>
            </div>
            <template v-else>
            <div class="list-card-body-down">
                <div class="list-card-learnt-wrapper-back">
                    <div>english</div>
                    <div>kapcsoló</div>
                    <div>hungarian</div>
                </div>
                <div class="list-card-word-num-wrapper-back">
                    <div>show learnt</div>
                    <div>kapcsoló</div>
                </div>
                <div class="list-card-word-num-wrapper-back">
                    <div>show unknown</div>
                    <div>kapcsoló</div>
                </div>
            </div>
            <div @click.stop="chooseList" class="list-card-bottom">
                <h3>go to list</h3>
            </div>
            </template>
        </div>
    `,
    data() {
        return {
            aSide: true,
        }
    },
    computed:{
        isEnglish: {
          get: function() {
              return this.getIsEnglish();
          },
        }
    },
    methods: {
        flipListCard() {
            this.aSide = !this.aSide;
        },
        chooseList() {
            console.log('choose lists')
        }
    },
    props: ['numOfLearnt', 'nameOfList'],
    inject: ["getIsEnglish"],
});