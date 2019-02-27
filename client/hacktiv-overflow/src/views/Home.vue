<template>
  <div class="home">
    <NavbarHomepage />
    <router-view />
  </div>
</template>

<script>
import NavbarHomepage from '@/components/NavbarHomepage.vue'

export default {
  name: 'home',
  components: {
    NavbarHomepage
  },
  created() {
    
  },
  data() {
    return {

    }
  }
}
</script>
