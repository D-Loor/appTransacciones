import { CanActivateFn } from '@angular/router';

export const nivel1Guard: CanActivateFn = (route, state) => {  
  let inicio = localStorage.getItem('sesionLoginInicio');
  let nivel = localStorage.getItem('nivelAcceso');
  if (inicio){
    if(nivel == "1"){
      return true;
    }
  }
  return false;
};
