<template>
    <v-layout justify-left mt-1 row wrap>
        <v-flex xs12>
            <v-card class="grid">
                <v-toolbar color="white" flat>
                    <v-btn icon light @click="goBack">
                        <v-icon color="grey darken-2">arrow_back</v-icon>
                    </v-btn>
                    <v-toolbar-title class="grey--text text--darken-4">{{displayTitle}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon light>
                        <v-icon color="grey darken-2">search</v-icon>
                    </v-btn>
                </v-toolbar>

            </v-card>
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
    export default {
        data(){
            return {
                classDoc: {}
            }
        },
        computed: {
            displayTitle(){
                return this.classDoc && this.classDoc.name || 'Can not find this class sorry :(';
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1);
            },
          getClassDoc(selector){
              Meteor.call("klass_findeOne", selector,(err,result)=>{
                  if(!err){
                      this.classDoc = result;
                  }
              })
          }
        },
        created(){
            let params = this.$route.params.klassId;
            this.getClassDoc({_id: params});
        }
    }
</script>