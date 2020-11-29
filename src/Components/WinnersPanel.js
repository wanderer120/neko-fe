import React, { Component } from 'react'
import ScrollMenu from 'react-horizontal-scrolling-menu';

export default class WinnersPanel extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      this.props.winnerArr!==undefined?this.props.winnerArr.map((address,index) => (
        <div key={index}>
          <span>#{(index+1)}:&nbsp;</span>
          <span>{address} - </span>
          <span>{this.props.winnerAmountArr[index]}&nbsp;ETH</span><br/>
        </div>
      )):<div></div>
    );
  }
}
