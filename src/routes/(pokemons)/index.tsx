import { component$, $ } from '@builder.io/qwik';
import {type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

// import Counter from '~/components/starter/counter/counter';
// import Hero from '~/components/starter/hero/hero';
// import Infobox from '~/components/starter/infobox/infobox';
// import Starter from '~/components/starter/next-steps/next-steps';

export default component$(() => {
  const nav = useNavigate();
  const {
    pokemonId,
    showBackImage,
    isVisible,
    nextPokemon,
    prevPokemon,
    toggleFromBack,
    toggleVisible,
  } = usePokemonGame();

  const goToPokemon = $((id:number) => {
    nav(`/pokemon/${id}/`);
  });

  return (
    <>
      <span class="text-2x">Buscador simple</span>
      <span class="text-9xl">{pokemonId.value}</span>
      <div onClick$={async() => 
        await goToPokemon(pokemonId.value)
      }>
        <PokemonImage id={pokemonId.value } backImage={showBackImage.value} isVisible={isVisible.value}  />
      </div>
      <div class="pt-2">
        <button onClick$={prevPokemon } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={nextPokemon } class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={toggleFromBack } class="btn btn-accent mr-2">Voltear</button>
        <button onClick$={toggleVisible } class="btn btn-accent">{isVisible.value ? 'Ocultar':'Revelar'}</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [ 
    {
      name: 'description',
      content: 'Esta es mi primera aplicación en Qwik',
    },
  ],
};
