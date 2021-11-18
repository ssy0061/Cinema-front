<template>
  <div>
    <h4>Card</h4>
    <span 
      v-for="movie in movies" :key="movie.id"
    >
      <span @click="goDetail(movie.id)">{{  movie.title }}</span> |
    </span>
  </div>
</template>

<script>
export default {
  name: 'movieCard',
  props: {
    movies: Array,
  },
  methods: {
    goDetail: function (id) {
      console.log(`영화 id:  ${id}`)
      this.$router.push({ name: 'Movie', params: { movieId: id }})
    }
  }
}
</script>

<style>

</style>