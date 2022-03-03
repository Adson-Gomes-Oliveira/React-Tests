import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <PokemonDetails.js />', () => {
  const s1 = 'This intelligent Pokémon roasts hard berries';
  const s2 = ' with electricity to make them tender enough to eat.';
  const mockPokemonLocation = {
    image1: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    image2: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    sub1: 'Kanto Viridian Forest',
    sub2: 'Kanto Power Plant',
    location: 'Pikachu location',
  };

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
    const text = screen.getByText(s1 + s2);
    expect(text).toBeInTheDocument();
  });

  it('Testando as localizações do pokemon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const map = screen.getByRole('heading',
      { name: /game locations of pikachu/i, level: 2 });
    expect(map).toBeInTheDocument();
    const locations = screen.getAllByRole('img');
    const pLocations0 = screen.getByText(mockPokemonLocation.sub1);
    const pLocations1 = screen.getByText(mockPokemonLocation.sub2);
    expect(pLocations0).toBeInTheDocument();
    expect(pLocations1).toBeInTheDocument();
    expect(locations[1].src).toBe(mockPokemonLocation.image1);
    expect(locations[2].src).toBe(mockPokemonLocation.image2);
    expect(locations[1].alt).toBe(mockPokemonLocation.location);
    expect(locations[2].alt).toBe(mockPokemonLocation.location);
    const verifyLocations = locations.filter((loc) => loc.alt
    === mockPokemonLocation.location);
    expect(verifyLocations.length).toBe(2);
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
