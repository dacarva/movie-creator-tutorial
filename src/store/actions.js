import Web3 from 'web3'
import Movies from '../abis/Movies.json'

const actions = {
  async loadWeb3({ dispatch }) {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        console.log('Ethereum initialized!')
        dispatch('loadBlockchainData')
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        dispatch('loadBlockchainData')
      } else {
        window.alert('Non ethereum browser detected. Please install metamask')
      }
    } catch (error) {
      console.error(error)
    }
  },

  async loadBlockchainData({ commit }) {
    const web3 = window.web3

    //Load accounts
    try {
      const accounts = await web3.eth.getAccounts()
      commit('account', accounts[0])
      //Network ID
      const networkId = await web3.eth.net.getId()
      const networkData = Movies.networks[networkId]
      console.log(
        '🚀 ~ file: actions.js ~ line 33 ~ loadBlockchainData ~ networkData',
        networkData
      )

      if (networkData) {
        const movies = new web3.eth.Contract(Movies.abi, networkData.address)
        commit('movies', movies)
      } else {
        window.alert('Movies contract not deployed to detected network')
      }
    } catch (error) {
      console.error(error)
    }
  },
}

export default actions

//Dispatch => Llamar a una acción desde otra acción
//Commit => Llamar a una mutation desde una acción
//State => Llamar al state desde una acción
