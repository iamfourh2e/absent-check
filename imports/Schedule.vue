<template>
	<v-card>
		<v-card-title>Schedule</v-card-title>
		<v-card-text>
		<v-form v-model="valid" ref="form" lazy-validation>
			<v-flex xs6>
				<v-select prepend-icon="date_range" label="Multiple select" v-bind:items="days" item-text="name" v-model="exceptionDays" multiple chips hint="Select exception days" persistent-hint></v-select>
			</v-flex>
			<v-layout row wrap>
				<v-flex xs6 sm5>
					<v-menu lazy :close-on-content-click="false" v-model="menuDayOffStart" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
						<v-text-field slot="activator" label="Days off start" v-model="dayOffStart" prepend-icon="event" readonly></v-text-field>
						<v-date-picker v-model="dayOffStart" no-title scrollable actions>
							<template slot-scope="{ save, cancel }">
	                                <v-card-actions>
	                                <v-spacer></v-spacer>
	                                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
	                                <v-btn flat color="primary" @click="save">OK</v-btn>
	                                </v-card-actions>
</template>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs6 sm5>
                    <v-menu lazy :close-on-content-click="false" v-model="menuDayOffEnd" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
                        <v-text-field slot="activator" label="Days off end" v-model="dayOffEnd" prepend-icon="event" readonly></v-text-field>
                        <v-date-picker v-model="dayOffEnd" no-title scrollable actions>
<template slot-scope="{ save, cancel }">
	<v-card-actions>
		<v-spacer></v-spacer>
		<v-btn flat color="primary" @click="cancel">Cancel</v-btn>
		<v-btn flat color="primary" @click="save">OK</v-btn>
	</v-card-actions>
</template>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
               <v-flex xs6 sm5>
                    <v-menu lazy :close-on-content-click="false" v-model="menuHoliday" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
                        <v-text-field slot="activator" label="Holidays" v-model="holiday" prepend-icon="event" readonly></v-text-field>
                        <v-date-picker v-model="holiday" no-title scrollable actions>
<template slot-scope="{ save, cancel }">
	<v-card-actions>
		<v-spacer></v-spacer>
		<v-btn flat color="primary" @click="cancel">Cancel</v-btn>
		<v-btn flat color="primary" @click="save">OK</v-btn>
	</v-card-actions>
</template>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs6 sm5>
                    <v-btn fab dark small color="teal"  @click="addHoliday">
                    <v-icon dark>add</v-icon>
                    </v-btn>                
                </v-flex>
            </v-layout>
            <v-flex md6 sm12 xs12>
                <v-layout row wrap>
					<slot v-if="holidays.length > 0">
						<div v-for="holiday in holidays" :key="holiday._id">
							<v-chip close @input="removeHoliday(holiday)">   
								{{holiday.day}}
							</v-chip>
						</div>
					</slot>
                </v-layout>
            </v-flex>
            <v-btn dark color="indigo" @click="submit" :disabled="!valid">
                Save
            </v-btn>
        </v-form>
           <v-snackbar
      :timeout="timeout"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
      {{ text }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
	</v-card-text>
    </v-card>
</template>

<script>
	import {format, parse, endOfDay, startOfDay} from 'date-fns'
	let tmpHolidays = new Mongo.Collection(null);
	export default {
		meteor: {
			holidays() {
				return tmpHolidays.find({}).fetch();
			}
		},
		data: () => ({
			snackbar: false,
			color: "",
			mode: "",
			timeout: 3000,
			text: "",
			valid: true,
			scheduleDoc: null,
			dayOffStart: null,
			dayOffEnd: null,
			holiday: null,
			menuDayOffStart: false,
			menuDayOffEnd: false,
			menuHoliday: false,
			holidays: [],
			exceptionDays: null,
			days: [{
					name: "Sunday",
					value: 0
				},
				{
					name: "Monday",
					value: 1
				},
				{
					name: "Tuesday",
					value: 2
				},
				{
					name: "Wednesday",
					value: 3
				},
				{
					name: "Thursday",
					value: 4
				},
				{
					name: "Friday",
					value: 5
				},
				{
					name: "Saturday",
					value: 6
				}
			]
		}),
		methods: {
			removeHoliday(holiday) {
				tmpHolidays.remove({
					_id: holiday._id
				});
			},
			addHoliday() {
				tmpHolidays.insert({
					day: this.holiday
				});
			},
			scheduleFindOne() {
				let holidayFn = day => tmpHolidays.insert({day: day})
				Meteor.call("schedule_findOne", {}, (err, result) => {
					if (!err) {
						this.scheduleDoc = result;
						this.dayOffStart = format(result.dayOffStart, 'YYYY/MM/DD');
						this.dayOffEnd = format(result.dayOffEnd,'YYYY/MM/DD');
						this.holidays = result.holidays.length > 0 ? result.holidays.map(holidayFn) : [];
						this.exceptionDays = result.exceptionDays;
					}
				});
			},
			submit() {
				let querySelector = {
					_id: this.scheduleDoc._id
				};
				let selector = {
					$set: {
						exceptionDays: this.exceptionDays,
						dayOffStart: this.dayOffStart ? startOfDay(this.dayOffStart) : null,
						dayOffEnd: this.dayOffEnd ?  endOfDay(this.dayOffEnd) : null,
						holidays: tmpHolidays.find({}).fetch().map(o => o.day)
					}
				};
				Meteor.call("schedule_update", querySelector, selector, (err, result) => {
					if (!err) {
						this.color = "success";
						this.snackbar = true;
						this.text = "Update schedule successfully";
					} else {
						this.color = "error";
						this.snackbar = true;
						this.text = err.message;
					}
				});
			},
			clear() {
				this.$refs.form.reset();
			}
		},
		created() {
			this.scheduleFindOne();
		},
		destroyed(){
			tmpHolidays.remove({});
		}
	};
</script>	