Vue.component('list-card-comp', {
    template: `
        <div @click="flipListCard()" class="list-card">
            <div class="list-card-header">
                <h3>{{nameOfList}}</h3>
            </div>  
            <div v-if="this.aSide" class="list-card-body-up">
                <div class="list-card-learnt-wrapper">
                    <div>%</div>
                    <div>{{numOfLearnt.percentage}} {{isEnglish ? '% learnt':'megtanult'}} ({{numOfLearnt.sumOfLearnt}} {{isEnglish ? 'words':'szó'}})</div>
                </div>
                <div class="list-card-word-num-wrapper">
                    <div>W</div>
                    <div>{{numOfLearnt.sumOfWords}} {{isEnglish ? 'words in the list':'szó a listán'}}</div>
                </div>
            </div>
            <template v-else>
            <div class="list-card-body-down">
                <div class="list-card-card-side-wrapper-back">
                    <div>{{isEnglish ? 'Foreign' : 'Idegen'}}</div>
                    <div>
                        <switch-button class="list-card-switch-wrapper" v-model="isForeign" @toggle-value="isForeign = !isForeign"></switch-button>
                    </div>
                    <div>{{isEnglish ? 'Nativ' : 'Anyanyelv'}}</div>
                </div>
                <div class="list-card-learnt-wrapper-back">
                    <div>{{isEnglish ? 'Learnt' : 'Megtanult'}}</div>
                    <div>
                        <switch-button class="list-card-switch-wrapper" v-model="isLearnt" @toggle-value="isLearnt = !isLearnt"></switch-button>
                    </div>
                </div>
                <div class="list-card-not-learnt-wrapper-back">
                    <div>{{isEnglish ? 'Unknown' : 'Ismeretlen'}}</div>
                    <div>
                        <switch-button class="list-card-switch-wrapper" v-model="isUnKnown" @toggle-value="isUnKnown = !isUnKnown"></switch-button>
                    </div>
                </div>
            </div>
            <div @click.stop="chooseList(listId)" class="list-card-bottom" >
                <h3>{{isEnglish ? 'Use this' : 'Használ'}}</h3>
            </div>
            </template>
        </div>
    `,
    data() {
        return {
            aSide: true,
            chosenListId: -1,
            isForeign: false,
            isLearnt: true,
            isUnKnown: true,
        }
    },
    component: {
        switchBtnComp: 'switch-button'
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
        chooseList(e) {
            app.isForeign = this.isForeign;
            app.isLearnt = this.isLearnt;
            app.isUnKnown = this.isUnKnown;
            app.chosenListId = e;
            app.contentMode = 'card-component';
        }
    },
    props: ['numOfLearnt', 'nameOfList', 'listId'],
    inject: ["getIsEnglish"]
});