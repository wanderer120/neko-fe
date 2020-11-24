import React, { Component } from 'react'
import RegisterComponent from "./RegisterComponent"
import BuyComponent from "./BuyComponent"
import Stats from "./Stats"
/*
const MainPage = ({userDetail}) => {
  return(
    <div className="container">
      <h1>It's alive!</h1>
      <p>Your account: {userDetail.account}</p>
      <p>Your balance: {userDetail.balance} ETH</p>
      <RegisterComponent userDetail={userDetail}/>
    </div>
  )
}*/
class MainPage extends Component{
  constructor(props){
    super();
  }
  render(){
    return(
      <div className="container">
        <h1>It's alive!</h1>
        <p>Your account: {this.props.userDetail.account}</p>
        <p>Your balance: {this.props.userDetail.balance} ETH</p>
        {this.props.userDetail.userExist ? <BuyComponent userDetail={this.props.userDetail}/>:<RegisterComponent userDetail={this.props.userDetail}/>}
        <Stats userDetail={this.props.userDetail} universeItemCount={this.props.universeItemCount}/>
      </div>
    );
  }
}

export default MainPage
