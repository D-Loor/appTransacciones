import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { ToastComponent, ToasterService } from '@coreui/angular';

@Component({
  selector: 'app-notificar',
  templateUrl: './notificar.component.html',
  styleUrls: ['./notificar.component.scss'],
  providers: [{ provide: ToastComponent, useExisting: forwardRef(() => NotificarComponent) }]
})
export class NotificarComponent extends ToastComponent {
  @Input() closeButton = true;
  @Input() title = '';
  @Input() colorToast = '';

  constructor(
    public override hostElement: ElementRef,
    public override renderer: Renderer2,
    public override toasterService: ToasterService,
    public override changeDetectorRef: ChangeDetectorRef
  ) {
    super(hostElement, renderer, toasterService, changeDetectorRef);
  }
}
