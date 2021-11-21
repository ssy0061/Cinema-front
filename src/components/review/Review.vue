<template>
  <div class="row">
    <h2>리뷰</h2>
    
    <div class="col-2"></div>
    <review-list class="col-4" :movie-id="movieId" :new-review-item="newReviewItem"></review-list>

    <create-review class="col-4" :movie-id="movieId" @new-review="newReview"></create-review>
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