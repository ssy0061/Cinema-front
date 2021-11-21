<template>
  <div v-if="movie">
    <h3>영화 detail</h3>
    <hr>
    <div>
      <img :src="posterUrl" alt="포스터" width="300px"> ////
      <span>예고편 영상</span>

    </div>
    <div>
      <span 
        v-for="genre in movie.genres" 
        :key="genre.id"
        class="mx-2"
      >
      {{ genre.name }}</span>
      <h4>{{ movie.title }} ( {{ releaseDate }} ) <i class="bi bi-123"></i> {{ movie.vote_average }}</h4>
      <p>줄거리: {{ movie.overview }}</p>
    </div>
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
      releaseDate: null,
    }
  },
  props: {
    movieId: [Number, String],
  },
  methods: {
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
      const data = this.movie.release_date.split('-')
      this.releaseDate = `${data[0]}. ${data[1]}`
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>

</style>