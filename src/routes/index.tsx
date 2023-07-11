import { component$, useSignal, useStore } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import Counter from '~/components/starter/counter/counter';
import Hero from '~/components/starter/hero/hero';
import Infobox from '~/components/starter/infobox/infobox';
import Starter from '~/components/starter/next-steps/next-steps';

export default component$(() => {
  const pokemonId = useSignal<number>(1); // primitivos
  // const pokemonIdw = useStore('pikachu'); // primitivos
  return (
    <>
      <span class="text-2x">Buscador simple</span>
      <span class="text-9xl">{pokemonId.value}</span>
      {/* TODO: crear imagen */}
      <div class="pt-2">
        <button onClick$={() => pokemonId.value++ } class="btn btn-primary mr-2">Anterior</button>
        <button class="btn btn-primary">Siguiente</button>
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
