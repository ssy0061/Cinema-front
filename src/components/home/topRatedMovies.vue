<template>
  <div>
    <h3>toprated</h3>
    <movie-card :movies="movies"></movie-card>
  </div>
</template>

<script>
import movieCard from '@/components/home/movieCard'

import axios from 'axios'

export default {
  name: 'topRatedMovies',
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
      url: 'http://127.0.0.1:8000/movies/top_rated/',
    })
    .then(res => {
      console.log(res.data)
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