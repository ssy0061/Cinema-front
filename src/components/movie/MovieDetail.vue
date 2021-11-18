<template>
  <div v-if="movie" class="row">
    <h3>영화 detail</h3>
    <hr>
    <div class="col-6">
      <img :src="posterUrl" alt="포스터"> ////
      <span>예고편 영상</span>
    </div>
    <br>
    <br>
    <h4>{{ movie.title }}</h4>
    <p>줄거리: {{ movie.overview }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MovieDetail',
  data: function () {
    return {
      movie: null,
      posterUrl: null,
    }
  },
  props: {
    movieId: String,
  },
  created: function () {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/movies/${this.movieId}/`
    })
    .then(res => {
      console.log(res.data)
      this.movie = res.data
      this.posterUrl = `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>

</style>