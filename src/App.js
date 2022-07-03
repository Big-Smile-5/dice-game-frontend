import React from 'react';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ToastContainer, toast } from 'react-toastify';
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
      accountInfo: {
        signerAddress: '',
        balance: 0
      }
    }

    this.login = this.login.bind(this)
    this.signUp = this.signUp.bind(this)
    this.connectWallet = this.connectWallet.bind(this)
    this.displayNotification = this.displayNotification.bind(this)
  }

  async connectWallet() {
    if(this.state.isConnected === true) return

    const provider = await web3Modal.connect();
    const web3Provider = new providers.Web3Provider(provider)
    const signer = web3Provider.getSigner()
    const account = await signer.getAddress()

    web3 = new Web3(provider)

    this.setState({
      ...this.state,
      isLoggined: true,
      provider,
      web3Provider
    }, () => {
      this.state.provider.on("accountsChanged", this.handleAccountsChanged)
      this.state.provider.on("chainChanged", this.handleChainChanged)
    })
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
        balance: 0
      }
    }, () => {
      this.state.provider.on("chainChanged", this.handleChainChanged)
      this.state.provider.on("accountsChanged", this.handleAccountsChanged)
    })
  }

  signUp = async () => {}

  displayNotification(appearance, text) {
    switch(appearance) {
        case 'warning':
            toast.warn(text); break
        case 'info':
            toast.info(text); break
        case 'error':
            toast.error(text); break
        case 'success':
            toast.success(text); break
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
            signUp={this.signUp}
            isLoggined={this.state.isLoggined}
            accountInfo={this.state.accountInfo} />
        </div>
        <Home />
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
