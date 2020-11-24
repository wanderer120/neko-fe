import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

class RegisterComponent extends Component{
  constructor(props){
    super();
    this.state = {refAddress: '-1'};
    this.handleChange = this.handleChange.bind(this);
    this.RegisterUser = this.RegisterUser.bind(this);
  }
  render(){
    return(
      <div>
        <span>Referrer ETH wallet address:</span><input type="text" name="refAddress" onChange={this.handleChange}/>
        <Button onClick={this.RegisterUser}>Register for 0.05 ETH</Button>
      </div>
    );
  }
  handleChange(e){
    this.setState({refAddress: e.target.value})
  }
  RegisterUser(){
    var obj = {
        from: this.props.userDetail.account,
        gas: 8000000,
        gasPrice: window.web3.utils.toWei('60','Gwei'),
        gasLimit: 8000000,
        value: window.web3.utils.toWei('0.05'),
    };
    //0x73e612F58362f44Bb0Af24fA074B147b30389252
    this.props.userDetail.contract.methods.registrationExt(this.state.refAddress).send(obj).then((result)=>{
      console.log(result);
      if(result.blockHash !== undefined){
        alert("Successfully Register");
        window.location.reload();
      }
    },(err)=>{
      alert(err.message);
    });
  }
}

export default RegisterComponent
