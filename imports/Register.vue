<template>
    <v-layout justify-center align-center>
        <v-slide-x-transition>
        <v-flex xs6>
            <v-card>
                <v-card-title>Register</v-card-title>
                <v-card-text>
                    <div>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-text-field
                                    label="Username"
                                    v-model="formData.username"
                                    :rules="usernameRules"
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
                              <br>
                                <small> have an account ? <router-link to="/login">Login</router-link></small>
                        </v-form>
                    </div>
                </v-card-text>
            </v-card>
        </v-flex>
        </v-slide-x-transition>
    </v-layout>
</template>
<script>
    export default {
        data: () => ({
            valid: true,
            usernameRules: [
                (v) => !!v || 'username is required',
                (v) => v && v.length <= 10 || 'username must be less than 10 characters'
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
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
            }
        }),
        watch: {
            'formData.password'(val){
                if(!!this.formData.confirmPassword){
                    this.checkMatchedPassword(val === this.formData.confirmPassword)
                }
            },
            'formData.confirmPassword'(val){
                this.checkMatchedPassword(val === this.formData.password)
            }
        },
        computed: {
             errorLogin() {
                let err = this.$store.state.auth.errorLogin;
                return  '';
            }
        },
        methods: {
            checkMatchedPassword(matched){
                if(matched){
                    this.confirmPasswordRule = [
                        (v) => !!v || 'Confirm is required',
                        (v) => v && v.length <= 20 || "Password must less than 20 characters"

                    ]
                }else{
                    this.confirmPasswordRule = [
                        (v) => !!v || 'Confirm is required',
                        (v) => v && v.length <= 20 || "Password must less than 20 characters"

                    ]
                }
            },
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