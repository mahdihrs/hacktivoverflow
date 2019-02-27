import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/server.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    allQuestions: [],
    userLogin: '',
    answerOwnByCertainQuestion: [],
    certainQuestion: {},
    totalVotes: 0,
    isAdmin: false,
    usersQuestions: [],
    usersAnswer: []
  },
  mutations: {
    editQuestion(state, payload) {
      // console.log(state.certainQuestion)
      state.certainQuestion.title = payload.title
      state.certainQuestion.description = payload.description
    },
    isItAdmin(state, payload) {
      state.isAdmin = payload
    },
    whosLogin(state, payload) {
      state.userLogin = payload
    },
    getAllQs(state, payload) {
      state.allQuestions = payload
    },
    putUserQuestions(state, payload) {
      state.usersQuestions = payload
    },
    putUserAnswers(state, payload) {
      state.usersAnswer = payload
    },
    isLoginQuestionMark(state, payload) {
      state.isLogin = payload
    },
    getAnswers(state, payload) {
      state.answerOwnByCertainQuestion = payload
    },
    createAnswer(state, payload) {
      state.answerOwnByCertainQuestion.push(payload)
    },
    newQuestionOnAllQuestions(state, payload) {
      state.allQuestions.forEach(q => {
        if (q._id == payload.questionId) {
          q.answers.push(payload.data)
        }
      });
    },
    toCertainQuestion(state, payload) {
      state.certainQuestion = payload
    },
    getTotalVotes(state, payload) {
      state.totalVotes = payload
    },
    changeUpVotes(state, payload) {
      // console.log(payload)
      // console.log(payload.questionId)
      state.allQuestions.forEach(q => {
        if (q._id == payload.questionId) {
          if (payload.action === 'Push Upvotes') {
            q.upvotes.push(state.userLogin)
            state.certainQuestion.upvotes.push(state.userLogin)
          } else if (payload.action === 'Pull Upvotes') {
            let index = q.upvotes.findIndex(e => e == state.userLogin)
            // console.log(index)
            q.upvotes.splice(index, 1)
            state.certainQuestion.upvotes.splice(index, 1)
          } else {
            let index = q.downvotes.findIndex(e => e == state.userLogin)
            q.downvotes.splice(index, 1)
            q.upvotes.push(state.userLogin)
            state.certainQuestion.downvotes.splice(index, 1)
            state.certainQuestion.upvotes.push(state.userLogin)
          }
        }
      });
    },
    changeDownVotes(state, payload) {
      state.allQuestions.forEach(q => {
        if (q._id == payload.questionId) {
          if (payload.action === 'Push Downvotes') {
            q.downvotes.push(state.userLogin)
            state.certainQuestion.downvotes.push(state.userLogin)
          } else if (payload.action === 'Pull Downvotes') {
            let index = q.downvotes.findIndex(e => e == state.userLogin)
            // console.log(index)
            q.downvotes.splice(index, 1)
            state.certainQuestion.downvotes.splice(index, 1)
          } else {
            let index = q.upvotes.findIndex(e => e == state.userLogin)
            q.upvotes.splice(index, 1)
            q.downvotes.push(state.userLogin)
            state.certainQuestion.upvotes.splice(index, 1)
            state.certainQuestion.downvotes.push(state.userLogin)
          }
        }
      });
    },
    changeUpVotesAnswer(state, payload) {
      // console.log(payload)
      state.answerOwnByCertainQuestion.forEach(a => {
        if (a._id == payload.answerId) {
          // console.log(a)
          if (payload.action === 'Push Upvotes') {
            a.upvotes.push(state.userLogin)
          } else if (payload.action === 'Pull Upvotes') {
            let index = a.upvotes.findIndex(e => e == state.userLogin)
            a.upvotes.splice(index, 1)
          } else {
            let index = a.downvotes.findIndex(e => e == state.userLogin)
            a.downvotes.splice(index, 1)
            a.upvotes.push(state.userLogin)
          }
        }
      })
    },
    changeDownVotesAnswer(state, payload) {
      state.answerOwnByCertainQuestion.forEach(a => {
        if (a._id == payload.answerId) {
          if (payload.action === 'Push Downvotes') {
            a.downvotes.push(state.userLogin)
          } else if (payload.action === 'Pull Downvotes') {
            let index = a.downvotes.findIndex(e => e == state.userLogin)
            a.downvotes.splice(index, 1)
          } else {
            let index = a.upvotes.findIndex(e => e == state.userLogin)
            a.upvotes.splice(index, 1)
            a.downvotes.push(state.userLogin)
          }
        }
      })
    }
  },
  actions: {
    getAllQuestions(context) {
      axios.get('/questions')
      .then(({data}) => {
          context.commit('getAllQs', data)
      })
      .catch(err => {
          console.log(err)
      })
    },
    postAnswer(context, newAnswer) {
      // console.log(newAnswer)
      axios({
          method: 'post',
          url: '/answers',
          headers: {
              access_token: localStorage.getItem('token')
          },
          data: {
              questionId: newAnswer.questionId,
              title: newAnswer.title,
              description: newAnswer.description
          }
      })
      .then(({data}) => {
          // console.log(data)
          swal('answer has been submitted')
          context.commit('createAnswer', data)
          context.commit('newQuestionOnAllQuestions', {
            questionId: newAnswer.questionId,
            data: data
          })
      })
      .catch(err => {
          console.log(err)
      })
    },
    getAnswers(context, questionId) {
      axios({
        url: `/questions/${questionId}`,
        method: 'get',
      })
      .then(({data}) => {
        context.commit('getAnswers', data.answers)
        context.commit('toCertainQuestion', data)
        context.commit('getTotalVotes', data.upvotes.length - data.downvotes.length)
        if (data.user._id == localStorage.getItem('id')) {
          context.commit('isItAdmin', true)
        } else {
          context.commit('isItAdmin', false)
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    upVotes(context, questionId) {
      // console.log(questionId)
      axios({
        url: `/questions/vote/${questionId}`,
        method: 'put',
        headers: {
            access_token: localStorage.getItem('token')
        },
        data: {
            direction: 'up'
        }
      })
      .then(({data}) => {
        // console.log(data)
        data.questionId = questionId
        context.commit('changeUpVotes', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    downVotes(context, questionId) {
      // console.log(questionId)
      axios({
        url: `/questions/vote/${questionId}`,
        method: 'put',
        headers: {
            access_token: localStorage.getItem('token')
        },
        data: {
            direction: 'down'
        }
      })
      .then(({data}) => {
        // console.log(data)
        data.questionId = questionId
        context.commit('changeDownVotes', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    upVotesAnswer(context, payload) {
      axios({
        url: `/answers/vote/${payload}`,
        method: 'put',
        headers: {
            access_token: localStorage.getItem('token')
        },
        data: {
            direction: 'up'
        }
      })
      .then(({data}) => {
        // console.log(data)
        data.answerId = payload
        context.commit('changeUpVotesAnswer', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    downVotesAnswer(context, payload) {
      axios({
        url: `/answers/vote/${payload}`,
        method: 'put',
        headers: {
            access_token: localStorage.getItem('token')
        },
        data: {
            direction: 'down'
        }
      })
      .then(({data}) => {
        // console.log(data)
        data.answerId = payload
        context.commit('changeDownVotesAnswer', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getUsersQs(context) {
      axios({
        url: `/questions/profile/getQuestions`,
        method: 'get',
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        context.commit('putUserQuestions', data)
      })
      .then(err => {
        console.log(err)
      })
    },
    getUsersAs(context) {
      axios({
        url: `/answers/profile/getAnswers`,
        method: 'get',
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        context.commit('putUserAnswers', data)
      })
      .then(err => {
        console.log(err)
      })
    }
  }
})
