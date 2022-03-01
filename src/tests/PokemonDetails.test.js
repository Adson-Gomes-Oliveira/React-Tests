import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <PokemonDetails.js />', () => {
  it(`Teste se as informações detalhadas do
   Pokémon selecionado são mostradas na tela`, () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const name = screen.getByText('Pikachu Details');
    expect(name).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summary).toBeInTheDocument();
    const text = screen.getByTestId('pokemon-summary');
    expect(text).toBeInTheDocument();
    expect(text.innerHTML.length > 0).toBe(true);
  });

  it('Testando as localizações do pokemon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const map = screen.getByRole('heading',
      { name: /game locations of pikachu/i, level: 2 });
    expect(map).toBeInTheDocument();
    const locations = screen.getAllByTestId('pokemon-location');
    const imgLocations = screen.getAllByTestId('img-location');
    expect(locations.length).toBe(2);
    expect(imgLocations.length).toBe(2);
    expect(imgLocations[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgLocations[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgLocations[0].alt).toBe('Pikachu location');
    expect(imgLocations[1].alt).toBe('Pikachu location');
  });

  it('Testando favoritar', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    const starImage = screen.getAllByRole('img');
    const verifingStar = starImage.some((img) => img.src === 'http://localhost/star-icon.svg'
      && img.alt === 'Pikachu is marked as favorite');
    // starImage.forEach((img) => {
    //   console.log(img.src);
    // });
    expect(verifingStar).toBe(true);
  });

  it('Testando desfavoritar', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    const starImage = screen.getAllByRole('img');
    const verifingStar = starImage.some((img) => img.src === 'http://localhost/star-icon.svg'
      && img.alt === 'Pikachu is marked as favorite');
    expect(verifingStar).toBe(false);
  });
});
