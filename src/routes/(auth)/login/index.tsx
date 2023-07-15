import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';

export const useLoginUserAction = routeAction$((data, {cookie, redirect}) => {
  const {email, password} = data;

  if(email === 'martynvalenz@gmail.com' && password === '123456'){
    const jwt = 'este_es_mi_token'
    cookie.set('jwt', jwt, {secure:true, path:'/'});
    redirect(302,'/dashboard')
    return {
      success: true,
      jwt
    }
  }
  else{
    return{
      success:false,
      jwt:''
    }
  }
}, zod$({
  email: z.string().email('Formato de correo no válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
}));

export default component$(() => {

  useStylesScoped$(styles);

  const action = useLoginUserAction();

  return (
    <Form action={action} class="login-form mt-5">
      <div class="relative">
        <input name="email" type="text" placeholder="Email address"  />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input id="password" name="password" type="password" placeholder="Password" />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type="submit">Ingresar</button>
      </div> 
      <p>
        {action.value?.success ? action.value.jwt : 'Fail'}
      </p>
      <code> { JSON.stringify( action.value, undefined , 2 ) } </code>
    </Form>
  );
});