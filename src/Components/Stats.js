import React, { Component } from 'react'

export default class Stats extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div>
        <span>Stats:</span><br/>
        <span>Total owned items:{this.props.userDetail.itemCount}</span><br/>
        <span>Total items in the universe:{this.props.universeItemCount}</span><br/>
        <span>Probability getting rewards: {this.props.userDetail.itemCount/this.props.universeItemCount*100}%</span>
      </div>
    );
  }
}
