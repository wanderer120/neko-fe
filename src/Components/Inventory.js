import React, { Component } from 'react'
import ScrollMenu from 'react-horizontal-scrolling-menu';

export default class Inventory extends Component {
  constructor(props) {
    super(props);

  }
  state = {
    selected
  };

  onSelect = key => {
    this.setState({ selected: key });
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
    console.log(this.props);
    console.log(this.props.itemIds);
    const { selected } = this.state;
    this.menuItems = Menu(list, selected);
    // Create menu from items
    const menu = this.menuItems;
    return (
      <div>
        <span>Inventory:</span>
        <ScrollMenu
          arrowLeft={<div style={{ fontSize: "30px" }}>{" < "}</div>}
          arrowRight={<div style={{ fontSize: "30px" }}>{" > "}</div>}
          data={this.props.itemIds!==undefined?this.props.itemIds.map((id) => (
            <div style={itemBox} key={id}>
              <span>Item#{id}</span><br/>
              <span>Power:{this.props.itemPowers[id]}</span>
            </div>
          )):''}
        />
      </div>
    );
  }
}
// list of items
const list = [
  { name: 'item1' },
  { name: 'item2' },
  { name: 'item3' },
  { name: 'item4' },
  { name: 'item5' },
  { name: 'item6' },
  { name: 'item7' },
  { name: 'item8' },
  { name: 'item9' }
];

// One item component
// selected prop will be passed
const MenuItem = ({text, selected}) => {
  return <div
    className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
  list.map(el => {
    const {name} = el;

    return <MenuItem text={name} key={name} selected={selected} />;
  });


const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = 'item1';
