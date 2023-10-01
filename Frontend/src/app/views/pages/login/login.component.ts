import { Component, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { AppToastComponent } from '../../notifications/toasters/toast-simple/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  cedula: string = '';
  password: string = '';

  positions = Object.values(ToasterPlacement);
  position = ToasterPlacement.TopEnd;
  autohide = true;
  delay = 5000;
  fade = true;

  @ViewChildren(ToasterComponent) viewChildren!: QueryList<ToasterComponent>;

  toasterForm = new UntypedFormGroup({
    autohide: new UntypedFormControl(this.autohide),
    delay: new UntypedFormControl({value: this.delay, disabled: !this.autohide}),
    position: new UntypedFormControl(this.position),
    fade: new UntypedFormControl({value: true, disabled: false}),
    closeButton: new UntypedFormControl(true),
    color: new UntypedFormControl('danger'),
    
  });

  formChanges: Observable<any> = this.toasterForm.valueChanges.pipe(
    takeUntilDestroyed(),
    filter(e => e.autohide !== this.autohide)
  );

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.formChanges.subscribe(e => {
      this.autohide = e.autohide;
      this.position = e.position;
      this.fade = e.fade;
      const control = this.toasterForm?.get('delay');
      this.autohide ? control?.enable() : control?.disable();
      this.delay = control?.enabled ? e.timeout : this.delay;
    });
  }
  
  validarCredenciales() {
    debugger
    if(this.cedula == null || this.cedula == "" || this.password == null || this.password == ""){
      this.showToast();
    }else{
      if(this.cedula == "1" && this.password == "1"){
        this.router.navigate(['/estadisticas']);
      }else{

      }
    }
  }
  
  showToast() {
    const formValues = this.toasterForm.value;
    const toasterPosition = this.viewChildren.filter(item => item.placement === this.toasterForm.value.position);
    toasterPosition.forEach((item) => {
      const title = `Toast ${formValues.color} ${formValues.position}`;
      const {...props} = {...formValues, title};
      const componentRef = item.addToast(AppToastComponent, props, {});
      componentRef.instance['closeButton'] = props.closeButton;
    });
  }
}
