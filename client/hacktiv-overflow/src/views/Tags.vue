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
            <div class="row">
              <!-- <h2>Search By Tags</h2> -->
              <div class="col col-md-4" v-for="tag in allTags" :key="tag.id" style="overflow-y: scroll;">
                <!-- {{tag}} -->
                  <div class="col-12">
                      <div class="card my-5 mx-5">
                          <div class="card-body col-12">
                              <a href="#"><h5 class="card-title" @click="searchTag(tag._id)">{{tag.name}}</h5></a>
                              <!-- <p class="card-text">Asked by: people.</p> -->
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        </div>
  </div>
</template>

<script>
  import NavbarHomepage from '@/components/NavbarHomepage.vue' 
  import axios from '@/api/server.js'
  import { mapState } from "vuex";

  export default {
    created() {
      this.$store.dispatch('getTags')
    },
    data() {
      return {

      }
    },
    computed: mapState([
      "allTags"
    ]),
    components: {
      NavbarHomepage
    },
    methods: {
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
  };
</script>

<style>
</style>
