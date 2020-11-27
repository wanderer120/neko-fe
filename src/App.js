import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'

import { _ABI, _CONTRACT_ADDRESS } from './config'

import Button from 'react-bootstrap/Button'
import MainPage from './Components/MainPage'

var app;
class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }
  async loadBlockchainData() {
    if (!ethEnabled()) {
      alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
    }
    else{
      let userDetailObj = {};
      const accounts = await window.web3.eth.getAccounts().then((accounts)=>{
        if (accounts.length === 0) {
          console.log('MetaMask is locked')
          this.setState({isLogin:false})
        }
        else {
          this.setState({isLogin:true})
          userDetailObj.account = accounts[0]
          window.web3.eth.getBalance(accounts[0]).then((value)=>{
            userDetailObj.balance = window.web3.utils.fromWei(value)
            this.setState({userDetail:userDetailObj})
          });
          userDetailObj.contract = new window.web3.eth.Contract(_ABI, _CONTRACT_ADDRESS)
          userDetailObj.contract.methods.isUserExists(userDetailObj.account).call().then((result)=>{
            userDetailObj.userExist = result
            this.setState({userExist:result})
          });
          userDetailObj.contract.methods.users(userDetailObj.account).call().then((result)=>{
            userDetailObj.itemCount = result.itemCount;
            this.setState({itemCount:result.itemCount})
          });
          userDetailObj.contract.methods.lastItemId().call().then((result)=>{
            this.setState({universeItemCount:(result)})
          });
          userDetailObj.contract.methods.getAllItemsByUser(userDetailObj.account).call().then((result)=>{
            console.log(result);
            let itemObj = {};
            itemObj.idArr = [];
            itemObj.powerArr = [];
            for(let i=0;i<result[Object.keys(result)[0]].length;i++){
              itemObj.idArr[i] = result[Object.keys(result)[0]][i];
              itemObj.powerArr[i] = result[Object.keys(result)[1]][i];
            }
            userDetailObj.itemIdArr = itemObj.idArr;
            userDetailObj.itemPowerArr = itemObj.powerArr;
            this.setState({userDetail:userDetailObj});
          });
        }
      },()=>{
        console.log("fail callback");
      })
    }
  }
  constructor(props) {
    super(props)
    app = this;
    this.state = {
      isLogin: false,
      userDetail: {account:-1,balance:-1,contract:{}},
      userExist: false,
      itemCount:-1,
      universeItemCount:-1
    }
    this.LoginToMetamask = this.LoginToMetamask.bind(this);
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload();
      /*
      if (!ethEnabled()) {
        alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
      }
      else{
        let userDetailObj = {};
        window.web3.eth.getAccounts().then((accounts)=>{
          if (accounts.length === 0) {
            console.log('MetaMask is locked')
            app.setState({isLogin:false})
          }
          else {
            app.setState({isLogin:true})
            userDetailObj.account = accounts[0]
            window.web3.eth.getBalance(accounts[0]).then((value)=>{
              userDetailObj.balance = window.web3.utils.fromWei(value)
              app.setState({userDetail:userDetailObj})
            });
            userDetailObj.contract = new window.web3.eth.Contract(_ABI, _CONTRACT_ADDRESS)
            userDetailObj.contract.methods.isUserExists(userDetailObj.account).call().then((result)=>{
              userDetailObj.userExist = result
              app.setState({userExist:result})
            });
            userDetailObj.contract.methods.users(userDetailObj.account).call().then((result)=>{
              userDetailObj.itemCount = result.itemCount;
              app.setState({itemCount:result.itemCount})
            });
            userDetailObj.contract.methods.lastItemId().call().then((result)=>{
              app.setState({universeItemCount:(result)})
            });
            userDetailObj.contract.methods.getAllItemsByUser(userDetailObj.account).call().then((result)=>{
              let itemObj = {};
              for(let i=0;i<result[Object.keys(result)[0]].length;i++){
                itemObj.idArr = result[Object.keys(result)[0]][i];
                itemObj.powerArr = result[Object.keys(result)[1]][i];
              }
              userDetailObj.itemIdArr = itemObj.idArr;
              userDetailObj.itemPowerArr = itemObj.powerArr;
              console.log(itemObj.idArr);
              app.setState({userDetail:userDetailObj});
            });
          }
        },()=>{
          console.log("fail callback");
        })
      }*/
    });
  }
  render() {
    if(this.state.isLogin){
      return (
        <MainPage userDetail={this.state.userDetail} universeItemCount={this.state.universeItemCount}/>
      );
    }
    else {
      return (
        <div className="container" style={{display: 'flex', justifyContent: 'center'}}>
          <Button variant="primary" onClick={this.LoginToMetamask}>Connect to Metamask</Button>
        </div>
      );
    }
  }
  LoginToMetamask(){
    this.loadBlockchainData()
  }
}
const ethEnabled = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    return true;
  }
  return false;
}
export default App;
