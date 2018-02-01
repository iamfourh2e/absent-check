<template>
    <v-layout justify-center align-center>
        <v-flex xs6>
            <v-card>
                <v-card-title>Register</v-card-title>
                <v-card-text>
                    <div>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-text-field
                                    label="User Name"
                                    v-model="formData.name"
                                    :rules="nameRules"
                                    :counter="10"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    label="E-mail"
                                    v-model="formData.email"
                                    :rules="emailRules"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    hint="At least 6 characters"
                                    :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (passwordVisible = !passwordVisible)"
                                    :type="passwordVisible ? 'password' : 'text'"
                                    label="Password"
                                    :max="20"
                                    :counter="20"
                                    :rules="passwordRule"
                                    v-model="formData.password"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    :append-icon="confirmPasswordVisible ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (confirmPasswordVisible = !confirmPasswordVisible)"
                                    :type="confirmPasswordVisible ? 'password' : 'text'"
                                    label="Confirm Password"
                                    v-model="formData.confirmPassword"
                                    :max="20"
                                    :counter="20"
                                    :rules="confirmPasswordRule"
                                    required
                            ></v-text-field>
                            <v-btn
                                    @click="submit"
                                    :disabled="!valid"
                            >
                                Register
                            </v-btn>
                            <v-btn @click="clear">clear</v-btn>
                        </v-form>
                    </div>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
    export default {
        data: () => ({
            valid: true,
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
            ],
            passwordVisible: false,
            confirmPasswordVisible: false,
            emailRules: [
                (v) => !!v || 'E-mail is required',
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4'
            ],
            passwordRule: [
                (v) => !!v || 'Password is required',
                (v) => v && v.length >= 6 || "Password must be at least 6 characters",
                (v) => v && v.length <= 20 || "Password must less than 20 characters"
            ],
            confirmPasswordRule: [
                (v) => !!v || 'Confirm is required',
                (v) => v && v.length <= 20 || "Password must less than 20 characters"
            ],
            formData: {
                name: '',
                password: '',
                confirmPassword: '',
                email: '',
            }
        }),
        watch: {
            'formData.confirmPassword'(val){
                if(val !== this.formData.password){
                    this.confirmPasswordRule = [
                        (v) => !!v || 'Confirm is required',
                        (v) => ('Password not match'),
                        (v) => v && v.length <= 20 || "Password must less than 20 characters"
                    ]
                }else{
                    this.confirmPasswordRule = [
                        (v) => !!v || 'Confirm is required',
                        (v) => v && v.length <= 20 || "Password must less than 20 characters"

                    ]
                }
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    // Native form submission is not yet supported
                    this.$store.dispatch('submitRegisterForm', this.formData);
                }
            },
            clear() {
                this.$refs.form.reset()
            }
        },
        created(){
            let vm = this;
            this.$subscribe('user', {
                onReady(){
                    vm.$store.commit('UPDATE_USER', Meteor.users.findOne({}));
                }
            })
        }
    }
</script>