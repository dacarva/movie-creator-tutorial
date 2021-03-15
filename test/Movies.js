const { assert } = require('chai')

const Movies = artifacts.require('./Movies.sol')

require('chai').use(require('chai-as-promised')).should()

contract('Movies', ([deployer, author, reviewer]) => {
  let movies

  before(async () => {
    movies = await Movies.deployed()
  })

  describe('Deployment', async () => {
    it('Deploys successfully', async () => {
      const address = await movies.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('Has a name', async () => {
      const name = await movies.name()
      assert.equal(name, 'Prototipo RTVC')
    })
  })

  describe('Movies', async () => {
    let result
    let movieCount
    const movieTitle = 'El amor en los tiempos del cólera'

    before(async () => {
      result = await movies.createMovie(movieTitle, {
        from: author,
      })
      //   console.log('🚀 ~ file: Movies.js ~ line 37 ~ before ~ result', result)
      movieCount = await movies.movieCount()
      //   console.log(
      //     '🚀 ~ file: Movies.js ~ line 39 ~ before ~ movieCount',
      //     movieCount
      //   )
    })

    it('Creates a movie', async () => {
      assert.equal(movieCount, 1)

      const event = result.logs[0].args
      //   console.log('🚀 ~ file: Movies.js ~ line 49 ~ it ~ event', event)

      assert.equal(event.id.toNumber(), movieCount.toNumber(), 'ID is correct')

      assert.equal(event.title, movieTitle, 'Title is correct')

      assert.equal(event.rating.toNumber(), 0, 'Rating is correct')

      assert.equal(event.author, author, 'Author is correct')
    })

    it('Lists the movies', async () => {
      const movie = await movies.movies(movieCount)
      assert.equal(movie.id.toNumber(), movieCount.toNumber(), 'Id is correct')

      assert.equal(movie.title, movieTitle, 'Title is correct')

      assert.equal(movie.rating.toNumber(), 0, 'Rating is correct')

      assert.equal(movie.author, author, 'Author is correct')
    })

    // it('Gives a score from 1 to 10 to the movies')
  })
})
