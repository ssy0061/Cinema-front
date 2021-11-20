<template>
  <div class="col-4">
    <h3>영화리뷰카드</h3>
    <p>{{ review }}</p>

    
    <div class="card" style="width: 25rem;">
      <div class="card-header">
        {{ review.user.username }} | 
        평점(별점???) {{ review.movie.vote_average }} |
        (리뷰 좋아요 수) {{ review.like_users.length }}
      </div>
      <img :src="posterUrl" alt="포스터" class="card-img-top">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <h5 class="card-title">{{ review.movie.title }} ( {{ releaseDate }} )</h5>
        </li>
        <li class="list-group-item">
          <p class="card-text">리뷰 내용: {{ review.content }}</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ReviewCard',
  props: {
    review: Object,
  },
  data: function () {
    return {
      posterUrl: null,
      releaseDate: null,
    }
  },
  created: function () {
    console.log(this.review)
    this.posterUrl = `https://image.tmdb.org/t/p/w500/${this.review.movie.poster_path}`
    const data = this.review.movie.release_date.split('-')
    this.releaseDate = `${data[0]}. ${data[1]}`
  }
}
</script>

<style>

</style>