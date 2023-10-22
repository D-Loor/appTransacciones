import { Injectable } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils';
import { TransaccionesService } from 'src/app/services/transacciones.service';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
  providedIn: 'any'
})
export class DashboardChartsData {
  constructor(public transaccionesService: TransaccionesService) {
    //this.initMainChart();
  }

  public mainChart: IChartProps = {};
  listaMovimientosAnual: any []= [];

  async obtenerDatosMoviminetosAnual(year: String = new Date().getFullYear().toString()): Promise<void> {
    return new Promise<void>(async (resolve) => {
      try {
        await this.transaccionesService.obtenerTransaccionesAnual(year).then(data => {
          let resp = data as any;
          debugger
          if (resp['code'] === "200") {
            console.log("listaMovimientosAnual ", resp['data']);
            this.listaMovimientosAnual = resp['data'];
          }else {
            this.listaMovimientosAnual = [];
          }
        }).catch(error => {
          console.log(error);
          this.listaMovimientosAnual = [];
        });
        resolve();
      } catch (error) {
        console.error(error);
        resolve();
      }
    });
  }
  

  async initMainChart(year: String = new Date().getFullYear().toString()) {
    
    try {

      await this.transaccionesService.obtenerTransaccionesAnual(year).then(data => {
        let resp = data as any;
        
        if (resp['code'] === "200") {
          console.log("listaMovimientosAnual ", resp['data']);
          this.listaMovimientosAnual = resp['data'];
        }else {
          this.listaMovimientosAnual = [];
        }
      }).catch(error => {
        console.log(error);
        this.listaMovimientosAnual = [];
      });

      const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
      const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
      const brandInfoBg = hexToRgba(brandInfo, 10);
      const brandDanger = getStyle('--cui-danger') || '#f86c6b';

      let labels: string[] = [];
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

      const datasets = [];

      this.mainChart['elements'] = 12;
      
      for (let local = 1; local <= this.listaMovimientosAnual.length; local++) {
        this.mainChart[`Data${local}`] = [];
        
        for (let mes = 0; mes < this.mainChart['elements']; mes++) {
          this.mainChart[`Data${local}`].push(this.listaMovimientosAnual[local-1]['meses'][mes]);
        }

        datasets.push(
          {
            data: this.mainChart[`Data${local}`],
          label: this.listaMovimientosAnual[local-1]['local'],
          ...colors[local-1]
          }
        )
      }

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

    } catch (error) {
      console.error("Ocurrió un error durante la inicialización asincrónica:", error);
    }
  }
}
