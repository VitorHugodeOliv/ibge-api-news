import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('Testando renderização do Header', () => {
  it('Se o Header é renderizado', () => {
    render(<App />);
  });
});
