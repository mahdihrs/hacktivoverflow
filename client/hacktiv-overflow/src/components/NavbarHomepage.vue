<template>
    <div>
        <nav id="navHome" class="navbar navbar-expand-lg navbar-light bg-light">
            <!-- <a class="navbar-brand" href="#"><img src="https://www.shareicon.net/data/32x32/2016/01/10/241001_dock_32x32.png" alt="logo"> <span id="brainflow">BrainFlow</span></a> -->
            <router-link to="/" class="navbar-brand" href="#"><img src="https://www.shareicon.net/data/32x32/2016/01/10/241001_dock_32x32.png" alt="logo"> <span id="brainflow">BrainFlow</span></router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link style="font-family: 'Playfair Display', serif;" class="nav-link" to="/questions"><strong>Explore</strong><span class="sr-only">(current)</span></router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li> -->
                    <!-- <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li> -->
                    <li class="nav-item active">
                        <router-link style="font-family: 'Playfair Display', serif;" class="nav-link" to="/login" v-if="!isLogin"><strong>Login</strong></router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link style="font-family: 'Playfair Display', serif;" class="nav-link" to="/register" v-if="!isLogin"><strong>Register</strong></router-link>
                    </li>
                </ul>
                <!-- <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
                <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
                <!-- </form> -->

                <a class="btn" href="#" @click="logout" v-if="isLogin">Logout</a>
            </div>
        </nav>                
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                // isSomeoneLogin: false
            }
        },
        computed: mapState([
            "isLogin"
        ]),
        created() {
            // if (!localStorage.getItem('token')) {
            //     this.isSomeoneLogin = false
            // } else {
            //     this.isSomeoneLogin = true
            // }
        },
        methods: {
            logout() {
                if (!localStorage.getItem('token')) {
                    swal("You haven't been login. Please login first")
                } else {
                    localStorage.removeItem('token')
                    localStorage.removeItem('id')
                    swal("User logout", "Logging out...", "success");
                    this.$store.commit('whosLogin', '')
                    this.$store.commit('isLoginQuestionMark', false)
                    this.$router.replace('/')
                }
            }
        }
    }
</script>

<style>
    .bg-light {
        background-color: #087E8B !important;
    }
    #brainflow {
        color: rgb(99, 250, 74);
        font-family: 'Playfair Display', serif;
        font-weight: 700;
    }
</style>    
