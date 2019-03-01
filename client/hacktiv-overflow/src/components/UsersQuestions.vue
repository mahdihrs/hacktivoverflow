<template>
    <div>
        <h2 class="mt-4">My Questions</h2>
        <div class="my-5" v-for="q in usersQuestions" :key="q.id">
            <div class="card">
                <div class="card-body d-flex">
                    <div class="col-2">
                        <button class="btn btn-info" style="width: 75px" @click="editQuestion(q)">Edit</button> <br>
                        <button class="btn btn-danger mt-1" @click="removeQuestion(q._id)">Delete</button>
                    </div>
                    <div class="col-10">
                        <div>
                            <h5>{{ q.title }}</h5>
                        </div>
                        <hr>
                        <div>
                            <h5 v-html="q.description"></h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr>

        <h2>My Answers</h2>
        <div class="my-5" v-for="a in usersAnswer" :key="a.id">
            <div class="card">
                <div class="card-body d-flex">
                    <div class="col-2">
                        <button class="btn btn-info" style="width: 75px" @click="editAnswer(a)">Edit</button> <br>
                        <button class="btn btn-danger mt-1" @click="removeAnswer(a._id)">Delete</button>
                    </div>
                    <div class="col-10">
                        <div>
                            <h5><a href="#" @click="toQuestion(a._id)">{{ a.title }}</a></h5>
                            <!-- {{a}} -->
                        </div>
                        <hr>
                        <div>
                            {{ a.description }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from '@/api/server.js'

export default {
    created() {
        this.$store.dispatch('getUsersQs')
        this.$store.dispatch('getUsersAs')
    },
    computed: mapState([
        "usersQuestions",
        "usersAnswer"
    ]),
    methods: {
        removeQuestion(id) {
            swal({
                title: "Are you sure?",
                text: "Are you sure want to delete this answer?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    axios({
                        url: `/questions/${id}`,
                        method: 'delete',
                        headers: {
                            access_token: localStorage.getItem('token')
                        }
                    })
                    .then(({data}) => {
                        let index = this.usersQuestions.findIndex(e => e._id == id)
                        this.usersQuestions.splice(index, 1)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    swal("Your answer has been deleted!", {
                        icon: "success",
                    });
                }
            });
        },
        removeAnswer(id) {
            swal({
                title: "Are you sure want to delete this answer?",
                // text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    axios({
                        url: `/answers/${id}`,
                        method: 'delete',
                        headers: {
                            access_token: localStorage.getItem('token')
                        }
                    })
                    .then(({data}) => {
                        let index = this.usersAnswer.findIndex(e => e._id == id)
                        this.usersAnswer.splice(index, 1)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    swal("Your answer has been deleted!", {
                        icon: "success",
                    });
                } 
            });
        },
        editQuestion(data) {
            this.$router.push({
                name: `edit-question`,
                params: {
                    id: data._id,
                    userId: localStorage.getItem('id'),
                    data: data,
                }
            })
        },
        editAnswer(data) {
            this.$router.push({
                name: `edit-answer-from-profile`,
                path: 'answer/edit/a/:userId/:id',
                params: {
                    id: data._id,
                    userId: localStorage.getItem('id'),
                    data: data,
                }
            })
        },
        toQuestion(id) {
            // console.log(id)
            axios({
                url: `/answers/get-question/${id}`,
                methods: 'get',
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.$store.dispatch('getAnswers', data._id)
                this.$router.push({
                    name: 'question-detail',
                    path: `/q/:id`,
                    params: {
                        // title: data.title,
                        id: data._id
                    }
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

</style>
