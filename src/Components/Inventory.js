import React, { Component } from 'react'
import ScrollMenu from 'react-horizontal-scrolling-menu';

export default class Inventory extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount(){
    //console.log(this.props);
  }
  render(){
    const itemBox = {
      height: "100px",
      padding: "30px",
      border: "1px solid blue"
    };
    return (
      <div>
        <span>Inventory:</span>
        <ScrollMenu
          arrowLeft={<div style={{ fontSize: "30px" }}>{" < "}</div>}
          arrowRight={<div style={{ fontSize: "30px" }}>{" > "}</div>}
          data={this.props.itemIds!==undefined?this.props.itemIds.map((id,index) => (
            <div style={itemBox} key={id}>
              <span>Item#{id}</span><br/>
              <span>Power:{this.props.itemPowers[index]}</span><br/>
              <span>Last Win:{parseFloat(this.props.lastWin[index]).toFixed(6)}&nbsp;ETH</span>
            </div>
          )):''}
        />
      </div>
    );
  }
}
