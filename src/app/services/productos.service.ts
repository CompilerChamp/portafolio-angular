import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando: boolean = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) { 

    this.cargarProductos();

  }

  private cargarProductos(){

    return new Promise<void>( (resolve, reject) => {
      this.http.get('https://angular-html-5cbf2-default-rtdb.firebaseio.com/productos_idx.json').subscribe( (resp: Producto[] | any) => {
      // console.log(resp);
      this.productos = resp;
      this.cargando = false;
      resolve();
      });
    });

  }

  getProducto( id: string ){

    return this.http.get(`https://angular-html-5cbf2-default-rtdb.firebaseio.com/productos/${ id }.json`);

  }

  buscarProducto( termino: string ){

    if( this.productos.length === 0 ){
      // Cargar productos
      this.cargarProductos().then( () => {
        // Ejecutar después de tener los productos
        // Aplicar filtro
        this.filtrarProductos( termino );
      });
    } else {
      // Aplicar el filtro
      this.filtrarProductos( termino );
    }

  }

  private filtrarProductos( termino: string ){

    // console.log( this.productos );
    this.productosFiltrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){
        this.productosFiltrado.push( prod );
      }

    });

  }
}