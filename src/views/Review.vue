<template>
  <div v-if="review" class="text-light d-flext justify-content-center" style="position: relative">
    <p class="mt-5 mb-2" style="font-size: 3rem">
      <span class="link" @click="goProfile">{{ review.user.username }}</span>'s Review
    </p>
    <div class="review-warp mb-5">
      <div class="link" @click="goDetail(review.movie.id)">
        <img :src="posterUrl" alt="포스터" width="800px" />
      </div>
      <div style="margin-top:20px;">
        <h3 class="review-detail link" @click="goDetail(review.movie.id)">{{ review.movie.title }}</h3>
        
        <div v-if="isEdit" class="mt-3">
          <!-- 리뷰 수정 -->
          <div class="card border-secondary" style="width: 800px;">
            <div class="card-header border-secondary border-1">
              <h3 class="mb-0">리뷰 수정</h3>
            </div>
            <div class="card-body">
              <star-rating class="review-comment-star mb-3" :rating="inputRating" @rating-selected="getRating" :glow="5" :increment="0.5" :star-size="40" :clearable="true"></star-rating>
              <p class="card-text text-light">별점을 선택해 주세요</p>
            </div>
            <div class="card-body">
              <input class="mb-3 ps-1" type="text" v-model="editTitle" placeholder="제목을 입력해주세요." size="88">
              <textarea @keyup.enter="reviewEditSubmit" v-model="editContent" cols="90" rows="5" placeholder="감상평을 남겨주세요."></textarea>
            </div>
            <div class="card-body pt-0 text-center">
              <button class="my-button-update" @click="reviewEditSubmit">수정</button>
              <button class="my-button-cancel" @click="reviewEdit">취소</button>
            </div>
          </div>


        </div>
        <div v-else class="review-detail">
          <!-- 리뷰 조회 -->
          <div class="d-flex justify-content-between">
            <star-rating class="mb-0" :rating="review.rated/2" :read-only="true" :increment="0.01" :star-size="25"></star-rating>
            <span v-if="loginUser.id === review.user.id">
              <!-- 드랍다운 설정메뉴 -->
              <b-dropdown menu-class="py-1 wrap-dropdown" size="lg" right variant="link" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                  <font-awesome-icon :icon="['fas', 'ellipsis-v']" :style="{ color: 'white' }" />
                </template>
                <b-dropdown-item @click="reviewEdit">수정</b-dropdown-item>
                <b-dropdown-item @click="reviewDelete">삭제</b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
          <hr class="mt-0">
          <h3 style="word-wrap:break-word;">{{ review.title }}</h3>
          <h4 style="word-wrap:break-word;">{{ review.content }}</h4>

          <!-- 댓글 조회 & 작성 & 삭제 -->
          <div class="card border-secondary" style="width: 800px; margin: 30px auto">
            <div class="card-header border-secondary border-1">
              <h3 class="mb-0">Comments</h3>
            </div>
            <div class="card-body">
              <div
                v-for="comment in review.comment_set"
                :key="comment.id"
                style="text-align: left"
                class="d-flex justify-content-between"
              >
                <p class="mb-2" style="padding-left: 10px">
                  <span class="author">{{ comment.author.username }} : 
                  </span>
                  <span>
                    {{ comment.content }}
                  </span>
                </p>
                <button
                  v-if="loginUser.username === comment.author.username"
                  class="my-comment-button-delete"
                  @click="deleteComments(comment.id)"
                >
                  <font-awesome-icon :icon="['fas', 'times']" />
                </button>
              </div>
              <!-- 댓글 작성 -->
              <div class="d-flex justify-content-around mt-3">
                <input
                  style="width: 600px"
                  type="text"
                  @keyup.enter="createComments"
                  v-model="inputTxt"
                  placeholder="댓글을 작성해 주세요."
                />
                <button
                  class="my-comment-button"
                  @click="createComments"
                >
                  작성
                </button>
              </div>
            </div>
            <div class="card-body pt-0"></div>
          </div>
          <!-- <div v-if="loginUser.id === review.user.id" class="edit-btn">
            <button @click="reviewDelete">삭제</button
            ><button @click="reviewEdit">수정</button>
          </div> -->
        </div>
      </div>
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
      editTitle: null,
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
    goProfile: function () {
      this.$router.push({ name: 'Profile', params: { username: `${this.review.user.username}`}})
    },
    goDetail: function (id) {
      this.$router.push({ name: 'Movie', params: { movieId: id }})
    },
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
    deleteComments: function (id) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/reviews/${this.review.id}/comments/${id}`,
        headers: getToken(),
      })
      .then(res => {
        console.log(res)
        this.getReviewComment()
      })
      .catch(err => {
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
          title: this.editTitle,
          content: this.editContent,
          rated: this.inputRating*2,
        }
      })
        .then((res) => {
          console.log(res);
          this.isEdit = false
          this.review.title = this.editTitle
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
    getReviewComment: function () {
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
          this.editTitle = res.data.title
          this.editContent = res.data.content
          this.inputRating = res.data.rated/2
          console.log(this.review)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created: function () {
    this.getReviewComment()
  },
}
</script>

<style>
.wrap-dropdown {
  width: 100%;
  min-width: 0;
  white-space: normal;
}
.edit-btn {
  position: absolute;
  top: 10px;
  right: 400px;
}
.author {
  padding-right: 10px;
}
.review-warp {
  margin: 0 auto;
  width: 800px;
}
.review-detail {
  text-align: left;
}
.review-comment-star {
  font-size: 1.5rem;
  padding-left: 17rem;
}
.my-button-update {
  background-color: light;
  border: 1px;
  border-color: light;
  color: #2f2f2f;
  padding: 12px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.5rem;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}
.my-button-update:hover {
  background-color: #4CAF50;
  color: white;
}
.my-button-cancel {
  background-color: light;
  border: 1px;
  border-color: light;
  color: #2f2f2f;
  padding: 12px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.5rem;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}
.my-button-cancel:hover {
  background-color: #dc3545;
  color: white;
}
.my-comment-button {
  background-color: light;
  border: 1px;
  border-color: light;
  color: #2f2f2f;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.4rem;
  margin: 2px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}
.my-comment-button:hover {
  background-color: #4CAF50;
  color: white;
}
.my-comment-button-delete {
  background-color: #2f2f2f;
  border: 1px;
  border-color: #2f2f2f;
  color: white;
  padding: 1px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 2px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}
.my-comment-button-delete:hover {
  background-color: #dc3545;
  color: white;
}
</style>
