<template>
  <div>
    <p>리뷰 아이템</p>
    
    {{ review.content }}
    {{ review.rated }} ////
    작성자: <span @click="goProfile">{{ review.user.username }}</span>
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
  }
}
</script>

<style>

</style>