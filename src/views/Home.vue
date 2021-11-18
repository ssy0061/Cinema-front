<template>
  <div>
    <h1>Home</h1>

    <div>
      1등 영화(크게)
      이미지

    </div>
    
    <div>
      <h3>지금 뜨는 영화(가로)(2등부터)</h3> 
      <movie-list :show-movie-list="popular"></movie-list>
      
    </div>
    <div>
      <h3>평점이 높은 영화(가로)</h3>
      <movie-list></movie-list>
    </div>
    <div>
      <h3>장르별 영화(가로)</h3>
      <movie-list></movie-list>
    </div>
  </div>
</template>

<script>
import MovieList from '@/components/home/MovieList'
import axios from 'axios'

export default {
  name: 'Home',
  data: function () {
    return {
      popular: '',
    }
  },
  components: {
    MovieList
  },
  created: function () {
    axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/popular',
      params: {
        api_key: '01558afb166c2eadee2e5d5648921e61',
        language: 'ko-KR',
        region: 'KR'
      }
    })
    .then(res => {
      console.log(res.data.results)
      this.popular = res.data.results
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>
