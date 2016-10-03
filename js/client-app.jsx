const React = require('react')
const ReactDOM = require('react-dom')
const Landing = require('./landing')
const {Router, Route, hashHistory, IndexRoute} = require('react-router')
const Search = require('./search')
const Layout = require('./layout')
const Details = require('./Details')
const {shows} = require('../public/data')

const App = React.createClass({
  assignShow (nextState, replace) {
    const filteredShows = shows.filter((show) => show.imdbID === nextState.params.id)

    Object.assign(nextState.params, filteredShows[0])

    return filteredShows.length > 0 ? nextState : replace('/')
  },

  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Landing} />
          <Route path='/search' component={Search} shows={shows} />
          <Route path='/details/:id' component={Details} onEnter={this.assignShow} />
        </Route>
      </Router>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))
