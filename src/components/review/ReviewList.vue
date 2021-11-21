<template>
  <div>
    <review-list-item 
      v-for="(review, index) in reviews" 
      :key="index"
      :review="review"
    >
    </review-list-item>
  </div>
</template>

<script>
import ReviewListItem from '@/components/review/ReviewListItem'

import axios from 'axios'

export default {
  name: 'ReviewList',
  components: {
    ReviewListItem
  },
  data: function () {
    return {
      reviews: null,
    }
  },
  props: {
    movieId: [Number, String],
    newReviewItem: Object,
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('JWT')
      const config = {
        Authorization: `Bearer ${token}`
      }
      return config
    },
    getReviews: function () {
      console.log(typeof(this.movieId))
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/reviews/movie/${this.movieId}/`,
        headers: this.setToken()
      })
      .then(res => {
        // console.log(res.data)
        this.reviews = res.data
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  created: function () {
    this.getReviews()
  },
  watch: {
    newReviewItem: function () {
      this.reviews.push(this.newReviewItem)
    }
  }
}
</script>

<style>

</style>