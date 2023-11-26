import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from "./../../models/usuario.model";
import { LocalModel } from "./../../models/local.model";
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../../views/pages/notify/notificar/notificar.component';
import { ViewChild  } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils';



export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

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
  public listaMovimientosAnual: any [] = [];
  public mainChart: IChartProps = {};
  public dataChart : any;

  public placement = ToasterPlacement.TopEnd;
  visibleModalUsuarios = false;
  visibleModalLocales = false;
  visibleModalAnual = false;

  today = new Date();
  fechaInicio: String = this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + (this.today.getDate()-7);
  fechaFin: String = this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
  semana: String = "";
  years: string[] = [];
  year = ""; 
  yearInicial = 2022;
  formularioValido: boolean = false;
  colores = ['info', 'danger', 'secondary', 'primary', 'success', 'warning', 'light', 'dark'];

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(public transaccionesService: TransaccionesService) {
  }

  public cargarDataAnual(){
    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = hexToRgba(brandInfo, 10);
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';

    const colors = [
      {
        // brandInfo
        backgroundColor: brandInfoBg,
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // brandSuccess
        backgroundColor: 'transparent',
        borderColor: brandSuccess || '#4dbd74',
        pointHoverBackgroundColor: '#fff'
      },
      {
        // brandDanger
        backgroundColor: 'transparent',
        borderColor: brandDanger || '#f86c6b',
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5]
      }
    ];

    let datasets = [];
    for (let local = 1; local <= this.listaMovimientosAnual.length; local++) {         
      datasets.push(
        {
          label: this.listaMovimientosAnual[local-1]['local'],
          data: this.listaMovimientosAnual[local-1]['meses'],
          pointBackgroundColor: colors[local-1].borderColor,
          pointBorderColor: '#fff',
        ...colors[local-1]
        }
      )      
    }

    this.dataChart = {
      labels: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ],
      datasets: datasets
    }
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      console.log('handleChartRef', $chartRef);
      setTimeout(() => {
        $chartRef?.update();
      }, 3000);
    }
  }

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

    this.transaccionesService.obtenerTransaccionesLocales(anio.toString(), (fechaSemana.getMonth() +1).toString(), semana.toString()).then(data => {
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

  obtenerDatosMoviminetosAnual() {
    this.listaMovimientosAnual = [];
    this.transaccionesService.obtenerTransaccionesAnual(this.year).then(data => {
      let resp = data as any;
      this.visibleModalAnual = false;
      if (resp['code'] === "204") {
        this.showToast('No existen Movimientos registrados en este año.!', 'info');
        this.listaMovimientosAnual = [];
      } else {
        console.log("listaMovimientosAnual ", resp['data']);
        this.listaMovimientosAnual = resp['data'];
      }
      this.cargarDataAnual();
    }).catch(error => {
      this.listaMovimientosAnual = [];      
      console.log(error);
      this.cargarDataAnual();
    });
  }
  
  async ngOnInit(): Promise<void> {
    this.obtenerAnios();
    this.obtenerDatosMoviminetosAnual();
    this.inicializarSemanaActual();
    this.obtenerDatosMoviminetosUsuarios();
    this.obtenerDatosMoviminetosLocales();

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

  obtenerAnios() {
    this.years = [];
    this.year = new Date().getFullYear().toString();
    
    for (let item = Number(this.yearInicial); item <= Number(this.year); item++) {
      this.years.push(item.toString());
    }
  }

  obtenerProgreso(venta:any){    
    if(venta == 0){
      return 0;
    }
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

  handleChangeAnual(event: any) {
    this.visibleModalAnual = event;
  }


}
