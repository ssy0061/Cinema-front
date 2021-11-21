<template>
  <div>
    <div class="container-fluid row">
      <movie-detail class="col-12" :movie-id="movieId"></movie-detail>
      <review class="col-12" :movie-id="movieId"></review>
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
    this.movieId = this.$route.params.movieId
  }
}
</script>

<style>

</style>