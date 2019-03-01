<template>
    <div class="my-6">
        <h1 class="my-4">Create Question</h1>
        <form class="container" @submit.prevent="createQuestion">
            <div class="form-group">
                <!-- <label for="formGroupExampleInput">Example label</label> -->
                <input id="title-input" type="text" class="form-control" placeholder="Question's Title" v-model="title">
            </div>
            <vue-tags-input
                v-model="tag"
                :tags="tags"
                @tags-changed="newTags => tags = newTags"
                class="form-group vw-100"
            />
            <!-- <div class="form-group">
                <label for="formGroupExampleInput">Example label</label>
                <input id="title-input" type="text" class="form-control" placeholder="Tags" v-model="tags">
            </div> -->
            <!-- <div class="md-form amber-textarea active-amber-textarea">
                <i class="fas fa-pencil-alt prefix"></i>
                <textarea type="text" id="form22" class="md-textarea form-control" rows="3" placeholder="Write question detail here ..." height="500px" v-model="content"></textarea> -->
                <!-- <label for="form22">Material textarea with colorful prefix on :focus state</label> -->
            <!-- </div> -->
            <div>
                <!-- <wysiwyg v-model="content" /> -->
                <wysiwyg v-model="myHTML" />
            </div>
            <div class="mt-2">
                <button class="btn btn-success btn-md">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from '@/api/server.js'
import VueTagsInput from '@johmun/vue-tags-input'

export default {
    data() {
        return {
            title: '',
            content: '',
            tag: '',
            tags: [],
            myHTML: ''
        }
    },
    components: {
        // wysiwyg: vueWysiwyg.default.component,
        VueTagsInput
    },
    methods: {
        createQuestion() {
            if (!localStorage.getItem('token')) {
                swal("Access Denied!", "You have to login first to create question!", "error");
            } else {
                // axios.post('/questions', {})
                axios({
                    method:'post',
                    url:'/questions',
                    headers: {
                        access_token: localStorage.getItem('token')
                    },
                    data: {
                        title: this.title,
                        description: this.myHTML,
                        tags: this.tags
                    }
                })
                .then(({data}) => {
                    swal("Question has been stored");
                    this.$router.replace({
                        name: 'question',
                        path: '/questions'
                    })
                })
                .catch(err => {
                    console.log(err)
                    swal('ERROR! Internal Server Error')
                })
            }
        }
    }    
}
</script>

<style>
    #title-input {
        font-size: 1em;
    }
    .active-pink-textarea.md-form label.active {
    color: #f48fb1;
    }
    .pink-textarea textarea.md-textarea:focus:not([readonly]) {
        border-bottom: 1px solid #f48fb1;
        box-shadow: 0 1px 0 0 #f48fb1;
    }
    .pink-textarea.md-form .prefix.active {
        color: #f48fb1;
    }

    .active-amber-textarea.md-form label.active {
        color: #ffa000;
    }
    .amber-textarea textarea.md-textarea:focus:not([readonly]) {
        border-bottom: 1px solid #ffa000;
        box-shadow: 0 1px 0 0 #ffa000;
    }
    .amber-textarea.md-form .prefix.active {
        color: #ffa000;
    }

    .active-pink-textarea-2 textarea.md-textarea {
        border-bottom: 1px solid #f48fb1;
        box-shadow: 0 1px 0 0 #f48fb1;
    }
    .active-pink-textarea-2.md-form label.active {
        color: #f48fb1;
    }
    .active-pink-textarea-2.md-form label {
        color: #f48fb1;
    }
    .active-pink-textarea-2.md-form .prefix {
        color: #f48fb1;
    }

    .active-amber-textarea-2 textarea.md-textarea {
        border-bottom: 1px solid #ffa000;
        box-shadow: 0 1px 0 0 #ffa000;
    }
    .active-amber-textarea-2.md-form label.active {
        color: #ffa000;
    }
    .active-amber-textarea-2.md-form label {
        color: #ffa000;
    }
    .active-amber-textarea-2.md-form .prefix {
        color: #ffa000;
    }
</style>
