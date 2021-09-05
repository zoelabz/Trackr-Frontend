<template>
  
<div>
    
    <nav class="navbar" role="navigation" aria-label="main navigation" style="border-bottom: 1px solid #359e6b;">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="@/assets/logo.png"> <strong>Trackr</strong>
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/dashboard" class="navbar-item">
            Dashboard
          </router-link>

          <router-link to="/manage/users" class="navbar-item">
            Users
          </router-link>

          <a class="navbar-item">
            Projects
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Settings
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                Login Logs
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                Change My Password
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a href="#">
                <i class="fa fa-user-o" aria-hidden="true"></i>&nbsp;
                <span>Welcome Elijah</span><sup>Admin</sup>&nbsp;
              </a>

              <a class="button is-danger" @click="logout()">
                <i class="fa fa-share" aria-hidden="true"></i>&nbsp;
                <strong>Logout</strong>
              </a>

            </div>
          </div>
        </div>
      </div>
    </nav>

</div>
  
</template>


<script>

import axios from 'axios';
import Swal from 'sweetalert2'

  export default {
    name: 'DashboardHeader',

    mounted() {
          let navbar = document.querySelector('.navbar-burger');
          navbar.addEventListener('click', function () {
              let target = navbar.dataset.target;
              let $target = document.getElementById(target);
              navbar.classList.toggle('is-active');
              $target.classList.toggle('is-active');

            });
      
      },

      methods: {

        async logout() {

          try {

            await axios.put(this.$store.state.baseApi + '/api/auth/logout', {
              user: this.$store.state.user
            }).then( (response) => {

              const data = response.data

              if (data.status == true) {
                //Remove User on Session
                this.$store.commit('removeUserOnSession')

                //Redirect to Login
                this.$router.push('/')

              }else {
                //Failed to Logout
                Swal.fire({
                  title: 'Error!',
                  text: 'Failed to Logout',
                  icon: 'error'
                })
              }

            }).catch( (error) => {
              console.log(error)

            });

          }catch (error) {
            console.log(error)
          }
          
        }

      }



    }
</script>


<style scoped>
  .navbar-item.is-mega {
    position: static;

    .is-mega-menu-title {
      margin-bottom: 0;
      padding: .375rem 1rem;
    }
  }

</style>
