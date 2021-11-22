<template>
  <div v-if="review" class="text-light" style="position: relative">
    <p class="my-5" style="font-size: 3rem">
      {{ review.user.username }}'s Review
    </p>
    <div class="review-detail">
      <div>
        <img :src="posterUrl" alt="포스터" width="800px" />
      </div>
      <div style="width: 800px; margin-top:20px;">
        <h3>{{ review.movie.title }}</h3>
        <star-rating class="mb-0" :rating="review.rated/2" :read-only="true" :increment="0.01" :star-size="25"></star-rating>
        <hr />
        <div v-if="isEdit">
          <!-- 리뷰 수정 -->
          <star-rating class="custom-star mb-3" :rating="inputRating" @rating-selected="getRating" :glow="5" :increment="0.5" :star-size="40" :clearable="true"></star-rating>
          <textarea
            @keyup.enter="createReview"
            v-model="editContent"
            placeholder="감상평을 남겨주세요."
            rows="7"
            cols="95"
          ></textarea>
          <br>
          <button class="my-button" @click="reviewEditSubmit">작성</button>
        </div>
        <h4 v-else>{{ review.content }}</h4>
      </div>
    </div>
    <div class="card border-secondary" style="width: 800px; margin: 30px auto">
      <div class="card-header border-secondary border-1">
        <h3 class="mb-0">Comments</h3>
      </div>
      <div class="card-body">
        <div
          v-for="comment in review.comment_set"
          :key="comment.id"
          style="text-align: left"
        >
          <p style="padding-left: 10px">
            <span class="author">{{ comment.author.username }} : </span
            >{{ comment.content }}
          </p>
        </div>
        <div>
          <input
            style="width: 700px"
            type="text"
            @keyup.enter="createComments"
            v-model="inputTxt"
            placeholder="댓글을 작성해 주세요."
          />
          <button
            style="margin-left: 10px"
            class="my-button"
            @click="createComments"
          >
            작성
          </button>
        </div>
      </div>
      <div class="card-body pt-0"></div>
    </div>
    <div v-if="loginUser.id === review.user.id" class="edit-btn">
      <button @click="reviewDelete">삭제</button
      ><button @click="reviewEdit">수정</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import getToken from "@/util/getToken.js"
import { mapState } from "vuex"
import StarRating from 'vue-star-rating'

export default {
  name: "Review",
  data: function () {
    return {
      review: null,
      inputTxt: null,
      posterUrl: null,
      comments: null,
      isEdit: false,
      editContent: null,
      inputRating: null,
      reviewRating: null,
    }
  },
  components: {
    StarRating
  },
  computed: {
    ...mapState(["loginUser"]),
  },
  methods: {
    createComments: function () {
      axios({
        method: "POST",
        url: `http://127.0.0.1:8000/reviews/${this.review.id}/comments/`,
        headers: getToken(),
        data: {
          content: this.inputTxt,
        },
      })
        .then((res) => {
          console.log(res)
          this.comments.push(res.data)
          this.inputTxt = ""
        })
        .catch((err) => {
          console.log(err)
        })
    },
    reviewDelete: function () {
      axios({
        method: "DELETE",
        url: `http://127.0.0.1:8000/reviews/${this.review.id}/`,
        headers: getToken(),
      })
        .then(() => {
          this.$router.push({
            name: "Movie",
            params: { movieId: `${this.review.movie.id}` },
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    reviewEdit: function () {
      this.isEdit = !this.isEdit
    },
    reviewEditSubmit: function () {
      axios({
        method: "PUT",
        url: `http://127.0.0.1:8000/reviews/${this.review.id}/`,
        headers: getToken(),
        data: {
          content: this.editContent,
          rated: this.inputRating*2,
        }
      })
        .then((res) => {
          console.log(res);
          this.isEdit = false
          this.review.content = this.editContent
          this.review.rated = res.data.rated
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    getRating: function (rating) {
      this.inputRating = rating
    },
  },
  created: function () {
    const reviewId = this.$route.params.reviewId
    axios({
      method: "GET",
      url: `http://127.0.0.1:8000/reviews/${reviewId}/`,
      headers: getToken(),
    })
      .then((res) => {
        this.review = res.data
        this.posterUrl = `https://image.tmdb.org/t/p/original/${this.review.movie.backdrop_path}`
        this.comments = res.data.comment_set
        this.editContent = res.data.content
        console.log(this.review)
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>

<style>
.edit-btn {
  position: absolute;
  top: 10px;
  right: 400px;
}
.author {
  padding-right: 10px;
}
.review-detail {
  text-align: left;
  margin: 0 auto;
  width: 800px;
}
</style>
