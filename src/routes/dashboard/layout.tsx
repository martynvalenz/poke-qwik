import { Slot, component$ } from '@builder.io/qwik';
import { type RequestEventLoader, routeLoader$ } from '@builder.io/qwik-city';
import Navbar from '~/components/shared/navbar/navbar';

export const useCheckAuthCookie = routeLoader$(({ cookie, redirect }:RequestEventLoader) => {
  const jwt = cookie.get('jwt');
  if(jwt){
    return
  }
  redirect(302,'/login')
});

export default component$(() => {
  return(
    <>
      <Navbar/>
      <div class="flex flex-col items-center justify-center mt-2">
        <span class="text-5xl">Dasboard Layou</span>
        <Slot />
      </div>
    </>
  )
});