import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { UsuarioModel } from "./../../models/usuario.model";
import { LocalModel } from "./../../models/local.model";
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../../views/pages/notify/notificar/notificar.component';
import { ViewChild  } from '@angular/core';


interface MoviminetoUsuario {
  idUsuario?: string;
  compras?: string;
  ventas?: string;
  total?: string;
  usuario_transaccion: UsuarioModel;
}

interface MoviminetoLocal {
  idLocal?: string;
  year?: string;
  month?: string;
  week?: string;
  lunes?: string;
  martes?: string;
  miercoles?: string;
  jueves?: string;
  viernes?: string;
  sabado?: string;
  domingo?: string;
  total?: string;
  local_transaccion: LocalModel;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public listaMovimientosUsuarios: MoviminetoUsuario[] = [];
  public listaMovimientosLocales: MoviminetoLocal[] = [];
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public placement = ToasterPlacement.TopEnd;
  visibleModalUsuarios = false;
  visibleModalLocales = false;

  today = new Date();
  fechaInicio: String = this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + (this.today.getDate()-7);
  fechaFin: String = this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
  semana: String = "";
  formularioValido: boolean = false;
  colores = ['info', 'danger', 'secondary', 'primary', 'success', 'warning', 'light', 'dark'];
  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(private chartsData: DashboardChartsData, public transaccionesService: TransaccionesService) {
  }
  
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  obtenerDatosMoviminetosUsuarios() {
    this.listaMovimientosUsuarios = [];
    this.transaccionesService.obtenerTransaccionesUsuarios(this.fechaInicio, this.fechaFin).then(data => {
      let resp = data as any;
      this.visibleModalUsuarios = false;
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

  obtenerDatosMoviminetosLocales() {
    this.listaMovimientosLocales = [];

    const [anioStr, semanaStr] = this.semana.split('-W');
    const anio = parseInt(anioStr, 10);
    const semana = parseInt(semanaStr, 10);

    const fechaSemana = new Date(anio, 0, 1 + (semana - 1) * 7);

    this.transaccionesService.obtenerTransaccionesLocales(fechaSemana.getFullYear().toString(), (fechaSemana.getMonth() +1).toString(), (fechaSemana.getDate()-7).toString()).then(data => {
      let resp = data as any;
      this.visibleModalLocales = false;
      if (resp['code'] === "204") {
        this.showToast('No existen Movimientos registrados en esta fecha.!', 'info');
      } else {
        this.listaMovimientosLocales = resp['data'];
        console.log("listaMovimientosLocales ", this.listaMovimientosLocales);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.initCharts();
    this.inicializarSemanaActual();
    this.obtenerDatosMoviminetosUsuarios();
    this.obtenerDatosMoviminetosLocales();
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

  obtenerProgreso(venta:any){    
    if(venta == 0){
      return 0;
    }
    console.log(Number(venta-100));
    return Number(venta-100) > 0 ? 100 : Number(venta);
  }

  inicializarSemanaActual() {
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    const semanaActual = this.obtenerSemanaISO8601(fechaActual);

    this.semana = `${añoActual}-W${semanaActual}`;
  }

  obtenerSemanaISO8601(fecha: Date): number {
    const fechaTemp = new Date(fecha);
    fechaTemp.setHours(0, 0, 0, 0); // Establece la hora a las 00:00:00 para asegurar la precisión
    fechaTemp.setDate(fechaTemp.getDate() + 4 - (fechaTemp.getDay() + 6) % 7); // Ajusta al día jueves
    const año = fechaTemp.getFullYear();
    const primeraSemana = new Date(año, 0, 1);
  
    // Calcula la diferencia en milisegundos entre la fecha y el inicio del año
    const diferenciaEnMilisegundos = fechaTemp.getTime() - primeraSemana.getTime();
    // Convierte la diferencia en días
    const diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    // Calcula la semana
    const semana = Math.ceil((diferenciaEnDias + 1) / 7);
  
    return semana;
  }
  

  handleChangeUsuarios(event: any) {
    this.visibleModalUsuarios = event;
  }

  handleChangeLocales(event: any) {
    this.visibleModalLocales = event;
  }
}
