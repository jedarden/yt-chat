/**
 * Tests for Search component
 * Spec Reference: Section 1.1 - test_specs_LS2.md
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';

describe('Search component', () => {
  it('renders search input and button', () => {
    // Arrange & Act
    render(<Search onSearch={jest.fn()} />);
    // Assert
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('triggers search callback on submit', () => {
    // Arrange
    const onSearch = jest.fn();
    render(<Search onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });
    // Act
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);
    // Assert
    expect(onSearch).toHaveBeenCalledWith('test');
  });
});