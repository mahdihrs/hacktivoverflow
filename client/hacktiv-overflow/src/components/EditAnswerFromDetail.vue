<template>
    <div>
        <div class="md-form amber-textarea active-amber-textarea col-12 my-5">
            <h5>Your Answer:</h5>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Title" v-model="title">
            <i class="fas fa-pencil-alt prefix"></i>
            <textarea type="text" id="form22" class="md-textarea form-control" rows="3" placeholder="Write an answer here ..." v-model="answer"></textarea>
            <button class="btn btn-primary mt-2" @click="postAnswer">Submit Answer</button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
