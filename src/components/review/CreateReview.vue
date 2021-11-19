<template>
  <div>
    <h3>리뷰 작성</h3>
    <textarea 
      name="" id="" cols="30" rows="10"
      v-model="inputData"
      @keyup.enter="createReview"
    >
    </textarea>
    <button @click="createReview">작성</button>
    <i class="bi bi-star-fill"></i>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'CreateReview',
  data: function () {
    return {
      inputData: null,
      ...mapState([
      'tmpReview',
      ])
    }
  },
  props: {
    movieId: Number,
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
        content: this.inputData,
        rated: 5,
      }
      if (reviewItem.content) {
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/reviews/${this.movieId}/`,
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
        this.inputData = null
      }
    }
  },
}
</script>

<style>

</style>