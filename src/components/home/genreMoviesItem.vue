<template>
  <div>
    <h3>{{ genreName }}</h3>
    <movie-card :movies="movies"></movie-card>
  </div>
</template>

<script>
import movieCard from '@/components/home/movieCard'

import axios from 'axios'

export default {
  name: 'genreMoviesItem',
  data: function () {
    return {
      movies: null,
    }
  },
  components: {
    movieCard
  },
  props: {
    genreId: Number,
    genreName: String,
  },
  created: function () {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/movies/genres/${this.genreId}/`
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