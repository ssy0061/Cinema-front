<template>
  <div>
    <h2>영화</h2>
    <div class="container-fluid row">
      <movie-detail class="col-8" :movie-id="movieId"></movie-detail>
      <review class="col-4" :movie-id="movieId"></review>
    </div>
  </div>
</template>

<script>
import MovieDetail from '@/components/movie/MovieDetail'
import Review from '@/components/review/Review'

export default {
  name: 'Movie',
  data: function () {
    return {
      movieId: '',
    }
  },
  components: {
    MovieDetail,
    Review
  },
  created: function () {
    console.log(typeof(this.$route.params.movieId))
    this.movieId = this.$route.params.movieId
  }
}
</script>

<style>

</style>