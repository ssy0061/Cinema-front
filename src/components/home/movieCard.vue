<template>
  <p v-if="movie" @click="goDetail(movie.id)">
    <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="영화포스트" class="poster">
  </p>
</template>

<script>
export default {
  name: 'movieCard',
  props: {
    movie: Object,
  },
  methods: {
    goDetail: function (id) {
      this.$router.push({ name: 'Movie', params: { movieId: id }})
    }
  },
}
</script>

<style>
  .poster {
    box-shadow: 4px 4px 4px gray;
    width: 250px;
    height: 366px;
  }
</style>