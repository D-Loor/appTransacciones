import { CanActivateFn } from '@angular/router';

export const nivel4Guard: CanActivateFn = (route, state) => {
  let inicio = localStorage.getItem('sesionLoginInicio');
  let nivel = localStorage.getItem('nivelAcceso');
  if (inicio){
    if(nivel == "1" || nivel == "2" || nivel == "3" || nivel == "4"){
      return true;
    }
  }
  return false;
};
