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

describe('Stretch Tests', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders', () => {
    expect(
        screen.queryByText('Some Text Not In The App'),
    ).not.toBeInTheDocument();
  });

  it('Set button is disabled with invalid date', () => {
    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    const button = screen.getByText('Set');

    fireEvent.change(input, {target: {value: 'invalid date'}});
    expect(button).toBeDisabled();
  });

  it('Set button is enabled with valid date', () => {
    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    const button = screen.getByText('Set');

    fireEvent.change(input, {target: {value: '10/18/2022'}});
    expect(button).toBeEnabled();
  });

  it('input field has correct placeholder', () => {
    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    expect(input).toBeInTheDocument();
  });

  it('input field has correct aria-label', () => {
    const input = screen.getByLabelText('Enter date as MM/DD/YYYY');
    expect(input).toBeInTheDocument();
  });

  it('button has correct text', () => {
    const button = screen.getByText('Set');
    expect(button).toBeInTheDocument();
  });

  it('button is clickable only with valid date', () => {
    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    const button = screen.getByText('Set');

    // Invalid date
    fireEvent.change(input, {target: {value: 'invalid date'}});
    expect(button).toBeDisabled();

    // Valid date
    fireEvent.change(input, {target: {value: '10/18/2022'}});
    expect(button).toBeEnabled();
  });
});
