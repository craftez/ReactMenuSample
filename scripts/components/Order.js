/*
  Order
  <Order/>
*/
import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Helpers from '../helpers';
import autobind from 'autobind-decorator';

@autobind
class Order extends React.Component {
  renderOrder (orderIds) {
    return orderIds.map((key) => {
      var fish = this.props.fishes[key];
      var count = this.props.order[key];
      var removeButton = <button onClick={this.props.removeOrder.bind(null, key)}>&times;</button>;

      if (!fish) {
        return <li key={key}>Sorry, fish no longer available {removeButton}</li>;
      }
      return (
        <li className='order' key={key}>
          <span>
            <CSSTransitionGroup component='span' transitionName='count' transitionLeaveTimeout={250} transitionEnterTimeout={250}>
              <span key={count}>{count}</span>
            </CSSTransitionGroup>
            lbs {fish.name} {removeButton}
          </span>
          <span className='price'>
            { Helpers.formatPrice(count * fish.price) }
          </span>
        </li>
      );
    });
  }

  render () {
    var orderIds = Object.keys(this.props.order);
    var total = orderIds.reduce((prevTotal, key) => {
      var fish = this.props.fishes[key];
      var count = this.props.order[key];
      var isAvailable = fish && fish.status === 'available';
      if (fish && isAvailable) {
        return prevTotal + (count * parseInt(fish.price, 10) || 0);
      }

      return total;
    }, 0);

    return (
      <div className='order-wrap'>
        <h2 className='order-title'>Your Order</h2>
        <CSSTransitionGroup
        className='order'
        component='ul'
        transitionName='order'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
          {this.renderOrder(orderIds)}
          <li className='total'>
            <strong>Total:</strong>
            {Helpers.formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    );
  }
}

Order.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeOrder: React.PropTypes.func.isRequired
};

export default Order;
