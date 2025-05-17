/**
 * Tests for transcript store
 * Spec Reference: Section 1.2 - test_specs_LS2.md
 */

import { transcriptReducer, addTranscript, clearTranscripts, initialState } from '../store/transcriptStore';

describe('transcriptReducer', () => {
  it('adds transcript entry', () => {
    // Arrange
    const state = [];
    // Act
    const nextState = transcriptReducer(state, addTranscript({ id: 1, text: 'foo' }));
    // Assert
    expect(nextState).toEqual([{ id: 1, text: 'foo' }]);
  });

  it('clears all transcripts', () => {
    // Arrange
    const state = [{ id: 1, text: 'foo' }];
    // Act
    const nextState = transcriptReducer(state, clearTranscripts());
    // Assert
    expect(nextState).toEqual([]);
  });
});