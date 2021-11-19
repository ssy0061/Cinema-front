<template>
  <div>
    <h2>리뷰</h2>
    
    <review-list :movie-id="movieId" :new-review-item="newReviewItem"></review-list>
    <create-review :movie-id="movieId" @new-review="newReview"></create-review>
  </div>
</template>

<script>
import ReviewList from '@/components/review/ReviewList'
import CreateReview from '@/components/review/CreateReview'

export default {
  name: 'Review',
  components: {
    ReviewList,
    CreateReview
  },
  data: function () {
    return {
      newReviewItem: null,
    }
  },
  props: {
    movieId: [Number, String],
  },
  methods: {
    newReview: function (data) {
      this.newReviewItem = data
    }
  }
}
</script>

<style>

</style>