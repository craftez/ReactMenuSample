/*
  App
*/

import React from 'react';
import Header from './Header';
import Fish from './Fish';
import Order from './Order';
import Inventory from './Inventory';
import Catalyst from 'react-catalyst';
import ReactMixin from 'react-mixin';
import autobind from 'autobind-decorator';


// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://menucatchoftheday.firebaseio.com/');

@autobind
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentDidMount () {
    base.syncState(this.props.params.storeId + '/fishes', {
      context: this,
      state: 'fishes'
    }); // sync our state with firebase

    var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

    if(localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }

  }

  componentWillUpdate (nextProps, nextState) {
    localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
  }

  addToOrder (key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order: this.state.order });
  }

  removeOrder (key) {
    var order = this.state.order[key];
    if(order > 1) {
      this.state.order[key] -= 1;
    } else {
      delete this.state.order[key];
    }
    this.setState({
      order: this.state.order
    });
  }

  addFish (fish) {
      var timestamp = (new Date()).getTime();
      // update the state object
      this.state.fishes['fish-' + timestamp] = fish;
      // set the state
      this.setState({ fishes: this.state.fishes });
    }

  removeFish (key) {
    if(confirm('Are you sure you want to remove this fish?')) {
      this.state.fishes[key] = null;
      this.setState({ fishes: this.state.fishes });
    }
  }

  loadSamples () {
    this.setState({
      fishes: require('../sample-fishes')
    });
  }

  renderFishes () {
    return Object.keys(this.state.fishes).map((key) => {
      return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />;
    });

  }

  render () {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
          <ul className='list-of-fishes'>
            {this.renderFishes()}
          </ul>
        </div>
        <Order {...this.state} removeOrder={this.removeOrder}/>

        <Inventory
        handleAddFish={this.addFish}
        loadSamples={this.loadSamples}
        fishes={this.state.fishes}
        linkState={this.linkState.bind(this)}
        removeFish={this.removeFish} {...this.props} />
      </div>
    );
  }
}

ReactMixin.onClass(App, Catalyst.LinkedStateMixin);

export default App;
