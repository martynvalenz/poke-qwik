import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";
interface Props {
  id: number|string;
  size?:number;
  backImage?:boolean;
  isVisible?:boolean;
}

export const PokemonImage = component$(({id,size = 200, backImage = false, isVisible = false}:Props) => {
  const imageLoaded = useSignal(false);
  useTask$(({track}) => {
    track(() => id);
    imageLoaded.value = false;
  });

  const imageUrl = useComputed$(() => {
    return (backImage)
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  });
  
  return(
    <div class="flex items-center justify-center" style={{ width:`${size}px`, height:`${size}px` }}>
      {!imageLoaded.value && (<span>Cargando...</span>)}
      {/* <span>{imageLoaded.value?'Cargada!':'Cargando...'}</span> */}
      <img
        alt="Imagen de pokemon"
        src={imageUrl.value }
        style={{
        width:`${size}px`}}
        onLoad$={() => {
          setTimeout(() => { 
            imageLoaded.value = true
          }, 400);
        }}
        class={[{ 
          'hidden': !imageLoaded.value,
          'brightness-0':isVisible,
        }, 'transition-all']}
      />
    </div>
  )
});