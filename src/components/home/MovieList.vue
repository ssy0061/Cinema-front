<template>
  <div>
    <h4>영화리스트(가로)</h4>
    <span v-for="movie in showMovieList" :key="movie.id">
      {{ movie }}
      <img src="" alt="">
    </span>
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  props: {
    showMovieList: Object,
  },
  methods: {

  }
}
</script>

<style>

</style>