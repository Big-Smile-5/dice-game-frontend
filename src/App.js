import React from 'react';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ToastContainer, toast } from 'react-toastify';
import crypto from 'crypto'
import 'react-toastify/dist/ReactToastify.css';

import Header from './Layouts/Header';
import Home from './Pages/Home';
import eventBus from './Utils/EventBus';
import './App.css';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "e1ca38f0c58f4681bf723d6ebb6da5d2", // required
    }
  }
}

let web3, web3Modal
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions, // required
    theme: "dark",
  });
}

class Container extends React.Component {

  constructor() {
    super()

    this.state = {
      isLoggined: false,
      provider: null,
      web3Provider: null,
      maxNumber: 1000000,
      rollingResult: -1,
      gameHash:  crypto.createHash('sha256').update(`${Date.now()}`).digest('hex'),
      isWon: false,
      accountInfo: {
        signerAddress: '',
        balance: 0
      }
    }

    this.login = this.login.bind(this)
    this.signUp = this.signUp.bind(this)
    this.handleBet = this.handleBet.bind(this)
    this.connectWallet = this.connectWallet.bind(this)
    this.displayNotification = this.displayNotification.bind(this)
  }

  async connectWallet() {
  }

  login = async () => {
    if(this.state.isLoggined === true) {
      return
    }

    const provider = await web3Modal.connect();
    const web3Provider = new providers.Web3Provider(provider)
    const signer = web3Provider.getSigner()
    const signerAddress = await signer.getAddress()

    web3 = new Web3(provider)

    this.setState({
      ...this.state,
      provider,
      web3Provider,
      isLoggined: true,
      accountInfo: {
        signerAddress,
        balance: 100
      }
    }, () => {
      this.state.provider.on("chainChanged", this.handleChainChanged)
      this.state.provider.on("accountsChanged", this.handleAccountsChanged)
    })
  }

  logOut = async () => {
    await this.disconnect()
  }

  signUp = async () => {}

  handleBet = async (betAmount, percent, direction) => {
    // direction == 1 ? 'More' : 'Less'
    if (!this.state.isLoggined) {
      this.displayNotification("Please login first", "info")
      return
    }
    if (betAmount <= 0) {
      this.displayNotification("Bet can't be less than zero", "warning")
      return
    }
    if (betAmount > this.state.accountInfo.balance) {
      this.displayNotification("Insufficient balance", "warning")
      return
    }
    if (percent <= 0 || percent > 99) {
      this.displayNotification("Incorrect multiplier", "warning")
      return
    }

    let timestamp = Date.now()
    let nonce = (Math.random() * this.state.maxNumber).toFixed(0)
    let resultHash = crypto.createHash('sha256').update(this.state.gameHash + '_' + timestamp + '_' + nonce).digest('hex')

    resultHash = resultHash.substring(0, 10)
    
    let result = parseInt(resultHash, 16)
    result = result % this.state.maxNumber

    let isWon = false
    let balance = this.state.accountInfo.balance - betAmount
    if (direction > 0) {
      let maxNumber = this.state.maxNumber
      let threshold = maxNumber - maxNumber * (percent / 100)
      if (threshold <= result) {
        isWon = true
        balance += betAmount * 100 / percent
        this.displayNotification('You win!', 'success')
      }
      else {
        this.displayNotification('You lose!', 'error')
      }
    }
    else {
      let maxNumber = this.state.maxNumber
      let threshold = maxNumber * (percent / 100)
      if (threshold > result) {
        isWon = true
        balance += betAmount * 100 / percent
        this.displayNotification('You win!', 'success')
      }
      else {
        this.displayNotification('You lose!', 'error')
      }
    }

    this.setState({
      ...this.state,
      isWon: isWon,
      rollingResult: result,
      gameHash:  crypto.createHash('sha256').update(`${Date.now()}`).digest('hex'),
      accountInfo: {
        ...this.state.accountInfo,
        balance
      }
    })
  }

  displayNotification(text, appearance) {
    let options = {
      autoClose: 1000,
      pauseOnHover: false
    }

    switch(appearance) {
        case 'warning':
            toast.warn(text, options); break
        case 'info':
            toast.info(text, options); break
        case 'error':
            toast.error(text, options); break
        case 'success':
            toast.success(text, options); break
        default:
            break
    }
  }
  
  handleAccountsChanged = () => {
    window.location.reload()
  }
  handleChainChanged = () => {
    window.location.reload()
  }
  disconnect = async () => {
    await web3Modal.clearCachedProvider();
    window.location.reload()
  };

  componentDidMount() {
    if(web3Modal.cachedProvider) {
      // this.connectWallet()
    }

    return () => {
      if (this.state.provider.removeListener) {
        this.state.provider.removeListener("accountsChanged", this.handleAccountsChanged)
        this.state.provider.removeListener("chainChanged", this.handleChainChanged)
      }
    }
  }

  render() {
    return (
      <div className="relative">
        <ToastContainer />
        <div className='w-full shadow-xl'>
          <Header
            login={this.login}
            logOut={this.logOut}
            signUp={this.signUp}
            isLoggined={this.state.isLoggined}
            accountInfo={this.state.accountInfo} />
        </div>
        <Home
          isWon={this.state.isWon}
          handleBet={this.handleBet}
          gameHash={this.state.gameHash}
          rollingResult={this.state.rollingResult}
          maxNumber={this.state.maxNumber} />
      </div>
    )
  }
}

function App() {

  return (
    <Container />
  );
}

export default App;
