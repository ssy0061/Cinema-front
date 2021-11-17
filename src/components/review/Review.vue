<template>
  <div>
    <h2>리뷰</h2>
    <review-list></review-list>
    <create-review></create-review>
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
  }
}
</script>

<style>

</style>