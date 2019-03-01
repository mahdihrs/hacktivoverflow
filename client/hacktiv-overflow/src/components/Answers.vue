<template>
    <div>
        <div style="text-align: left;">
            <h4>{{ answerOwnByCertainQuestion.length }} Answer(s)</h4>
        </div>
        <div v-for="answer in answerOwnByCertainQuestion" :key="answer.id">
            <div class="card my-1">
                <div class="card-body d-flex">
                    <div>
                        <a href="" @click.prevent="vote('up', answer._id)"><img src="https://img.icons8.com/ios/50/000000/sort-up.png" height="40px"></a> <br>
                        <h5>{{answer.upvotes.length - answer.downvotes.length}}</h5>
                        <a href="" @click.prevent="vote('down', answer._id)"><img src="https://img.icons8.com/ios/50/000000/sort-down.png" height="40px"></a>
                    </div>
                    <div class="col-9">
                        <div class="card-title-answer">
                            <h5>-- {{ answer.title }} --</h5>
                        </div>
                        <hr>
                        <div class="card-body-answer">
                            {{ answer.description }}
                        </div>
                        <!-- <div class="mt-2">
                            <button class="btn btn-success" v-if="localStorage.getItem('token')" @click="editQuestion">Edit</button>
                        </div> -->
                        <!-- {{answer}} -->
                    </div>
                    <div>
                        <p class="card2answer">{{ answer.user.full_name}}</p>
                        <p class="card2answer">{{ answer.user.created_at}}</p>
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
    data() {
        return {
            
        }
    },
    computed: mapState([
        "answerOwnByCertainQuestion",
        "isAdmin"
    ]),
    methods: {
        vote(direction, answerId) {
            if (!localStorage.getItem('token')) {
                swal("Unauthorized Access!", "Please login first", "error");
            } else {
                if (direction === 'up') {
                    this.$store.dispatch('upVotesAnswer', answerId)
                } else {
                    this.$store.dispatch('downVotesAnswer', answerId)
                }
            }
        },
        editAnswer() {
            
        }
    }
}
</script>

<style>
    .card2answer {
        font-size: 0.7em;
    }
</style>
