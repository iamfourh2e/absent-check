<template>
  <v-layout justify-center mt-1 >
    <v-flex xs6>
      <v-card>
        <v-card-title>Register</v-card-title>
        <v-card-text>
          <div>
            <form>
              <v-text-field label="Name" v-model="name" :error-messages="nameErrors" :counter="10" @input="$v.name.$touch()" @blur="$v.name.$touch()" required></v-text-field>
              <v-text-field label="E-mail" v-model="email" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()" required></v-text-field>
              <v-select label="Item" v-model="select" :items="items" :error-messages="selectErrors" @change="$v.select.$touch()" @blur="$v.select.$touch()" required></v-select>
              <v-checkbox label="Do you agree?" v-model="checkbox" :error-messages="checkboxErrors" @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()" required></v-checkbox>
  
              <v-btn @click="submit">submit</v-btn>
              <v-btn @click="clear">clear</v-btn>
            </form>
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
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
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
      checkbox: false
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            name: this.name,
            email: this.email,
            select: this.select,
            checkbox: this.checkbox
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>