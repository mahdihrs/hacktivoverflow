<template>
    <div>
        <div class="d-flex">
            <div class="col-1 mt-5">
                <a href="#" @click="vote('up')"><img src="https://img.icons8.com/ios/50/000000/sort-up.png" height="50px"></a>
                <!-- {{totalVotes}} -->
                <h4>{{certainQuestion.upvotes.length - certainQuestion.downvotes.length}}</h4>
                <a href="#" @click="vote('down')"><img src="https://img.icons8.com/ios/50/000000/sort-down.png" height="50px"></a>
            </div>
            <div class="col-9">
                <div id="title" class="my-3">
                    <h1>{{ certainQuestion.title }}</h1>
                </div>
                <hr>
                <div>
                    <h5>{{ certainQuestion.description }}</h5>
                </div>
                <hr>
                <div style="font-size: 0.8em;">
                    <p class="m-0">Asked by: {{ certainQuestion.user.full_name }}</p>
                    <p>{{ certainQuestion.created_at }}</p>
                </div>
                <div class="mt-2">
                    <button class="btn btn-success" v-if="isAdmin" @click="editQuestion">Edit</button>
                </div>
                <div class="md-form amber-textarea active-amber-textarea col-12 my-5">
                    <h5>Your Answer:</h5>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Title" v-model="title">
                    <i class="fas fa-pencil-alt prefix"></i>
                    <textarea type="text" id="form22" class="md-textarea form-control" rows="3" placeholder="Write an answer here ..." v-model="answer"></textarea>
                    <button class="btn btn-primary mt-2" @click="postAnswer">Submit Answer</button>
                </div>
                <Answers />
                <!-- <div style="text-align: left;">
                    <h4>{{ certainQuestion.answers.length }} Answer(s)</h4>
                </div>
                <div v-for="answer in answers" :key="answer.id">
                    <div class="card my-2">
                        <div class="card-body">
                            <div class="card-title-answer">
                                <h5>-- {{ answer.title }} --</h5>
                            </div>  
                            <hr>
                            <div class="card-body-answer">
                                {{ answer.description }}
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/api/server.js'
import Answers from '@/components/Answers.vue'
import { mapState } from "vuex";

export default {
    data() {
        return {
            id: this.$route.params.id,
            data: this.$route.params.data,
            title: '',
            answer: '',
            // isAdmin: true
        }
    },
    created() {
        this.$store.dispatch('getAnswers', this.$route.params.id)
        // this.cekAdmin()
        // console.log(this.certainQuestion)
    },
    computed: mapState([
        "certainQuestion",
        "isAdmin"
    ]),
    components: {
        Answers
    },
    methods: { 
        // cekAdmin() {
        //     console.log(this.certainQuestion)
        //     console.log(localStorage.getItem('id'), 'userrr')
        // },
        postAnswer() {
            this.$store.dispatch('postAnswer', {
                questionId: this.id,
                title: this.title,
                description: this.answer
            })
        },
        vote(voteQuestionMark) {
            if (!localStorage.getItem('token')) {
                swal("Unauthorized Access!", "Please login first", "error");
            }
            if (voteQuestionMark === 'up') {
                this.$store.dispatch('upVotes', this.certainQuestion._id)
            } else {
                this.$store.dispatch('downVotes', this.certainQuestion._id)
            }
        },
        editQuestion() {
            this.$router.push({
                name: `edit-question-from-detail`,
                params: {
                    id: this.certainQuestion._id,
                    userId: localStorage.getItem('id'),
                    data: this.certainQuestion,
                }
            })
        }
    }
}
</script>

<style>

</style>
