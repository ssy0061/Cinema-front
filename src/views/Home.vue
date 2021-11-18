<template>
  <div>
    <h1>Home</h1>
    <!-- backdrop_path -->
    <!-- https://image.tmdb.org/t/p/original/oE6bhqqVFyIECtBzqIuvh6JdaB5.jpg -->
    <div>
      1등 영화(크게)
      이미지

    </div>
    
    <!-- poster_path -->
    <!-- https://image.tmdb.org/t/p/w500/14L4NGrqO4r7gJtVRiSRP5rNsL5.jpg -->
    <div>
      <h3>지금 뜨는 영화(가로)(2등부터)</h3>
      <popular-movies></popular-movies>
    </div>
    <div>
      <h3>평점이 높은 영화(가로)</h3>
      <top-rated-movies></top-rated-movies>
    </div>
    <div>
      <h3>장르별 영화(가로)</h3>
      <genre-movies></genre-movies>
    </div>
  </div>
</template>

<script>
import popularMovies from '@/components/home/popularMovies'
import topRatedMovies from '@/components/home/topRatedMovies'
import genreMovies from '@/components/home/genreMovies'

// import axios from 'axios'

export default {
  name: 'Home',
  data: function () {
    return {
      popular: '',
    }
  },
  components: {
    popularMovies,
    topRatedMovies,
    genreMovies,
  },
}
</script>
