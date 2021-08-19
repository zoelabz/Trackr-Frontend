<template>
  <div class="center">
    <h1>Account Login</h1>
    
    <div id="accountLoginBlock" class="column is-offset-4">

      <div class="field">
        <label class="label">Email</label>

        <div class="control has-icons-left has-icons-right">
          <input class="input emailIsNotEmpty() ? 'is-success' : 'is-danger'" type="email" v-model="email" placeholder="Enter Your Email" autofocus="true">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>

      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input passwordIsNotEmpty() ? 'is-success' : 'is-danger'" @keyup.enter="login()" type="password" v-model="password" placeholder="Enter Your Password">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        
      </div>      

      <br/>
      <div class="field">
          <button class="button is-primary" style="width: 100%;" 
            @click="login()" :disabled="!loginFieldsNotEmpty()">Login</button>
      </div>

      <div class="column">
        <br/><br/><br/>
        <strong>Quote of The Day</strong><br/>
        <p>{{ qouteOfTheDay }}</p>
      </div>


    </div>
   
  </div>

</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'Login',

  data() {

    return {

      email: '',

      password: '',

      qouteOfTheDay: ''

    }
    
  },

  methods: {

    async login() {

      try {

          await axios.post('http://127.0.0.1:4200/api/auth/validate',
                            {
                              email: this.email,
                              password: this.password

                            }).then( (res) => {

                              const data = res.data

                              if (data.status == "ERROR") {
                                //Toasting
                                Swal.fire({
                                  title: 'Error!',
                                  text: 'Please Enter Correct Email and Password Combination',
                                  icon: 'error'
                                })
                              }

                            }).catch( (error) => {
                              console.log(error)

                            })

        //Clear Password Input
        this.password = ''

      }catch (error) {

        console.log(error)

      }

    },

    emailIsNotEmpty() {

      if (parseInt(this.email.length) > 1)
        return true

    },

    passwordIsNotEmpty() {

      if (parseInt(this.password.length) > 1)
        return true

    },

    loginFieldsNotEmpty() {
      if (this.passwordIsNotEmpty() == true && this.emailIsNotEmpty() == true)
        return true
      else
        return false
    },


    //Pull Quote of The Day
    async pullQoD() {

      try {
        const response = await axios.get('https://quotes.rest/qod?language=en')

        const data = response.data

        this.qouteOfTheDay = data.contents.quotes[0].quote

      }catch (error) {
        console.log(error);

      }
      
    }

  },

  mounted() {

    //Pull Quote of The Day
    this.pullQoD()

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
  text-align: center;
}

#accountLoginBlock {
  max-width: 600px;
}

h1 {
  font-size: 40px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
