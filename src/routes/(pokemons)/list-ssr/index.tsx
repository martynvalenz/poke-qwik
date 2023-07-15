import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { chatGPTResponse } from '~/helpers/get-chat-gtp';
import { getSmallPokemons } from '~/helpers/get-pokemons';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({query, redirect, pathname}) => {
  const offset = Number(query.get('offset') || 0);
  if(offset < 0) redirect(301, pathname);
  // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
  // const data = await resp.json() as PokemonListResponse;
  // return data.results;
  return await getSmallPokemons(offset);
});

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();
  const modalVisible = useSignal(false);
  const modalPokemon = useStore({
    id: '',
    name: '',
  });
  const chatGPTPokemonFact = useSignal('');

  // Modal functions
  const showModal = $((id:string,name:string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
  });
  
  const currentOffset = useComputed$<number>(() => {
    // const offset = location.url.searchParams.get('offset');
    const offset = new URLSearchParams(location.url.search);
    return Number(offset.get('offset') || 0);
  });

  // TODO: probar async/await
  useVisibleTask$(({track}) => {
    track(() => modalPokemon.name);
    chatGPTPokemonFact.value = '';
    if(modalPokemon.name.length > 0){
      chatGPTResponse(modalPokemon.name)
        .then((resp) => {
          chatGPTPokemonFact.value = resp;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Está cargando página {location.isNavigating ? 'Si':'No'}</span>
      </div>

      <div class="mt-10">
        <Link href={`/list-ssr/?offset=${currentOffset.value - 10}`} class="btn btn-primary mr-2">
          Anteriores
        </Link>
        <Link href={`/list-ssr/?offset=${currentOffset.value + 10}`} class="btn btn-primary mr-2">
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map(({name, id}) => (
            <div
              key={name}
              onClick$={() => showModal(id,name)}
              class="m-5 flex flex-col justify-center items-center"
            >
              <PokemonImage id={id} />
              <span class="capitalize">{name}</span>
            </div>
          ))
        }
      </div>
      
      {/* {
        false && (<Modal />)
      } */}

      <Modal showModal={modalVisible.value} persistent closeFn={closeModal} size="md">
        <div q:slot="title">
          {modalPokemon.name}
        </div>
        <div q:slot="content" class="flex flex-col justify-center items-center">
          <PokemonImage id={modalPokemon.id}  />
          <span>{
            chatGPTPokemonFact.value === ''
            ? 'Preguntándole a ChatGPT...'
            : chatGPTPokemonFact.value
          }</span>
        </div>
        <span>Hola mundo</span>
      </Modal>
      
    </>
  )
});

export const head: DocumentHead = {
  title: 'SSR-List',
  meta: [
    {
      name: 'description',
      content: 'Listado del lado del servidor',
    },
  ],
};
