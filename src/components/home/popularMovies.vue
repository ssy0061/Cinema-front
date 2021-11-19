<template>
  <div v-if="movies">
    <h3>popular</h3>
    <movie-card :movies="movies"></movie-card>
  </div>
</template>

<script>
import movieCard from '@/components/home/movieCard'

import axios from 'axios'

export default {
  name: 'popularMovies',
  data: function () {
    return {
      movies: '',
    }
  },
  components: {
    movieCard
  },
  created: function () {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/movies/popular/',
    })
    .then(res => {
      this.movies = res.data
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>

</style>