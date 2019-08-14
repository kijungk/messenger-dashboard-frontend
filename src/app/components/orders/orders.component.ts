import { Component, OnInit } from '@angular/core';
import { Order } from '../../classes/order';
import { User } from '../../classes/user';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { OrdersService } from '../../services/orders.service';
import { ModalsService } from '../../services/modals.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  id: string; //vendorId

  incomingOrders: Observable<Order[]>;
  processedOrders: Observable<Order[]>;
  completedOrders: Observable<Order[]>;

  orders: Observable<Order[]>;
  administrator: User;

  constructor(
    private modalsService: ModalsService,
    private ordersService: OrdersService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.administrator = this.userService.administrator;
    this.getOrders();
  }

  close(event) {
    event.preventDefault();

    this.modalsService.toggleModal('orders');

    return;
  }

  getOrders() {
    this.orders = this.ordersService.getOrders(this.administrator.permission, this.administrator.vendor_id);

    this.incomingOrders = this.orders.pipe(map((orders) => {
      return orders.filter((order) => {
        return order.order_status_id === 1;
      });
    }));

    this.processedOrders = this.orders.pipe(map((orders) => {
      return orders.filter((order) => {
        return order.order_status_id === 2;
      });
    }));

    this.completedOrders = this.orders.pipe(map((orders) => {
      return orders.filter((order) => {
        return order.order_status_id === 3;
      });
    }));
  }

  processOrderHandler(event) {
    const orderId = Number(event.target.parentElement.firstChild.firstChild.textContent);
    return this.ordersService.processOrder(orderId).subscribe(
      (response) => {
        if (response['success']) {
          console.log('Order successfully completed. User has been notified');
          this.getOrders();
        };
      },
      (error) => {
        console.log(error);
        return;
      }
    )
  }

  completeOrderHandler(event) {
    const orderId = Number(event.target.parentElement.firstChild.firstChild.textContent);
    return this.ordersService.completeOrder(orderId).subscribe(
      (response) => {
        if (response['success']) {
          console.log('Order successfully completed. User has been notified');
          this.getOrders();
        };
      },
      (error) => {
        console.log(error);
        return;
      }
    )
  }

  cancelOrderHandler(event) {
    const orderId = Number(event.target.parentElement.firstChild.firstChild.textContent);
    return this.ordersService.cancelOrder(orderId).subscribe(
      (response) => {
        if (response['success']) {
          console.log('Order successfully cancelled. User has been notified');
          this.getOrders();
        };
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
