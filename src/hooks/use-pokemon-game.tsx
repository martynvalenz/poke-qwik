import { useContext, $, useComputed$ } from '@builder.io/qwik';
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {
  const pokemonGame = useContext(PokemonGameContext);

  const changePokemonId = $((value:number) => {
    if((pokemonGame.pokemonId + value) <= 0) return;
    else if((pokemonGame.pokemonId + value) > 898) return pokemonGame.pokemonId = 1;
    pokemonGame.pokemonId += value;
  });

  const toggleFromBack = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage;
  });

  const toggleVisible = $(() => {
    pokemonGame.isVisible = !pokemonGame.isVisible;
  });

  return {
    pokemonId:useComputed$(() => pokemonGame.pokemonId),
    showBackImage:useComputed$(() => pokemonGame.showBackImage),
    isVisible:useComputed$(() => pokemonGame.isVisible),
    nextPokemon:$(() => changePokemonId(1)),
    prevPokemon:$(() => changePokemonId(-1)),
    toggleFromBack,
    toggleVisible,
  }
}