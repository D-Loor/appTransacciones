import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './../../dashboard/dashboard-charts-data';
import { UsuarioModel } from "./../../../models/usuario.model";
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../../../views/pages/notify/notificar/notificar.component';
import { ViewChild  } from '@angular/core';

interface MoviminetoUsuario {
  idUsuario?: string;
  compras?: string;
  ventas?: string;
  total?: string;
  usuario_transaccion: UsuarioModel;
}

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  public listaMovimientosUsuarios: MoviminetoUsuario[] = [];
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public placement = ToasterPlacement.TopEnd;

  fechaInicio: String = "2023-10-12";
  fechaFin: String = "2023-10-16";

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(private chartsData: DashboardChartsData, public transaccionesService: TransaccionesService) {
  }
  
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  obtenerDatos() {
    this.listaMovimientosUsuarios = [];
    this.transaccionesService.obtenerTransaccionesUsuarios(this.fechaInicio, this.fechaFin).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Movimientos registrados en esta fecha.!', 'info');
      } else {
        this.listaMovimientosUsuarios = resp['data'];
        console.log("listaMovimientosUsuarios ", this.listaMovimientosUsuarios);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }

  showToast(mensaje: string, color: string) {
    const options = {
      title: mensaje,
      delay: 5000,
      placement: this.placement,
      colorToast: color,
      autohide: true,
    }
    const componentRef = this.toaster.addToast(NotificarComponent, { ...options });
  }

}
