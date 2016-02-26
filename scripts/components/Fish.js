/*
  Fish
  <Fish />
*/

import React from 'react';
import Helpers from '../helpers';
import autobind from 'autobind-decorator';

@autobind
class Fish extends React.Component {
  onButtonClick () {
    console.log('Going to add the fish', this.props.index);
    this.props.addToOrder(this.props.index);
  }

  render () {
    var details = this.props.details;
    var isAvailable = details.status === 'available';
    var buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';

    return (
      <li className='menu-fish'>
        <img src={details.image} alt={details.name} />
        <h3 className='fish-name'>
          {details.name}
          <span className='price'>{Helpers.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
      </li>
    );
  }
}

Fish.propTypes = {
  details: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  addToOrder: React.PropTypes.func.isRequired
};

export default Fish;
