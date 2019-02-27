<template>
    <div>
        <div class="md-form amber-textarea active-amber-textarea col-12 my-5">
            <h5>Edit Answer:</h5>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Title" v-model="title">
            <i class="fas fa-pencil-alt prefix"></i>
            <textarea type="text" id="form22" class="md-textarea form-control" rows="3" placeholder="Write an answer here ..." v-model="answer"></textarea>
            <button class="btn btn-primary mt-2" @click="editAnswer">Edit Answer</button>
        </div>
        <div>
        {{data}}    

        </div>
    </div>
</template>

<script>
import axios from '@/api/server.js'

export default {
    data() {
        return {
            title: this.$route.params.data.title,
            answer: this.$route.params.data.description,
            data: this.$route.params
        }
    },
    methods: {
        editAnswer() {
            axios({
                url: `/answers/${this.$route.params.id}`,
                method: 'put',
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    title: this.title,
                    description: this.answer
                }
            })
            .then(({data}) => {
                console.log(data)
                swal('Answer has been successfully updated')
                this.$router.replace('/profile')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>