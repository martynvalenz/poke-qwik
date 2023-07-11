import { component$, useSignal, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

// import Counter from '~/components/starter/counter/counter';
// import Hero from '~/components/starter/hero/hero';
// import Infobox from '~/components/starter/infobox/infobox';
// import Starter from '~/components/starter/next-steps/next-steps';

export default component$(() => {
  const pokemonId = useSignal<number>(1); // primitivos
  const showBackImage = useSignal<boolean>(false); // primitivos
  const isVisible = useSignal<boolean>(false); // primitivos
  // const pokemonIdw = useStore('pikachu'); // primitivos
  const changePokemonId = $((value:number) => {
    if((pokemonId.value + value) <= 0) return;
    else if((pokemonId.value + value) > 898) return pokemonId.value = 1;
    pokemonId.value += value;
  })

  return (
    <>
      <span class="text-2x">Buscador simple</span>
      <span class="text-9xl">{pokemonId.value}</span>
      {/* <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`} alt="Imagen de pokemon" style={{ width:'200px' }} /> */}
      <PokemonImage id={pokemonId.value } backImage={showBackImage.value} isVisible={isVisible.value}  />
      <div class="pt-2">
        <button onClick$={() => changePokemonId(-1) } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => changePokemonId(1) } class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={() => showBackImage.value = !showBackImage.value } class="btn btn-accent">Voltear</button>
        <button onClick$={() => isVisible.value = !isVisible.value } class="btn btn-accent">{!isVisible.value ? 'Ocultar':'Revelar'}</button>
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
