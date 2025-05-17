/**
 * Tests for Chat component
 * Spec Reference: Section 1.1 - test_specs_LS2.md
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Chat from '../components/Chat';

describe('Chat component', () => {
  it('displays chat messages', () => {
    // Arrange
    const messages = [{ user: 'A', text: 'Hello' }];
    // Act
    render(<Chat messages={messages} />);
    // Assert
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles empty message list', () => {
    // Arrange
    const messages = [];
    // Act
    render(<Chat messages={messages} />);
    // Assert
    expect(screen.getByText(/no messages/i)).toBeInTheDocument();
  });
});