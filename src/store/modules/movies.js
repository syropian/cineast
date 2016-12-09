import Vue from 'vue'
import VueResource from 'vue-resource'
import { Promise } from 'es6-promise'
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import {
  SET_NOW_PLAYING,
  SET_SEARCH_RESULTS,
  SET_CURRENT_MOVIE,
  RESET_CURRENT_MOVIE
} from '../mutation-types'

Vue.use(VueResource)
Vue.http.options.root = 'https://api.themoviedb.org/3'

const API_KEY = 'a51e51ee4a362b9f359af871e376a999'

const state = {
  nowPlaying: [],
  searchResults: [],
  currentMovie: {
    'backdrop_path': '',
    'poster_path': '',
    'title': '',
    'overview': ''
  }
}

const getters = {
  nowPlaying: state => state.nowPlaying,
  searchResults: state => state.searchResults,
  currentMovie: state => state.currentMovie,
  director: (state) => {
    if (state.currentMovie.hasOwnProperty('credits')) {
      return state.currentMovie.credits.crew.find(member => member.job === 'Director').name
    } else {
      return ''
    }
  },
  releaseDate: (state) => {
    if (state.currentMovie.hasOwnProperty('release_date')) {
      return format(
        parse(state.currentMovie.release_date),
        'MMM D, YYYY'
      )
    } else {
      return ''
    }
  },
  rating: (state) => {
    if (state.currentMovie.hasOwnProperty('releases')) {
      return state.currentMovie.releases.countries.find(country => country['iso_3166_1'] === 'US').certification
    } else {
      return 'No Rating'
    }
  },
  trailer: (state) => {
    if (state.currentMovie.hasOwnProperty('videos')) {
      let video = state.currentMovie.videos.results[0]
      return `https://www.youtube.com/watch?v=${video.key}`
    } else {
      return '#'
    }
  }
}

const mutations = {
  [SET_NOW_PLAYING] (state, movies) {
    state.nowPlaying = movies
  },
  [SET_SEARCH_RESULTS] (state, movies) {
    state.searchResults = movies
  },
  [SET_CURRENT_MOVIE] (state, movie) {
    state.currentMovie = movie
  },
  [RESET_CURRENT_MOVIE] (state) {
    state.currentMovie = {
      'backdrop_path': '',
      'poster_path': '',
      'title': '',
      'overview': ''
    }
  }
}

const actions = {
  fetchNowPlaying ({ commit }) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`movie/now_playing?api_key=${API_KEY}`).then((response) => {
        commit(SET_NOW_PLAYING, response.data.results)
        resolve()
      }, (response) => {
        reject()
      })
    })
  },
  fetchSearchResults ({ commit }, query) {
    return new Promise((resolve, reject) => {
      if (query.replace(/\s/g, '').length) {
        Vue.http.get(`search/movie?query=${escape(query)}&api_key=${API_KEY}`).then((response) => {
          commit(SET_SEARCH_RESULTS, response.data.results)
          resolve()
        }, (response) => {
          reject()
        })
      } else {
        commit(SET_SEARCH_RESULTS, [])
        resolve()
      }
    })
  },
  setCurrentMovie ({ commit }, movie) {
    return new Promise((resolve, reject) => {
      commit(SET_CURRENT_MOVIE, movie)
      resolve()
    })
  },
  resetCurrentMovie ({ commit }) {
    return new Promise((resolve, reject) => {
      commit(RESET_CURRENT_MOVIE)
      resolve()
    })
  },
  fetchMovieById ({ commit }, id) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`movie/${id}?api_key=${API_KEY}&append_to_response=credits,releases,videos`).then((response) => {
        commit(SET_CURRENT_MOVIE, response.data)
        resolve()
      }, (response) => {
        reject()
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
