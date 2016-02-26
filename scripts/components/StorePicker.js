import React from 'react';
import {History} from 'react-router';
import ReactMixing from 'react-mixin';
import Helpers from '../helpers';
import autobind from 'autobind-decorator';
/**
  StorePicker component
**/
@autobind
class StorePicker extends React.Component {
  goToStore (event) {
    event.preventDefault();
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' + storeId);
  }

  render () {
    return (
      <form className='store-selector' onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input type='text' defaultValue={Helpers.getFunName()} ref='storeId' />
        <input type='submit'/>
      </form>
    );
  }
}

ReactMixing.onClass(StorePicker, History);

export default StorePicker;
