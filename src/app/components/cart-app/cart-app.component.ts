import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reduces';
import { add, remove, total } from '../../store/items.actions';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{

  items: CartItem[] = [];

  constructor(
    private store: Store<{items: ItemsState}>,
    private router: Router,
    private shraringDataService: SharingDataService){
      this.store.select('items').subscribe(state =>{
        this.items = state.items;
        this.saveSession();
      })
    }

  ngOnInit(): void {
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart():void{
    this.shraringDataService.productEventEmitter.subscribe(product =>{
      this.store.dispatch(add({product}));
      this.store.dispatch(total());
      this.router.navigate(['/cart']);
      Swal.fire({
        title: "Shopping cart",
        text: "Nuevo producto agregado alcarro",
        icon: "success"
      });
    })




  }

  onDeleteCart():void{
    this.shraringDataService.idProductEventEmitter.subscribe(id=>{
      console.log(id + 'Se ha ejecutado el evento idProductEventEmitter')

      Swal.fire({
        title: "Esta seguro que desea eliminar",
        text: "Cuidado el item se eliminara del carro de compras",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          if(this.items.length == 0){
          sessionStorage.removeItem('cart');
          }
          this.store.dispatch(remove({id:id}));
          this.store.dispatch(total());
          this.router.navigate(['/cart']);

          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el item del carrito de compras",
            icon: "success"
          });
        }
      });


    })

  }

  saveSession():void{
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}
