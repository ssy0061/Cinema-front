<template>
  <div>
    <h3>리뷰 작성</h3>
    <i class="fas fa-user"></i>aaaaaa
    <font-awesome-icon :icon="['fas', 'faHeart']" />
    <font-awesome-icon :icon="['far', 'farHeart']" />
    <textarea 
      name="" id="" cols="30" rows="10"
      v-model="inputTxt"
    >
    </textarea>
    <input 
      type="number" name="" id=""
      v-model="inputNum"
      @keyup.enter="createReview"
    >
    <button @click="createReview">작성</button>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'CreateReview',
  data: function () {
    return {
      inputTxt: null,
      inputNum: null,
      ...mapState([
      'tmpReview',
      ])
    }
  },
  props: {
    movieId: [Number, String],
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('JWT')
      const config = {
        Authorization: `Bearer ${token}`
      }
      return config
    },
    createReview: function () {
      const reviewItem = {
        content: this.inputTxt,
        rated: this.inputNum,
      }
      if (reviewItem.content) {
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/reviews/movie/${this.movieId}/`,
          data: reviewItem,
          headers: this.setToken()
        })
        .then(res => {
          console.log(res)
          this.$emit('new-review', res.data)
        })
        .catch(err => {
          console.log(err)
        })
        this.inputTxt = null
        this.inputNum = null
      }
    }
  },
}
</script>

<style>

</style>