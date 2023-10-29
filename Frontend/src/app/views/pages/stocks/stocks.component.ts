import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../notify/notificar/notificar.component';
import { StocksService } from 'src/app/services/stocks.service';
import { StockModel } from 'src/app/models/stock.model';
import { LocalModel } from 'src/app/models/local.model';
import { LocalesService } from 'src/app/services/locales.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  placement = ToasterPlacement.TopEnd;
  visibleModalBusqueda = false;  
  formularioValido: boolean = false;
  listaStocks: StockModel[] = [];  
  listaLocales: LocalModel[] = [];
  nombreProducto: String = "";
  localSeleccionado: String = "*";
  pagina: number = 1;
  totalPaginas: number = 1;
  itemsPaginado: number = 1;


  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(public stockService: StocksService, public localService: LocalesService) {

  }

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.obtenerDatosLocales();
    this.listaStocks = [];
    let nombre = this.nombreProducto.toString();
    if(this.nombreProducto === "" || this.nombreProducto === undefined || this.nombreProducto === null){
      nombre = "*";
    }
    this.stockService.obtener(nombre, this.localSeleccionado, this.itemsPaginado, this.pagina).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Stocks registrados.!', 'info');
      } else {
        this.totalPaginas = Number(resp['data']['last_page']);
        this.listaStocks = resp['data']['data'];
        console.log("lista ", this.listaStocks);
        this.visibleModalBusqueda = false;
      }
    }).catch(error => {
      console.log(error);
    });
  }

  obtenerDatosLocales() {
    this.listaLocales = [];
    this.localService.obtener("1", 1000, 1).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Locales registrados.!', 'info');
      } else {
        this.listaLocales = resp['data']['data'];
        console.log("listaLocales ", this.listaLocales);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  limpiarFormulario(){
    this.localSeleccionado = "*";
    this.nombreProducto = "";
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

  handleChangeBusqueda(event: any) {
    this.visibleModalBusqueda = event;
  }
}