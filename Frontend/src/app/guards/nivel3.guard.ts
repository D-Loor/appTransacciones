import { CanActivateFn } from '@angular/router';

export const nivel3Guard: CanActivateFn = (route, state) => {
  let inicio = localStorage.getItem('sesionLoginInicio');
  let nivel = localStorage.getItem('nivelAcceso');
  if (inicio){
    if(nivel == "1" || nivel == "2" || nivel == "3"){
      return true;
    }
  }
  return false;
};
