<template>
    <div>
        <h1 class="my-3 formFont">Register Form</h1>
        <form @submit.prevent="register" class="container justify-content-between ">
            <div class="form-group">
                <label for="formGroupExampleInput" class="formFont">Full Name</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="e.g. Barbara Ann" v-model="name">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput3" class="formFont">Email</label>
                <input type="text" class="form-control" id="formGroupExampleInput3" placeholder="e.g. barbara@beachboys.com" v-model="email">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput4" class="formFont">Password</label>
                <input type="password" class="form-control" id="formGroupExampleInput4" placeholder="Password" v-model="password">
            </div>
            <button class="btn btn-primary formFont" type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import axios from '@/api/server.js'

export default { 
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            axios.post('/users', {
                full_name: this.name,
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                this.$store.commit('whosLogin', data.id)
                localStorage.setItem('token', data.token)
                localStorage.setItem('id', data.id)
                swal({
                    title: `Congratulations ${data.name}!`,
                    text: "You have been successfully registered!",
                    icon: "success",
                    button: "OK",
                });
                this.$router.replace({
                    name: 'question'
                })
            })
            .catch(err => {
                console.log(err)
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
