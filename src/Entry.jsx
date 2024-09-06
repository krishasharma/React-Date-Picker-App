/*
#######################################################################
#
# Copyright (C) 2024 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import React from 'react';
import PropTypes from 'prop-types';
import './Entry.css';

/**
 * Date entry component.
 */
class Entry extends React.Component {
  /**
   * Constructor
   *
   * this.props.pickerRef.current is a reference to the Picker
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      inputDate: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSetDate = this.handleSetDate.bind(this);
  }

  /**
   * Handle input change.
   *
   * @param {object} event
   */
  handleInputChange(event) {
    this.setState({inputDate: event.target.value});
  }

  /**
   * Handle setting the date.
   */
  handleSetDate() {
    const {inputDate} = this.state;
    const {pickerRef} = this.props;
    const date = new Date(inputDate);
    if (!Number.isNaN(date.getTime()) && pickerRef.current) {
      pickerRef.current.setDate(date);
    }
  }

  /**
   * @return {object}
   */
  render() {
    const {inputDate} = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="MM/DD/YYYY"
          aria-label="Enter date as MM/DD/YYYY"
          value={inputDate}
          onChange={this.handleInputChange}
        />
        <button
          type="button"
          onClick={this.handleSetDate}
          disabled={!/^\d{2}\/\d{2}\/\d{4}$/.test(inputDate)}
        >
          Set
        </button>
      </div>
    );
  }
}

/*
#######################################################################
#######               DO NOT MODIFY BELOW HERE              ###########
#######################################################################
*/

Entry.propTypes = {
  pickerRef: PropTypes.any,
};

export default Entry;
