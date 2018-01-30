<template>
    <v-layout justify-center mt-1>
        <v-flex xs12>
            <v-card>
                <v-card-title><i class="material-icons">settings</i> &nbsp;Settings</v-card-title>
                <v-card-text>
                    <div>
                        <v-tabs v-model="active">
                            <v-tabs-bar class="grey darken-1
    " dark>
                                <v-tabs-item v-for="tab in tabs" :key="tab.name" :href="'#' + tab.name" ripple>
                                    <v-icon>{{tab.icon}}</v-icon>&nbsp;{{tab.name}}
                                </v-tabs-item>
                                <v-tabs-slider color="yellow"></v-tabs-slider>
                            </v-tabs-bar>
                            <v-tabs-items>
                                <v-tabs-content v-for="tab in tabs" :key="tab.name" :id="tab.name">
                                    <v-card flat>
                                        <v-card-text>
                                            <keep-alive>
                                                <component :is="tab.component"></component>
                                            </keep-alive>
                                        </v-card-text>
                                    </v-card>
                                </v-tabs-content>
                            </v-tabs-items>
                        </v-tabs>
                    </div>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import Schedule from "./Schedule.vue";
import Class from "./Class.vue";
export default {
  components: {
    Schedule,
    Class
  },
  data() {
    return {
      tabs: [
        {
          name: "Class",
          icon: "class",
          component: "Class"
        },
        {
          name: "Schedule",
          icon: "schedule",
          component: "Schedule"
        }
      ],
      active: null
    };
  },

  methods: {
    next() {
      this.active = this.tabs[
        (this.tabs.indexOf(this.active) + 1) % this.tabs.length
      ];
    }
  }
};
</script>