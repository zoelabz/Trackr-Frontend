<template>
  <div class="center">

    <title>Forgot Password</title>

    <img alt="Trackr Logo" src="@/assets/logo.png" id="trackrLogo">

    <!-- <h1 style="text-align: center;">Reset Password Login</h1> -->
    
    <div class="columns">
      
      <div class="column is-one-third"></div>

      <div class="column is-one-third" style="text-align: center;">

        <div class="field">
          <label class="label">Reset Password | Enter Your Email</label>

          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" v-model="email" placeholder="Enter Your Email" autofocus="true">
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
              @click="resetPassword()" :disabled="!emailIsNotEmpty()">Send Password Reset Link</button>
        </div>

        <div class="column">
          <p>
            <router-link to='/'>Have An Account ? Login Here</router-link>
          </p>
        </div>

        <div class="column">
          <br/><br/><br/>
          <strong>Quote of The Day</strong><br/>
          <p>{{ qouteOfTheDay }}</p>
        </div>


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

      qouteOfTheDay: ''

    }
    
  },

  methods: {

    async resetPassword() {

      try {

          await axios.post(this.$store.state.baseApi + '/api/auth/reset/password',
                            {
                              email: this.email

                            }).then( (res) => {

                              const data = res.data

                              if (data.status == "SUCCESS") {
                                //Toasting
                                Swal.fire({
                                  title: 'Error!',
                                  text: 'Password Reset Email Sent Successfully',
                                  icon: 'error'
                                })
                              }else {
                                Swal.fire({
                                  title: 'Error!',
                                  text: 'Email does not Exists',
                                  icon: 'error'
                                })
                              }

                            }).catch( (error) => {
                              console.log(error)

                            })

        //Clear Password Input
        this.email = ''

      }catch (error) {

        console.log(error)

      }

    },

    emailIsNotEmpty() {

      if (parseInt(this.email.length) > 1)
        return true

    },

  },

  mounted() {

    //Pull Quote of The Day
    this.qouteOfTheDay = this.$store.state.QoD

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


#trackrLogo {
  width: 250px;
  height: 250px;
}

.center {
  text-align: center;
}

#resetPasswordBlock {
  width: 100%;
  padding-left: 35%;
  padding-right: 35%;
}

h1 {
  font-size: 30px;
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
