import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { UsuarioModel } from "./../../models/usuario.model";
import { LocalModel } from "./../../models/local.model";
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../../views/pages/notify/notificar/notificar.component';
import { ViewChild  } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils';


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
  public mainChart2: IChartProps = {};

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

  initMainChart(period: string = 'Month') {
    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = hexToRgba(brandInfo, 10);
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';

    this.mainChart['elements'] = 12;
    this.mainChart['Data1'] = [];
    this.mainChart['Data2'] = [];
    this.mainChart['Data3'] = [];

    // generate random values for mainChart
    for (let i = 0; i <= this.mainChart['elements']; i++) {
      this.mainChart['Data1'].push(0);
      this.mainChart['Data2'].push(0);
      this.mainChart['Data3'].push(65);
    }

    let labels: string[] = [];
    if (period === 'Month') {
      labels = [
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
      ];
    } 

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

    const datasets = [
      {
        data: this.mainChart['Data1'],
        label: 'Current',
        ...colors[0]
      },
      {
        data: this.mainChart['Data2'],
        label: 'Previous',
        ...colors[1]
      },
      {
        data: this.mainChart['Data3'],
        label: 'BEP',
        ...colors[2]
      }
    ];

    const plugins = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: function(context: any) {
            return {
              backgroundColor: context.dataset.borderColor
            };
          }
        }
      }
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          beginAtZero: true,
          max: 250,
          ticks: {
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5)
          }
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels
    };
  }
}
