<template>
  <div>
    <p>리뷰 아이템</p>
    {{ review.content }}
    {{ review.rated }}
  </div>
</template>

<script>
export default {
  name: 'ReviewListItem',
  props: {
    review: Object,
  }
}
</script>

<style>

</style>