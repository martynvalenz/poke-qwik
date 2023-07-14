import { component$, $, useContext } from '@builder.io/qwik';
import {type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

// import Counter from '~/components/starter/counter/counter';
// import Hero from '~/components/starter/hero/hero';
// import Infobox from '~/components/starter/infobox/infobox';
// import Starter from '~/components/starter/next-steps/next-steps';

export default component$(() => {
  const nav = useNavigate();
  // const pokemonId = useSignal<number>(1);
  // const showBackImage = useSignal<boolean>(false);
  // const isVisible = useSignal<boolean>(false);
  const pokemonGame = useContext(PokemonGameContext);
  // const pokemonIdw = useStore('pikachu');
  const changePokemonId = $((value:number) => {
    if((pokemonGame.pokemonId + value) <= 0) return;
    else if((pokemonGame.pokemonId + value) > 898) return pokemonGame.pokemonId = 1;
    pokemonGame.pokemonId += value;
  })

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonGame.pokemonId}/`);
  });

  return (
    <>
      <span class="text-2x">Buscador simple</span>
      <span class="text-9xl">{pokemonGame.pokemonId}</span>
      {/* <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonGame.pokemonId}.png`} alt="Imagen de pokemon" style={{ width:'200px' }} /> */}
      {/* <Link href={`/pokemon/${pokemonGame.pokemonId}/`}> */}
      <div onClick$={async() => 
        await goToPokemon()
      }>
        <PokemonImage id={pokemonGame.pokemonId } backImage={pokemonGame.showBackImage} isVisible={pokemonGame.isVisible}  />
      </div>
      {/* </Link> */}
      <div class="pt-2">
        <button onClick$={() => changePokemonId(-1) } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => changePokemonId(1) } class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={() => pokemonGame.showBackImage = !pokemonGame.showBackImage } class="btn btn-accent mr-2">Voltear</button>
        <button onClick$={() => pokemonGame.isVisible = !pokemonGame.isVisible } class="btn btn-accent">{pokemonGame.isVisible ? 'Ocultar':'Revelar'}</button>
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
