<template>
  
<div>
    
    <nav class="navbar" role="navigation" aria-label="main navigation" style="border-bottom: 1px solid #359e6b;">
      <div class="navbar-brand">
        
        <router-link to="/dashboard" class="navbar-item">
          <img src="@/assets/logo.png"> <strong>Trackr</strong>
        </router-link>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/dashboard" class="navbar-item">
            <i class="fas fa-home"></i>&nbsp;Dashboard
          </router-link>

          <router-link to="/organizations" class="navbar-item" v-if="isAdmin()">
            <i class="fas fa-sitemap"></i>&nbsp;Organizations
          </router-link>

          <router-link to="/manage/users" class="navbar-item" v-if="isAdmin()">
            <i class="fas fa-users"></i>&nbsp;Users
          </router-link>

          <router-link to="/projects" class="navbar-item">
            <i class="fas fa-project-diagram"></i>&nbsp;Projects
          </router-link>

          <router-link to="/projects/milestones" class="navbar-item">
            <i class="fas fa-tasks"></i>&nbsp;Milestones
          </router-link>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <i class="fas fa-cogs"></i>&nbsp;Settings
            </a>

            <div class="navbar-dropdown">
              <router-link to="/login/logs" class="navbar-item">
                Login Logs
              </router-link>

              <hr class="navbar-divider">
              <router-link to="/change/my/password" class="navbar-item">
                Change My Password
              </router-link>
              
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a href="#">
                <i class="fa fa-user" aria-hidden="true"></i>&nbsp;
                <span>Welcome {{ this.$store.state.user.firstName }}</span>&nbsp;&nbsp;
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

        isAdmin() {
          
          if (this.$store.state.user.level == 1) {
            return true

          }else {
            return false

          }

        },

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
