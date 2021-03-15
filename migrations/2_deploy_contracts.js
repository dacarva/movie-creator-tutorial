const Migrations = artifacts.require('Migrations')

module.exports = function (deployer) {
  deployer.deploy(Migrations)
}
const Movies = artifacts.require('Movies')

module.exports = function (deployer) {
  deployer.deploy(Movies)
}
