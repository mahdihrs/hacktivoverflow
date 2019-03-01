<template>
    <div>
        <h1 class="my-3 formFont">Login Form</h1>
        <form @submit.prevent="login" class="container justify-content-between ">
            <div class="form-group">
                <label for="formGroupExampleInput" class="formFont">Email</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="e.g. john.minor@mail.com" v-model="email">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput3" class="formFont">Password</label>
                <input type="password" class="form-control" id="formGroupExampleInput3" placeholder="Password" v-model="password">
            </div>
            <button class="btn btn-primary formFont" type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import axios from '@/api/server.js'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: mapState([
        "isLogin"
    ]),
    methods: {
        login() {
            axios.post('/users/login', {
                email: this.email,
                password: this.password
            })
            .then(({data}) => {
                this.$store.commit('whosLogin', data.id)
                this.$store.commit('isLoginQuestionMark', true)
                localStorage.setItem('token', data.token)
                localStorage.setItem('id', data.id)
                swal({
                    title: `Welcome ${data.user}!`,
                    icon: "success",
                    button: "OK",
                });
                this.$router.replace({
                    name: 'question'
                })
            })
            .catch(err => {
                if (err.response.status == 404) {
                    swal("Authorization Failed", "Wrong username/password", "warning");
                } else {
                    swal("Internal Server Error", "", "error");
                }
            })
        }
    }
}
</script>

<style>
    .formFont {
        font-family: 'Playfair Display', serif;
        font-weight: 700;
    }
    .form-group {
        text-align: left;
        width: 70%;
    }
</style>
