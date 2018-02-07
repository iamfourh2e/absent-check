<template>
    <v-layout row wrap>
    <v-flex xs12>
        <v-subheader>Attendance</v-subheader>
    </v-flex>
    <v-flex xs1 class="text-xs-left">
        <v-btn icon>
            <v-icon>arrow_back</v-icon>
        </v-btn>
    </v-flex>
     <v-flex xs1 class="text-xs-center">
         <v-btn flat  @click="modal = !modal">
            <v-icon>date_range</v-icon><span>{{dateFormatter}}</span>
         </v-btn>
    </v-flex>
     <v-flex xs1 class="text-xs-right">
        <v-btn icon>
            <v-icon>arrow_forward</v-icon>
        </v-btn>
    </v-flex>
    <v-flex xs3>
    </v-flex>
     <v-flex xs11 sm5>
      <v-dialog
        v-model="modal"
        full-width
        width="290px"
      >
        <v-date-picker v-model="date" scrollable actions>
          <template slot-scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
      </v-dialog>
    </v-flex>
    </v-layout>
</template>

<script>
import {format} from 'date-fns';
export default {
    data(){
        return {
            date: new Date(),
            modal: false

        }
    },
    computed: {
        dateFormatter(){
            return format(this.date, 'DD/MM/YYYY')
        }
    }
  
}
</script>
