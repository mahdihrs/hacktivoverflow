<template>
    <div>
        <NavbarHomepage />
        <div class="d-flex vh-100">
            <div id="side-menu" class="col-2" style="border-right: 2px solid #087E8B; height: 100%; text-align: left; color: #087E8B; font-size: 1.5em;">
                <div>
                    <router-link style="color: #087E8B;" to="/tags">Tags</router-link> 
                </div>
                <div>
                    <router-link style="color: #087E8B;" to="/questions">Questions</router-link>
                </div>
                <div>
                    <router-link style="color: #087E8B;" to="/profile">Users</router-link>
                </div>
            </div>
            <div class="col-8" style="overflow-y: scroll;">
                <router-view @search-tag="searchByTag" :TagFound="tagged"/>
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
            tagged: []
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
        },
        searchByTag(payload) {
            axios({
                url: `/questions/search-tag/${payload}`,
                methods: 'get'
            })
            .then(({data}) => {
                // console.log(data)
                this.tagged = data
            })
            .catch(err => {
                console.log(err)
            })
        }
    }    
}
</script>

<style>
    /* #side-menu { */
        /* background-color: #88D67C; */
    /* } */
</style>
