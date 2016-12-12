<template>
  <div class="movie-info-container">
    <div class="movie-backdrop lazyload" :data-bg="backdropPath">
      <div class="backdrop-inner">
        <span class="close-movie-panel" @click="resetCurrentMovie">&times;</span>
      </div>
    </div>
    <div class="movie-heading">
      <h3 class="movie-title">{{ currentMovie.title }}</h3>
      <img class="movie-info-poster lazyload" :data-src="posterPath" src="static/images/poster-placeholder.jpg" v-if="currentMovie.title != ''">
    </div>
    <div class="movie-meta">
      <div class="movie-meta-item runtime">{{ runtime }}</div>
      <div class="movie-meta-item rating">Rated {{ rating }}</div>
      <div class="movie-meta-item trailer"><a :href="trailer" target="_blank">Watch Trailer</a></div>
    </div>
    <div class="movie-plot">
      <p>
        <em>Released {{ releaseDate }}</em>
      <p>
        <em>Directed by {{ director }}</em>
      </p>
      <p>{{ currentMovie.overview }}</p>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'currentMovie',
        'director',
        'releaseDate',
        'rating',
        'trailer'
      ]),
      posterPath () {
        if (this.currentMovie.title !== '') {
          return `https://image.tmdb.org/t/p/w500${this.currentMovie.poster_path}`
        } else {
          return ''
        }
      },
      backdropPath () {
        if (this.currentMovie.title !== '') {
          return `https://image.tmdb.org/t/p/w1280${this.currentMovie.backdrop_path}`
        } else {
          return ''
        }
      },
      runtime () {
        let rt = this.currentMovie.runtime
        let hours = Math.trunc(rt / 60)
        let minutes = rt % 60
        return `${hours}h ${minutes}m`
      }
    },
    methods: mapActions(['resetCurrentMovie'])
  }
</script>

<style lang="scss">
@import "./src/assets/styles/variables";

.movie-enter-active, .movie-leave-active {
  transition: all 250ms $easeOutCubic;
}
.movie-enter, .movie-leave-active {
  opacity: 0;
  transform: scale(1.2);
}
.movie-info-container {
  background: #1D262F;
  color: #fff;
  height: 100%;
  position: fixed; top: 0; right: 0; bottom: 0; left: 0;
  z-index: 99;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .movie-backdrop {
    height: 36vh;
    background-size: cover!important;
    background-position: center top!important;
    background-repeat: no-repeat!important;
    position: relative;
    z-index: -1;
    .backdrop-inner {
      background: linear-gradient( 0deg, rgba(#1D262F, 1) 0%, rgba(#1D262F, 0) 70%);
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      padding: 20px;
      position: absolute; top: 0; right: 0; bottom: 0; left: 0;
      text-align: center;
      .close-movie-panel {
        width: 32px; height: 32px;
        border-radius: 50%;
        border: 2px solid #fff;
        cursor: pointer;
        line-height: 25px;
        position: absolute; top: 15px; left: 20px;
        font-size: 1.5rem;
      }
    }
  }
  .movie-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: -160px;
    padding: 20px 20px 0 20px;
    .movie-title {
      font-size: 2rem;
      font-weight: normal;
      line-height: 1;
      margin: 0;
    }
    .movie-info-poster {
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(#000, 0.3);
      min-width: 120px;
      width: 120px;
      flex-basis: 120px;
    }
  }
  .movie-meta {
    border-top: 1px solid rgba(#fff, 0.3);
    border-bottom: 1px solid rgba(#fff, 0.3);
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
    width: 100%;
    .movie-meta-item {
      border-right: 1px solid rgba(#fff, 0.3);
      flex-grow: 1;
      padding: 20px;
      text-align: center;
      &:last-child { border-right: none; }
      &.trailer a {
        display: block;
        text-decoration: none;
        color: #fff;
      }
    }
  }
  .movie-plot {
    color: rgba(#fff, 0.75);
    padding: 20px;
    width: 100%;
  }
}
</style>
