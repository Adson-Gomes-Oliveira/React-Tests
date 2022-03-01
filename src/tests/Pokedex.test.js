import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <Pokedex.js />', () => {
  it('Testando se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const head = screen.getByRole('heading',
      { name: /encountered pokémons/i, level: 2 });
    expect(head).toBeInTheDocument();
  });

  const pokemonTestId = 'pokemon-name';
  it('Testando funcionalidade do botão Próximo Pokemon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();
    const pokemonName = screen.getAllByTestId(pokemonTestId);
    expect(pokemonName.length).toBe(1);
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    let prevPokeName;
    for (let click = 0; click < (typeButton.length + 1); click += 1) {
      const actualPokemon = screen.getByTestId(pokemonTestId);
      expect(actualPokemon).toBeInTheDocument();
      userEvent.click(nextButton);
      expect(pokemonName.length).toBe(1);
      const pokeName = actualPokemon.innerHTML;
      expect(prevPokeName !== pokeName).toBe(true);
      prevPokeName = pokeName;
    }
  });

  it('Testando botões de filtro', () => {
    renderWithRouter(<App />);
    const actualPokemon = screen.getByTestId(pokemonTestId);
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(typeButton.length > 0).toBe(true);
    let prevButton;
    typeButton.forEach((typeBtn) => {
      expect(prevButton !== typeBtn.innerHTML).toBe(true);
      prevButton = typeBtn.innerHTML;
      userEvent.click(typeBtn);
      const type = screen.getByTestId('pokemon-type');
      expect(type.innerHTML === typeBtn.innerHTML).toBe(true);
      expect(allButton).toBeInTheDocument();
      expect(actualPokemon).toBeInTheDocument();
    });
  });

  it('Testando botão All', () => {
    renderWithRouter(<App />);
    const getAllButton = screen.getByRole('button', { name: /All/i });
    expect(getAllButton).toBeInTheDocument();
    userEvent.click(getAllButton);
    const actualPokemon = screen.getByTestId(pokemonTestId);
    expect(actualPokemon).toBeInTheDocument();
  });
});
