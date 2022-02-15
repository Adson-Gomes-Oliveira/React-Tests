import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('02. Testando o componente <About.js />.', () => {
  it('Testando se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const headingAbout = screen.getByRole('heading',
      { name: /about pokédex/i, level: 2 });
    expect(headingAbout).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const pOneFirst = screen.getByText(/This application simulates a Pokédex,/i);
    const pOne = screen.getByText(/a digital encyclopedia containing all Pokémons/i);
    const pTwoFirst = screen.getByText(/This application simulates a Pokédex,/i);
    const pTwo = screen.getByText(/One can filter Pokémons by type,/i);
    const paragraphs = [pOneFirst, pOne, pTwoFirst, pTwo];
    paragraphs.forEach((paragraph) => {
      expect(paragraph).toBeInTheDocument();
    });
  });

  it('Teste se a página contém a imagem correta de uma pokedex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
