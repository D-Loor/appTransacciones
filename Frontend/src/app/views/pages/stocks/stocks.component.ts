import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../notify/notificar/notificar.component';
import { StocksService } from 'src/app/services/stocks.service';
import { StockModel } from 'src/app/models/stock.model';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  placement = ToasterPlacement.TopEnd;
  listaStocks: StockModel[] = [];


  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(public stockService: StocksService) {

  }

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.listaStocks = [];
    this.stockService.obtener().then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Stocks registrados.!', 'info');
      } else {
        this.listaStocks = resp['data'];
        console.log("lista ", this.listaStocks);
      }
    }).catch(error => {
      console.log(error);
    });
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