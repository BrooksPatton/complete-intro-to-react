const React = require('react')
const Landing = require('./landing')
const {Router, Route, browserHistory, IndexRoute} = require('react-router')
const Search = require('./search')
const Layout = require('./layout')
const Details = require('./Details')
const {store} = require('./Store')
const {Provider} = require('react-redux')

const myRoutes = () => {
  <Route path='/' component={Layout}>
    <IndexRoute component={Landing} />
    <Route path='/search' component={Search} />
    <Route path='/details/:id' component={Details} />
  </Route>
}

const App = React.createClass({
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {myRoutes()}
        </Router>
      </Provider>
    )
  }
})

App.routes = myRoutes

module.exports = App
