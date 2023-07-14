import { component$, useContext } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export const usePokemonId = routeLoader$<number>(({params,redirect}) => {
  // const location = useLocation();
  // return location.params.id;
  const id = Number(params.id);
  
  if(isNaN(id)) redirect(301,'/');
  if(id <= 0) redirect(301,'/');
  if(id > 1009) redirect(301,'/');
  return id;
})


export default component$(() => {
  // const location = useLocation();
  const pokemonId = usePokemonId();
  const pokemonGame = useContext(PokemonGameContext);
  return (
    <>
      {/* <span class="text-5xl">Pokemon: {location.params.id}</span> */}
      <span class="text-5xl">Pokemon: {pokemonId}</span>
      <PokemonImage id={pokemonId.value} isVisible={pokemonGame.isVisible} backImage={pokemonGame.showBackImage}  />
    </>
  )
});
 
export const head: DocumentHead = {
  title: `Pokemon: id`,
  meta: [
    {
      name: 'description',
      content: `Quién est este pokemon?: id`,
    },
  ],
};