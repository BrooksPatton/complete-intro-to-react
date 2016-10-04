const React = require('react')
const {Link} = require('react-router')
const { connector } = require('./Store')
const { hashHistory } = require('react-router')

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.handleSearchTermEvent = this.handleSearchTermEvent.bind(this)
    this.gotoSearch = this.gotoSearch.bind(this)
    this.removeSearchTerm = this.removeSearchTerm.bind(this)
  }

  handleSearchTermEvent (event) {
    this.props.setSearchTerm(event.target.value)
  }

  gotoSearch (event) {
    event.preventDefault()

    hashHistory.push('search')
  }

  removeSearchTerm () {
    this.props.setSearchTerm('')
  }

  render () {
    return (
      <div className='home-info'>
        <h1 className='title'>svideo</h1>
        <form onSubmit={this.gotoSearch}>
          <input
            className='search'
            type='text'
            placeholder='Search'
            value={this.props.searchTerm}
            onChange={this.handleSearchTermEvent}
          />
        </form>
        <Link to='/search' className='browse-all' onClick={this.removeSearchTerm}>or browse all!!!</Link>
      </div>
    )
  }
}

const { func, string } = React.PropTypes

Landing.propTypes = {
  searchTerm: string,
  setSearchTerm: func
}

module.exports = connector(Landing)
