import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../notify/notificar/notificar.component';
import { CategoriasService } from 'src/app/services/categorias.service';
import { TiposService } from 'src/app/services/tipos.service';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { TipoModel } from 'src/app/models/tipo.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  confirmarPass: any;
  tituloModal = "";  
  nombreCategoria: String = "";
  visibleModal = false;
  visibleModalBusqueda = false;
  visibleModalConfirmacion = false;
  formularioValido: boolean = false;
  placement = ToasterPlacement.TopEnd;
  listaCategorias: CategoriaModel[] = [];
  listaTipos: TipoModel[] = [];
  categoria: CategoriaModel = new CategoriaModel;
  pagina: number = 1;
  totalPaginas: number = 1;
  itemsPaginado: number = 1;

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(public categoriaService: CategoriasService, public tipoService: TiposService) {

  }

  ngOnInit() {
    this.tituloModal = "Agregar";
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.listaCategorias = [];
    let nombre = this.nombreCategoria.toString();
    if(this.nombreCategoria === "" || this.nombreCategoria === undefined || this.nombreCategoria === null){
      nombre = "*";
    }
    this.categoriaService.obtener(nombre, "*", this.itemsPaginado, this.pagina).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Categorías registradas.!', 'info');
      } else {
        this.totalPaginas = Number(resp['data']['last_page']);
        this.listaCategorias = resp['data']['data'];
        console.log("lista ", this.listaCategorias);
        this.visibleModalBusqueda = false;
      }
    }).catch(error => {
      console.log(error);
    });
  }

  registrarDatos() {
    this.categoriaService.guardar(this.categoria).then(data => {
      let resp = data as any;
      if (resp['code'] == '400') {
        this.showToast("Ya existe una categoría con este nombre.", "warning");
      } else if (resp['code'] == '200') {
        this.showToast("La categoría se ha creado correctamente.", "success");
        this.obtenerDatos();
        this.limpiarFormulario();
        this.visibleModal = false;
      } else {
        this.showToast("Se ha presentado un error al guardar.", "danger");
      }
    }).catch(error => {
      console.log(error);
    });
  }

  eliminarDato() {
    this.categoriaService.eliminar(this.categoria.idCategoria || 0).then(data => {
      let resp = data as any;
      if (resp['code'] == '204') {
        this.showToast("No existe esta categoría.", "warning");
      } else if (resp['code'] == '200') {
        this.visibleModalConfirmacion = false;
        this.showToast("La categoría se ha eliminado correctamente.", "success");
        this.obtenerDatos();
      } else {
        this.showToast("Se ha presentado un error al eliminar.", "danger");
      }
    }).catch(error => {
      console.log(error);
    });
  }

  cargarDatos(datosModal: CategoriaModel) {
    this.tituloModal = "Editar";
    this.categoria = { ...datosModal };
    this.visibleModal = true;
  }

  editarDato() {
    this.categoriaService.editar(this.categoria).then(data => {
      let resp = data as any;
      if (resp['code'] == '400') {
        this.showToast("Ya existe una categoría con este nombre.", "warning");
      } else if (resp['code'] == '200') {
        this.showToast("La categoría se ha editado correctamente.", "success");
        this.obtenerDatos();
        this.limpiarFormulario();
        this.visibleModal = false;
      } else {
        this.showToast("Se ha presentado un error al editar.", "danger");
      }
    }).catch(error => {
      console.log(error);
    });
  }

  limpiarFormulario() {
    this.categoria.idCategoria = undefined
    this.categoria.categoria = undefined;
    this.categoria.descripcion = undefined;
    this.categoria.estado = undefined;
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

  limpiarFormularioBusqueda(){
    this.nombreCategoria = "";
  }

  handleLiveDemoChange(event: any) {
    this.visibleModal = event;
  }

  handleChangeConfirmacion(event: any) {
    this.visibleModalConfirmacion = event;
  }

  handleChangeBusqueda(event: any) {
    this.visibleModalBusqueda = event;
  }
  
}
