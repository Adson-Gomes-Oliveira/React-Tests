import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <Pokemon.js />', () => {
  it(`Testando se é renderizado um card com 
  as informações de determinado pokémon.`, () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg.alt).toBe(`${pokemonName.innerHTML} sprite`);
  });

  it('Testando link de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link',
      { name: /more details/i, url: '/pokemons/id' });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const newLocation = history.location.pathname;
    expect(newLocation).toBe('/pokemons/25');
    const findSummary = screen.getByText(/summary/i);
    expect(findSummary).toBeInTheDocument();
  });

  it('Testando função de favoritar', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link',
      { name: /more details/i, url: '/pokemons/id' });
    userEvent.click(linkDetails);

    const favoriteButton = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);
    const starImage = screen.getAllByRole('img');
    const verifingStar = starImage.some((img) => img.src === 'http://localhost/star-icon.svg'
      && img.alt === 'Pikachu is marked as favorite');
    // starImage.forEach((img) => {
    //   console.log(img.src);
    // });
    expect(verifingStar).toBe(true);
  });
});
