import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

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
  return (
    <>
      {/* <span class="text-5xl">Pokemon: {location.params.id}</span> */}
      <span class="text-5xl">Pokemon: {pokemonId}</span>
      <PokemonImage id={pokemonId.value}  />
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