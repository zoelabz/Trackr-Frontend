<template>	
	<div>
		<DashboardHeader/>

        <br/>
        <div class="column">

            <div>
                <div class="float-left">
                    <h2>Users ({{ usersList.length }})</h2>
                </div>

                <div class="float-right">
                    <i class="fa fa-user-plus" aria-hidden="true" @click="toggleModal('add')"></i>
                </div>
                <br/>
            </div>
            
            <hr/>
            <div>
                <table class="table is-bordered">
                    <tr>
                        <td>ID</td>
                        <td>Firstname</td>
                        <td>Lastname</td>
                        <td>Email</td>
                        <td>Level</td>
                        <td>Actions</td>
                    </tr>

                    <tbody>
                        <tr v-for="(user, id) in usersList" v-bind:key="user._id">
                            <td>{{ id + 1 }}</td>
                            <td>{{ user.firstName }}</td>
                            <td>{{ user.lastName }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.level }}</td>
                            <td>
                                <div class="columns">
                                    <div class="column is-one-third">
                                        <span class="material-icons" @click="toggleModal('edit', user)">edit</span>
                                    </div>

                                    <div class="column is-one-third">
                                        <span class="material-icons" @click="deleteUser(user._id, id)">delete</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>


        <div class="modal is-active" v-if="addEditUserModal">
        
            <div class="modal-background"></div>

            <div class="modal-card">
                <header class="modal-card-head">

                <p class="modal-card-title" v-if="userActionMode == 'add'" >Add New User</p>
                <p class="modal-card-title" v-else>Edit User</p>

                <button class="delete" aria-label="close" @click="toggleModal"></button>
                </header>
                <section class="modal-card-body">
                
                        <table>
                            <tr>
                                <td>First Name</td>
                                <td><input type="text" v-model="firstName" class="input" placeholder="User First Name"></td>
                            </tr>

                            <tr>
                                <td>Last Name</td>
                                <td><input type="text" v-model="lastName" class="input" placeholder="User Last Name"></td>
                            </tr>

                            <tr>
                                <td>Email</td>
                                <td><input type="text" v-model="email" class="input" placeholder="User Email"></td>
                            </tr>

                            <tr>
                                <td>Password</td>
                                <td>
                                    <div class="columns">
                                        <div class="column is-four-fifths">
                                            <input type="password" v-model="password" class="input" placeholder="User Password" v-if="showingUserPassword">
                                            <input type="text" v-model="password" class="input" placeholder="User Password" v-else>
                                        </div>

                                        <div class="column" v-if="showingUserPassword">
                                            <span class="icon is-small is-right">
                                                <i class="fas fa-eye-slash" @click="toggelShowingPassword"></i>
                                            </span>
                                        </div>

                                        <div class="column" v-else>
                                            <span class="icon is-small is-right">
                                                <i class="fas fa-eye" @click="toggelShowingPassword"></i>
                                            </span>
                                        </div>


                                    </div>
                                    
                                </td>
                            </tr>

                        </table>

                </section>

                <footer class="modal-card-foot column">
                
                    <button class="button float-left" @click="toggleModal">Cancel</button>

                    <button class="button is-success float-right" 
                        v-if="userActionMode == 'add'" @click="addNewUser">Add New User</button>

                    <button class="button is-success float-right" 
                        v-else @click="updateUserData">Update User</button>

                </footer>
            </div>
        </div>


    </div>
</template>

<script type="text/javascript">
    import axios from 'axios'
	import Swal from 'sweetalert2'
    import DashboardHeader from '../incs/DashboardHeader.vue'
	
	export default {
		name: 'ManageUsersComponent',

		components: {
			'DashboardHeader': DashboardHeader
		},

        data() {
            return {
                addEditUserModal: false,
                showingUserPassword: true,

                userUpdateId: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',

                usersList: [],

                userActionMode : ''
            }
        },

        mounted: function () {

            this.fetchUsersList()

        },

        methods: {

            async updateUserData(itemId) {

                     if ((this.firstName !== "") && (this.lastName !== "") && (this.email !== "") ) {
                    
                    try {

                            //Sending Axios Post Request
                            await axios.put(this.$store.state.baseApi + '/api/user/update/' + this.userUpdateId, {
                                firstName : this.firstName,
                                lastName : this.lastName,
                                email : this.email,
                                password : this.password
                            }, {
                                headers: {
                                    'Authorization': 'token ' + this.$store.getters.getAuthToken
                                }
                            }).then( res => {

                                const data = res.data

                                if (data.status == true) {

                                    const user = data.data

                                    //Updating User List
                                    this.usersList.splice(
                                        itemId, 1, {
                                            '_id' : user._id,
                                            'firstName' : user.firstName,
                                            'lastName' : user.lastName,
                                            'email' : user.email, 
                                            'level' : user.level
                                        }
                                    )

                                    //Toggle Modal
                                    this.toggleModal()

                                    this.userUpdateId = this.firstName = this.lastName = this.email = this.password = ''

                                    //Swal Success
                                    Swal.fire(
                                        'Success',
                                        'User Was Updated Successfully',
                                        'success'
                                    )

                                }else {
                                    //Error Success
                                    Swal.fire(
                                        'Error',
                                        data.message,
                                        'error'
                                    )
                                }

                            }).catch( error => {
                                console.log(error)

                            })

                    }catch (error) {
                        console.log(error)

                    }
            
                }else {
                    Swal.fire(
                        'Warning',
                        'Please Fill all The Fields',
                        'warning'
                    )
                }

            },

            async deleteUser(userId, itemId) {

                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete!'
                    }).then((result) => {
                    if (result.isConfirmed) {

                        axios.delete(this.$store.state.baseApi + '/api/user/delete/' + userId, {
                                headers: {
                                    'Authorization': 'token ' + this.$store.getters.getAuthToken
                                }
                            })
                            .then( res => {

                                const data = res.data

                                if (data.status == true) {

                                    //Remove Item in List
                                    this.usersList.splice(itemId, 1)

                                    Swal.fire(
                                        'Deleted!',
                                        'User Was Deleted Successfully',
                                        'success'
                                        )
                                }else {
                                    Swal.fire(
                                        'Error!',
                                        'Failed to Delete User',
                                        'error'
                                        )
                                }

                            })
                            .catch( error => {
                                console.log(error)
                            })

                        
                    }
                    })

            },

            async fetchUsersList() {
                await axios.get(this.$store.state.baseApi + "/api/user/all", {
                                headers: {
                                    'Authorization': 'token ' + this.$store.getters.getAuthToken
                                }
                            })
                    .then( res => {

                        const data = res.data

                        if (data.status == true) {

                            const users = data.data

                            users.forEach(user => {

                                this.usersList.unshift(
                                    {
                                        '_id' : user._id,
                                        'firstName' : user.firstName,
                                        'lastName' : user.lastName,
                                        'email' : user.email, 
                                        'level' : user.level
                                    }
                                )
                            })

                        }

                    })
                    .catch(error => {
                        console.log(error);

                    })
            },

            toggelShowingPassword() {
                this.showingUserPassword = (!this.showingUserPassword)
            },

            async addNewUser() {
                if ((this.firstName !== "") && (this.lastName !== "") && (this.email !== "") && (this.password !== "") ) {
                    
                    try {

                            //Sending Axios Post Request
                            await axios.post(this.$store.state.baseApi + '/api/user/create/', {
                                firstName : this.firstName,
                                lastName : this.lastName,
                                email : this.email,
                                password : this.password
                            }).then( res => {

                                const data = res.data

                                if (data.status == true) {

                                    const user = data.data

                                    //Updating User List
                                    this.usersList.push(
                                        {
                                            '_id' : user._id,
                                            'firstName' : user.firstName,
                                            'lastName' : user.lastName,
                                            'email' : user.email, 
                                            'level' : user.level
                                        }
                                    )

                                    //Toggle Modal
                                    this.toggleModal()

                                    this.firstName = this.lastName = this.email = this.password = ''

                                    //Swal Success
                                    Swal.fire(
                                        'Success',
                                        'New User Was Added Successfully',
                                        'success'
                                    )

                                }else {
                                    //Error Success
                                    Swal.fire(
                                        'Error',
                                        data.message,
                                        'error'
                                    )
                                }

                            }).catch( error => {
                                console.log(error)

                            })

                    }catch (error) {
                        console.log(error)

                    }
            
                }else {
                    Swal.fire(
                        'Warning',
                        'Please Fill all The Fields',
                        'warning'
                    )
                }
            },

            toggleModal(actionMode, user) {
                this.userActionMode = actionMode

                if (actionMode == 'edit') {
                    this.userUpdateId = user._id
                    this.firstName = user.firstName
                    this.lastName = user.lastName
                    this.email = user.email
                }else {
                    this.userUpdateId = this.firstName = this.lastName = this.email = ''
                }

                this.addEditUserModal = (!this.addEditUserModal)
            }
        }
	}
</script>

<style scoped>
    table {
        width: 100%;
    }
</style>