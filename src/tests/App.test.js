import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('01. Testando o componente <App.js />', () => {
  it(`Testando se o topo da aplicação contém um 
  conjunto fixo de links de navegação.`, () => {
    renderWithRouter(<App />);
    const headerLinks = screen.getAllByRole('link');
    expect(headerLinks[0]).toHaveTextContent(/home/i);
    expect(headerLinks[1]).toHaveTextContent(/about/i);
    expect(headerLinks[2]).toHaveTextContent(/favorite pokémons/i);
  });

  it(`Testando se a aplicação é redirecionada para a página inicial, 
  na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    const newLocation = history.location.pathname;
    expect(newLocation).toBe('/');
  });

  it(`Testando se a aplicação é redirecionada para a página about, 
  na URL /about ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    const newLocation = history.location.pathname;
    expect(newLocation).toBe('/about');
  });

  it(`Testando se a aplicação é redirecionada para a página Pokemons Favoritados, 
  na URL /favorites ao clicar no link Favorite Pokemons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritesLink).toBeInTheDocument();
    userEvent.click(favoritesLink);
    const newLocation = history.location.pathname;
    expect(newLocation).toBe('/favorites');
  });

  it(`Testando se a aplicação é redirecionada para a página 
  Not Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/no-longer-page');

    const notFound = screen.getByRole('heading',
      { name: /page requested not found crying emoji/i, level: 2 });

    expect(notFound).toBeInTheDocument();
  });
});
