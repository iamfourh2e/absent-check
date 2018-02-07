<template>
    <v-layout justify-left mt-1 row wrap>
        <v-flex xs12>
 <v-tabs  grow>
   	 <v-toolbar color="white" >
		<v-btn icon @click="goBack">
			<v-icon>arrow_back</v-icon>
		</v-btn>
	
		<slot v-if="showSearchBar">
			 <v-text-field
        solo
        label="Search"
        append-icon="keyboard_voice"
        prepend-icon="search"
      ></v-text-field>
		</slot>
		<slot v-else>
				<v-btn icon @click="showSearchBar = !showSearchBar">
			<v-icon>search</v-icon>
		</v-btn>
			<v-toolbar-title>{{displayTitle}}</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn icon>
			<v-icon>more_vert</v-icon>
		</v-btn>
		</slot>
      <v-tabs-bar class="teal" dark slot="extension" v-show="displayDoc">
								      <v-tabs-slider color="yellow"></v-tabs-slider>
                                <v-tabs-item v-for="tab in tabs" :key="tab.name" :href="'#' + tab.name" ripple>
                                    <v-icon>{{tab.icon}}</v-icon>&nbsp;{{tab.name}}
                                </v-tabs-item>
                                <v-tabs-slider color="yellow"></v-tabs-slider>
                            </v-tabs-bar>
								      </v-toolbar>

                            <v-tabs-items  >
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
        </v-flex>
    </v-layout>
</template>
<style>
.m3 {
  margin: 3px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
<script>
import Student from "./Student.vue";
import Teacher from "./Teacher.vue";
import Attendance from "./StudentAttendance.vue";

export default {
	components: {
		Student,
		Teacher,
		Attendance
	},
  data() {
    return {
		showSearchBar: false,
      tabs: [
		   {
          name: "Student Attendance",
          icon: "check",
          component: "Attendance"
        },
        {
          name: "Student Overview",
          icon: "account_box",
          component: "Student"
        },
        {
          name: "Teacher",
          icon: "class",
          component: "Teacher"
        }
      ],
      active: null,
      classDoc: {},
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  computed: {
    displayTitle() {
      return (
        (this.classDoc && this.classDoc.name) ||
        "Can not find this class sorry :("
      );
    },
    displayDoc() {
      return !!this.classDoc && this.classDoc.name;
    }
  },
  methods: {
	  next() {
      this.active = this.tabs[
        (this.tabs.indexOf(this.active) + 1) % this.tabs.length
      ];
    },
    goBack() {
		if(this.showSearchBar){
			this.showSearchBar = !this.showSearchBar;
		}else{
	      this.$router.go(-1);
		}
    },
    getClassDoc(selector) {
      Meteor.call("klass_findeOne", selector, (err, result) => {
        if (!err) {
          this.classDoc = result;
        }
      });
    }
  },
  created() {
    let params = this.$route.params.klassId;
    this.getClassDoc({ _id: params });
  }
};
</script>