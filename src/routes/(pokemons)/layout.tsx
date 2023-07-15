import { component$, Slot, useStyles$ } from '@builder.io/qwik';

import Navbar from '~/components/shared/navbar/navbar';

import styles from '~/global.css?inline';
import { PokemonProvider } from '~/context/pokemon/pokemon-provider';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <PokemonProvider>
        <Navbar />
        <main class="flex flex-col items-center justify-center">
          <Slot />
        </main>
        {/* <Footer /> */}
      </PokemonProvider>
    </>
  );
});