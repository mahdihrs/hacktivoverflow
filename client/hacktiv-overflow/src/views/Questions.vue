<template>
    <div>
        <NavbarHomepage />
        <div class="d-flex vh-100">
            <div id="side-menu" class="col-2" style="border-right: 1px solid black; height: 100%; text-align: left; font-size: 1.5em;">
                <div>
                    <router-link to="/">Tags</router-link> 
                </div>
                <div>
                    <router-link to="/questions">Questions</router-link>
                </div>
                <div>
                    <router-link to="/profile">Users</router-link>
                </div>
            </div>
            <div class="col-8">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import NavbarHomepage from '@/components/NavbarHomepage.vue' 
import axios from '@/api/server.js'

export default {
    data() {
        return {
            
        }
    },
    created() {
        this.getAllQs()
    },
    computed: {

    },
    components: {
        NavbarHomepage
    },
    methods: {
        getAllQs() {
            this.$store.dispatch('getAllQuestions')
        }
    }    
}
</script>

<style>
    /* #side-menu { */
        /* background-color: #88D67C; */
    /* } */
</style>
