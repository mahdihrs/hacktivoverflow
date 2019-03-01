<template>
    <div class="ml-5 my-3">
        <!-- {{TagFound}} -->
        <!-- {{questionsFoundByTag}} -->
        <div v-for="q in questionsFoundByTag" :key="q.id">
            <!-- {{q}} -->
            <div class="card w-75 my-3">
                <div class="card-body">
                    <!-- <button href="#"> -->
                    <!-- {{q._id}} -->
                    <h5 class="card-title"><a href="#" @click="toDetailQ(q._id)">{{q.title}}</a></h5>
                    <p class="card-text" v-html="q.description"></p>
                    <!-- <a href="#" class="btn btn-primary">Button</a> -->
                    <!-- </button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        props: ['TagFound'],
        data() {
            return {

            }
        },
        created() {
            this.$store.dispatch('tagSearch', this.$route.params.id)
        },
        methods: {
            toDetailQ(id) {
                console.log(id)
                this.$store.dispatch('getAnswers', this.$route.params.id)
                this.$router.push({
                    name: 'question-detail',
                    path: `/q/:id`,
                    params: {
                        // title: data.title,
                        id: id
                    }
                })
            }
        },
        computed: mapState([
            "questionsFoundByTag"
        ])
    }
</script>

<style>

</style>
