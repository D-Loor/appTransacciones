import { CanActivateFn } from '@angular/router';

export const nivel2Guard: CanActivateFn = (route, state) => {
  let inicio = localStorage.getItem('sesionLoginInicio');
  let nivel = localStorage.getItem('nivelAcceso');
  if (inicio){
    if(nivel == "1" || nivel == "2"){
      return true;
    }
  }
  return false;
};
