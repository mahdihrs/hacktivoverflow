<template>
    <div class="my-6">
        <!-- {{this.$route.params}} -->
        <h1 class="my-4">Edit Question</h1>
        <form class="container" @submit.prevent="editQuestion">
            <div class="form-group">
                <!-- <label for="formGroupExampleInput">Example label</label> -->
                <input id="title-input" type="text" class="form-control" v-model="title">
            </div>
            <div class="form-group">
                <!-- <label for="formGroupExampleInput">Example label</label> -->
                <input id="title-input" type="text" class="form-control" placeholder="Tags" v-model="tags">
            </div>
            <div class="md-form amber-textarea active-amber-textarea">
                <i class="fas fa-pencil-alt prefix"></i>
                <textarea type="text" id="form22" class="md-textarea form-control" rows="3" placeholder="Write question detail here ..." v-model="description"></textarea>
                <!-- <label for="form22">Material textarea with colorful prefix on :focus state</label> -->
            </div>
            <div class="mt-2">
                <button class="btn btn-success btn-md">Edit Question</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from '@/api/server.js'

export default {
    data() {
        return {
            data: this.$route.params,
            title: this.$route.params.data.title,
            description: this.$route.params.data.description,
            tags: ''
            // title: this.$route.params
        }    
    },
    methods: {
        editQuestion() {
            if (!localStorage.getItem('token')) {
                swal('UNAUTHORIZED ACCESS!')
            } else {
                axios({
                    url: `/questions/${this.$route.params.id}`,
                    method: 'put',
                    headers: {
                        access_token: localStorage.getItem('token')
                    },
                    data: {
                        title: this.title,
                        description: this.description
                    }
                })
                .then(({data}) => {
                    // console.log(data)
                    swal('Question has been successfully updated')
                    // console.log(t)
                    this.$store.commit('editQuestion', {
                        title: this.title,
                        description: this.description
                    })
                    this.$router.push({
                        name: 'question-detail',
                        path: `/questions/q/${this.$route.params.data.id}`,
                        params: {
                            id: this.$route.params.id
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }
}
</script>

<style>

</style>
