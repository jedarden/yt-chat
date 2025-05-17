/**
 * Tests for /api/transcript endpoint
 * Spec Reference: Section 1.3, 2 - test_specs_LS2.md
 */

const request = require('supertest');
const express = require('express');
const app = require('../index');

jest.mock('youtube-transcript', () => ({
 getTranscript: jest.fn(async (videoId) => {
   if (videoId === 'abc123') {
     return [{ text: 'Sample transcript' }];
   }
   throw new Error('Transcript not found');
 })
}));

describe('/api/transcript', () => {
  it('returns transcript for valid videoId', async () => {
    const res = await request(app).get('/api/transcript?videoId=abc123');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('videoId', 'abc123');
    expect(res.body).toHaveProperty('text', 'Sample transcript');
  });

  it('returns 404 for missing videoId', async () => {
    // Arrange: DB empty for videoId=notfound
    // Act
    const res = await request(app).get('/api/transcript?videoId=notfound');
    // Assert
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});