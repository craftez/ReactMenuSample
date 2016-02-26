/*
  Add Fish Form
  <AddFishForm />
*/
import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class AddFishForm extends React.Component {
  createFish () {
    event.preventDefault();
    // Take data from the form and create object
    var fish = {
      name: this.refs.name.value,
      price: this.refs.price.value,
      status: this.refs.status.value,
      desc: this.refs.status.desc,
      image: this.refs.status.image
    };

    // Add the fish to app state
    this.props.handleAddFish(fish);
    this.refs.fishForm.reset();
  }

  render () {
    return (
      <form className='fish-edit' ref='fishForm' onSubmit={this.createFish}>
        <input type='text' ref='name' placeholder='Fish Name' />
        <input type='text' ref='price' placeholder='Fish Price' />
        <select ref='status'>
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea ref='desc' placeholder='Desc'></textarea>
        <input type='text' ref='image' placeholder='URL to image' />
        <button type='submit'>+Add Item</button>
      </form>
    );
  }
}

AddFishForm.propTypes = {
  handleAddFish: React.PropTypes.func.isRequired
};

export default AddFishForm;
