import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export default class BuyComponent extends Component {
  constructor(props) {
    super(props);
    this.BuyItem = this.BuyItem.bind(this);
  }
  BuyItem(){
    var obj = {
        from: this.props.userDetail.account,
        gas: 8000000,
        gasPrice: window.web3.utils.toWei('60','Gwei'),
        gasLimit: 8000000,
        value: window.web3.utils.toWei('0.05'),
    };
    this.props.userDetail.contract.methods.buyItemExt().send(obj).then((result)=>{
      console.log(result);
      if(result.blockHash !== undefined){
        alert("Successfully Buy 1 Item");
        window.location.reload();
      }
    },(err)=>{
      alert(err.message);
    });
  }
  render(){
    return(
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <span>Buy More Item: </span><Button onClick={this.BuyItem}>0.05 ETH</Button>
      </div>
    );
  }
}
