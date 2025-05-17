/**
 * Transcript store (simple reducer)
 * Spec Reference: Section 1.2 - test_specs_LS2.md
 */

export const initialState = [];

export function transcriptReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TRANSCRIPT':
      return [...state, action.payload];
    case 'CLEAR_TRANSCRIPTS':
      return [];
    default:
      return state;
  }
}

// Action creators
export const addTranscript = (entry) => ({
  type: 'ADD_TRANSCRIPT',
  payload: entry,
});

export const clearTranscripts = () => ({
  type: 'CLEAR_TRANSCRIPTS',
});