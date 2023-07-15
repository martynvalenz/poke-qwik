import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { type PokemonGameState, PokemonListContext, PokemonGameContext, type PokemonListState } from '~/context';

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 1,
    showBackImage: false,
    isVisible: true,
  });

  
  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });
  
  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  // Tarea en el lado del cliente
  useVisibleTask$(() => {
    if(localStorage.getItem('pokemon-game')){
      const {
        pokemonId = 1,
        showBackImage = false,
        isVisible = true,
      } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;
      pokemonGame.isVisible = isVisible;
      pokemonGame.pokemonId = pokemonId;
      pokemonGame.showBackImage = showBackImage;
    }
  });
  useVisibleTask$(({track}) => {
    track(() => [pokemonGame.isVisible, pokemonGame.pokemonId, pokemonGame.showBackImage]);
    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
  });

  return (<Slot />);
});