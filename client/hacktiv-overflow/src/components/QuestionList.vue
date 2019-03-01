<template>
    <div>
        <div class="my-5">
            <router-link to="/questions/create" style="color: white;"><button class="btn btn-primary btn-block">Add Question</button></router-link>
        </div>
        <div class="card my-3 mx-3" v-for="q in this.allQuestions()" :key="q.id">
            <div class="card-body d-flex">
                <div class="d-flex flex-column">
                    <div class="col-3 d-flex p-0">
                        <div class="m-1">
                            Votes <br>
                            <strong>{{ q.upvotes.length - q.downvotes.length }}</strong>
                        </div>
                        <div class="m-1">
                            Answers <br>
                            <strong>{{q.answers.length}}</strong>
                        </div>
                    </div>
                    <div class="mt-3 justify-content-center">
                        <h5 class="mt-1">Tags</h5>
                        <div v-if="q.tags.length === 0">
                            No Tag Included
                        </div>
                        <div v-else v-for="tag in q.tags" :key="tag.id">
                            <a href="#" class="my-0" @click="searchTag(tag._id)">{{ tag.name }}</a>
                        </div>
                    </div>
                </div>
                <div id="content" class="col-7">
                    <div id="title">
                        <a href="#" @click="toDetailQuestion(q._id)">{{ q.title }}</a>
                    </div>
                    <hr>
                    <div id="content">
                        <p v-html="q.description"></p>
                    </div>
                </div>
                <div class="ml-1" style="border-left: 1px solid black;text-align: left; font-size: 0.8em;">
                    <p class="ml-2">Created by: {{ q.user.full_name }} </p> <br>
                    <br>
                    <p class="ml-2">Timestamp: {{ convertDate(q.created_at) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/api/server.js'
import { mapState } from "vuex";

export default {
    data() {
        return {
            
        }
    },
    computed: mapState([
        "answerOwnByCertainQuestion"
    ]),
    methods: {
        allQuestions() {
            return this.$store.state.allQuestions
        },
        convertDate(date) {
            return new Date(date).toLocaleDateString('en-US')
            // let hari = date.getDay()
            // switch (hari) {
            //     case 1:
            //         hari = 'Senin'
            //         break;
            //     case 2:
            //         hari = 'Selasa'
            //         break;
            //     case 3:
            //         hari = 'Rabu'
            //         break;
            //     case 4:
            //         hari = 'Kamis'
            //         break;
            //     case 5: 
            //         hari = 'Jumat'
            //         break;
            //     case 6:
            //         hari = 'Sabtu'
            //         break;
            //     case 7:
            //         hari = 'Minggu'
            //         break;
            //     default:
            //         break;
            // }
            // return `${hari}, ${bulan}-${tanggal}=${tahun}`
        },
        toDetailQuestion(id) {
            axios.get(`/questions/${id}`)
            .then(({data}) => {
                this.$router.push({
                    name: 'question-detail',
                    params: {
                        id: data._id,
                        data: data
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        searchTag(id) {
            this.$router.push({
                name: 'search-tag',
                path: 'search-by-tag/:id',
                params: {
                    id: id
                }
            })
            this.$emit('search-tag', id)
        }
    }    
}
</script>

<style>

</style>
