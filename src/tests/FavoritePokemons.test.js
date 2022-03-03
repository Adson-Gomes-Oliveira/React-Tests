import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';

describe('Testando o componente <FavoritePokemons.js />', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found, 
  se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundText = screen.getByText(/No favorite pokemon found/i);
    expect(notFoundText).toBeInTheDocument();
  });

  it('Testando se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', { name: /more details/i });
    expect(detailsButton).toBeInTheDocument();
    userEvent.click(detailsButton);
    const newLocation = history.location.pathname;
    expect(newLocation).toBe('/pokemons/25');
    const favoriteButton = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);
    const favoriteRouteButton = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteRouteButton);
    const newFavoriteLocation = history.location.pathname;
    expect(newFavoriteLocation).toBe('/favorites');
  });
});
