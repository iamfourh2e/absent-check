<template>
    <v-layout justify-center align-center>
        <v-slide-x-transition>
            <v-flex xs6>
                <v-card>
                    <v-card-title>Login</v-card-title>
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

                                <v-btn dark color="indigo darken-4"
                                        @click="submit"
                                        :disabled="!valid"
                                >
                                    Login
                                </v-btn>
                                <v-btn @click="clear" >clear</v-btn>
                                <br>
                                <small>Don't have an account ? <router-link to="/register">Register</router-link></small>
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
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
            ],
            passwordVisible: true,
            passwordRule: [
                (v) => !!v || 'Password is required',
            ],
            formData: {
                name: '',
                password: '',
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
                    this.$store.dispatch('submitLoginForm', this.formData)
                        .then((result)=>{
                        console.log(result)
                        }).catch((e)=>{
                        console.log(e)
                    })
                }
            },
            clear() {
                this.$refs.form.reset()
            }
        }
    }
</script>