/*
#######################################################################
#
# Copyright (C) 2020-2024 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import React from 'react';
import PropTypes from 'prop-types';
import './Picker.css';

/**
 * Picker component.
 */
class Picker extends React.Component {
  /**
   * Constructs the Picker component.
   * @param {object} props - The properties passed to the component.
   */
  constructor(props) {
    super(props);
    const initialDate = props.date || new Date();
    this.state = {
      curDate: initialDate,
      selDate: initialDate,
    };
  }

  /**
   * Set the date for the picker.
   * @param {Date} newDate - The new date to set.
   */
  setDate = (newDate) => {
    this.setState({
      curDate: newDate,
      selDate: newDate,
    });
    if (this.props.setDate) {
      this.props.setDate(newDate);
    }
  };

  /**
   * Handle the click event to go to the previous month.
   */
  handlePrevClick = () => {
    const {curDate} = this.state;
    const newDate = new Date(curDate);
    newDate.setMonth(curDate.getMonth() - 1);
    this.setState({curDate: newDate});
  };

  /**
   * Handle the click event to go to the next month.
   */
  handleNextClick = () => {
    const {curDate} = this.state;
    const newDate = new Date(curDate);
    newDate.setMonth(curDate.getMonth() + 1);
    this.setState({curDate: newDate});
  };

  /**
   * Handle the click event to select a day.
   * @param {number} day - The day to select.
   * @param {boolean} isPrevMonth - If the day is in the previous month.
   * @param {boolean} isNextMonth - If the day is in the next month.
   */
  handleDayClick = (day, isPrevMonth, isNextMonth) => {
    const {curDate} = this.state;
    const newDate = new Date(curDate);
    if (isPrevMonth) newDate.setMonth(curDate.getMonth() - 1);
    if (isNextMonth) newDate.setMonth(curDate.getMonth() + 1);
    newDate.setDate(day);
    this.setState({selDate: newDate});
  };

  /**
   * Generate the calendar days.
   * @return {Array} The calendar days.
   */
  generateCalendar = () => {
    const {curDate, selDate} = this.state;
    const firstDay = new Date(
        curDate.getFullYear(), curDate.getMonth(), 1,
    ).getDay();
    const lastDate = new Date(
        curDate.getFullYear(), curDate.getMonth() + 1, 0,
    ).getDate();
    const prevLastDate = new Date(
        curDate.getFullYear(), curDate.getMonth(), 0,
    ).getDate();

    const calendar = [];

    for (let i = firstDay; i > 0; i -= 1) {
      const prevMonthDate = new Date(curDate);
      prevMonthDate.setMonth(curDate.getMonth() - 1);
      const ariaLabel = `${
        prevMonthDate.toLocaleDateString('default', {month: 'long'})
      } ${prevLastDate - i + 1} ${prevMonthDate.getFullYear()}`;
      calendar.push(
          <div
            key={`prev-${i}`}
            aria-label={ariaLabel}
            className="day prev-month"
          >
            {prevLastDate - i + 1}
          </div>,
      );
    }

    for (let i = 1; i <= lastDate; i += 1) {
      const isSelected = selDate.getDate() === i &&
        selDate.getMonth() === curDate.getMonth() &&
        selDate.getFullYear() === curDate.getFullYear();
      const classList = isSelected ?
        'day current-month selected' :
        'day current-month';
      const ariaLabel = `${curDate.toLocaleDateString('default', {
        month: 'long',
      })} ${i} ${curDate.getFullYear()}${
        isSelected ? ' (selected)' : ''
      }`;
      calendar.push(
          <div
            key={`current-${i}`}
            aria-label={ariaLabel}
            className={classList}
            onClick={() => this.handleDayClick(i, false, false)}
            onKeyDown={() => this.handleDayClick(i, false, false)}
            role="button"
            tabIndex={0}
          >
            {i}
          </div>,
      );
    }

    let dayCounter = 1;
    const totalCells = 42;
    const currentCells = firstDay + lastDate;
    for (let i = currentCells; i < totalCells; i += 1) {
      const nextMonthDate = new Date(curDate);
      nextMonthDate.setMonth(curDate.getMonth() + 1);
      const ariaLabel = `${
        nextMonthDate.toLocaleDateString('default', {month: 'long'})
      } ${dayCounter} ${nextMonthDate.getFullYear()}`;
      calendar.push(
          <div
            key={`next-${i}`}
            aria-label={ariaLabel}
            className="day next-month"
            onClick={() => this.handleDayClick(dayCounter, false, true)}
            onKeyDown={() => this.handleDayClick(dayCounter, false, true)}
            role="button"
            tabIndex={0}
          >
            {dayCounter}
          </div>,
      );
      dayCounter += 1;
    }

    return calendar;
  };

  /**
   * @return {object} a <div> containing the picker
   */
  render() {
    const {curDate} = this.state;
    return (
      <div className="picker">
        <div className="navigation">
          <button
            aria-label="Go to Previous Month"
            onClick={this.handlePrevClick}
            type="button"
          >
            &lt;
          </button>
          <span
            aria-label="Return to Selected Date"
            className="display"
          >
            {curDate.toLocaleDateString('default', {
              month: 'long', year: 'numeric',
            })}
          </span>
          <button
            aria-label="Go to Next Month"
            onClick={this.handleNextClick}
            type="button"
          >
            &gt;
          </button>
        </div>
        <div className="calendar">
          <div className="days-of-week">
            {['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'].map((day, index) => (
              <div key={`${day}-${index}`} className="day-header">{day}</div>
            ))}
          </div>
          <div className="days">{this.generateCalendar()}</div>
        </div>
      </div>
    );
  }
}

Picker.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func,
};

Picker.defaultProps = {
  date: new Date(),
  setDate: () => {},
};

export default Picker;
