const React = require('react')
const Header = require('./Header')
const { connector, store } = require('./Store')
const axios = require('axios')
//
class Details extends React.Component {
  componentDidMount () {
    if (this.getImdbRating(this.props.params.id) === 'getting rating') {
      axios.get(`http://www.omdbapi.com/?i=${this.assignShow(this.props.params.id).imdbID}`)
        .then((result) => {
          this.props.setImdbRating({id: this.props.params.id, rating: result.data.imdbRating})
        })
        .catch((err) => console.error('axios error', err))
    }
  }

  assignShow (id) {
    const showArray = this.props.shows.filter((show) => show.imdbID === id)
    return showArray[0]
  }

  getImdbRating (id) {
    const ratings = this.props.imdbRatings.filter((rating) => rating.id === id)

    return ratings[0] ? ratings[0].rating : 'getting rating'
  }

  render () {
    const { title, description, year, poster, trailer } = this.assignShow(this.props.params.id)

    let rating

    if (this.getImdbRating(this.props.params.id)) {
      rating = <h3 className='video-rating'>{this.getImdbRating(this.props.params.id)}</h3>
    }

    return (
      <div className='container'>
        <Header />
        <div className='video-info'>
          <h1 className='video-title'>{title}</h1>
          <h2 className='video-year'>({year})</h2>
          {this.getImdbRating(this.props.params.id)}
          <img className='video-poster' src={`/public/img/posters/${poster}`} />
          <p className='video-description'>{description}</p>
        </div>
        <div className='video-container'>
          <iframe src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0`} frameBorder='0' allowFullScreen></iframe>
        </div>
      </div>
    )
  }
}

const { object, arrayOf, func } = React.PropTypes

Details.propTypes = {
  shows: arrayOf(object).isRequired,
  params: object,
  setImdbRating: func,
  imdbRatings: arrayOf(object)
}

module.exports = connector(Details)
