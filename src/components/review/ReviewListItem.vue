<template>
  <div class="my-3">
    <h2>리뷰 아이템</h2>
    <div>
      <h4>리뷰</h4>
      {{ review.content }}
      {{ review.rated }} ////
      작성자: <span @click="goProfile">{{ review.user.username }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewListItem',
  props: {
    review: Object,
  },
  methods: {
    goProfile: function () {
      this.$router.push({ name: 'Profile', params: { username: `${this.review.user.username}`}})
    }
  },
}
</script>

<style>

</style>