import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente <Pokedex.js />', () => {
  it(`Teste se página contém um heading h2 
  com o texto Page requested not found 😭`, () => {
    renderWithRouter(<NotFound />);
    const head = screen.getByRole('heading',
      { name: /Page requested not found Crying emoji/i, level: 2 });
    const imageDefault = screen.getAllByRole('img');
    expect(head).toBeInTheDocument();
    const verifyImage = imageDefault.some((img) => img.src === 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(verifyImage).toBe(true);
  });
});
