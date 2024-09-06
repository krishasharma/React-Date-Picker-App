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

import {it, expect, describe, beforeEach} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import App from '../App';

describe('Picker Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('displays the current month and year', () => {
    const monthYearDisplay = screen.getByText('July 2024');
    expect(monthYearDisplay).toBeInTheDocument();
  });

  it('displays previous month days correctly', () => {
    const prevMonthDay = screen.getByLabelText('June 30 2024');
    expect(prevMonthDay).toBeInTheDocument();
  });

  it('displays next month days correctly', () => {
    const nextMonthDay = screen.getByLabelText('August 2 2024');
    expect(nextMonthDay).toBeInTheDocument();
  });

  it('does not have a selected element after clicking next', () => {
    const nextButton = screen.getByLabelText('Go to Next Month');
    fireEvent.click(nextButton);
    const selectedElement = screen.queryByLabelText(/selected/);
    expect(selectedElement).not.toBeInTheDocument();
  });

  it('has a selected element after clicking next and previous', () => {
    const nextButton = screen.getByLabelText('Go to Next Month');
    fireEvent.click(nextButton);
    const prevButton = screen.getByLabelText('Go to Previous Month');
    fireEvent.click(prevButton);
    const selectedElement = screen.queryByLabelText(/selected/);
    expect(selectedElement).toBeInTheDocument();
  });

  it(
      'does not have a selected element after clicking next and previous twice',
      () => {
        const nextButton = screen.getByLabelText('Go to Next Month');
        fireEvent.click(nextButton);
        const prevButton = screen.getByLabelText('Go to Previous Month');
        fireEvent.click(prevButton);
        fireEvent.click(prevButton);
        const selectedElement = screen.queryByLabelText(/selected/);
        expect(selectedElement).not.toBeInTheDocument();
      },
  );

  it(
      'displays the correct days before the first day of the current month',
      () => {
        const prevMonthDay = screen.getByLabelText('June 30 2024');
        expect(prevMonthDay).toBeInTheDocument();
        expect(prevMonthDay).toHaveTextContent('30');
      },
  );

  it(
      'displays the correct days after the last day of the current month',
      () => {
        const nextMonthDay = screen.getByLabelText('August 2 2024');
        expect(nextMonthDay).toBeInTheDocument();
        expect(nextMonthDay).toHaveTextContent('2');
      },
  );

  it('updates the month and year correctly when navigating', () => {
    const nextButton = screen.getByLabelText('Go to Next Month');
    fireEvent.click(nextButton);
    const monthYearDisplay = screen.getByText('August 2024');
    expect(monthYearDisplay).toBeInTheDocument();

    const prevButton = screen.getByLabelText('Go to Previous Month');
    fireEvent.click(prevButton);
    expect(screen.getByText('July 2024')).toBeInTheDocument();
  });
});
