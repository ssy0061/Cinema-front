<template>
  <div>
    <h3>리뷰 목록</h3>
    <review-list-item></review-list-item>
    <review-list-item></review-list-item>
    <review-list-item></review-list-item>
  </div>
</template>

<script>
import ReviewListItem from '@/components/review/ReviewListItem'

export default {
  name: 'ReviewList',
  components: {
    ReviewListItem
  }
}
</script>

<style>

</style>