const redux = require('redux')
const reactRedux = require('react-redux')
const { shows } = require('../public/data')
const axios = require('axios')

const SET_SEARCH_TERM = 'setSearchTerm'
const SET_IMDB_RATING = 'setImdbRating'

const initialState = {
  searchTerm: '',
  shows,
  imdbRatings: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return reduceSearch(state, action)

    case SET_IMDB_RATING:
      return reduceImdbRating(state, action)

    default:
      return state
  }
}

function reduceSearch (state, action) {
  const newState = {}
  Object.assign(newState, state, {searchTerm: action.value})
  return newState
}

function reduceImdbRating (state, action) {
  const newState = {}

  Object.assign(newState, state)

  newState.imdbRatings = state.imdbRatings.concat([action.value])

  return newState
}

const store = redux.createStore(rootReducer, initialState, redux.compose(
  typeof window === 'object' && typeof window.devToolsExtension !== undefined ? window.devToolsExtension() : (f) => f
))
// const store = redux.createStore(rootReducer)

function mapStateToProps (state) {
  return {
    searchTerm: state.searchTerm,
    shows: state.shows,
    imdbRatings: state.imdbRatings
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSearchTerm (searchTerm) {
      dispatch({type: SET_SEARCH_TERM, value: searchTerm})
    },

    setImdbRating (imdbRating) {
      dispatch({type: SET_IMDB_RATING, value: imdbRating})
    }
  }
}

const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps)

module.exports = { connector, store, rootReducer }
