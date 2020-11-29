import React, { Component } from 'react'
import RegisterComponent from "./RegisterComponent"
import BuyComponent from "./BuyComponent"
import Stats from "./Stats"
import Inventory from "./Inventory"
import WinnersPanel from "./WinnersPanel"

class MainPage extends Component{
  constructor(props){
    super();
  }
  render(){
    return(
      <div className="container">
        <p>Your account: {this.props.userDetail.account}</p>
        <p>Your balance: {this.props.userDetail.balance} ETH</p>
        {this.props.userDetail.userExist ? <BuyComponent userDetail={this.props.userDetail}/>:<RegisterComponent userDetail={this.props.userDetail}/>}
        <Inventory itemIds={this.props.userDetail.itemIdArr} itemPowers={this.props.userDetail.itemPowerArr}/><br/>
        <Stats userDetail={this.props.userDetail} universeItemCount={this.props.universeItemCount}/><br/>
        <span>Last Winner:</span><br/>
        <WinnersPanel winnerArr={this.props.userDetail.winnerArr} winnerAmountArr={this.props.userDetail.winnerAmountArr}/>
      </div>
    );
  }
}

export default MainPage
