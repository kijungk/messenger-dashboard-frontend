import { Injectable } from '@angular/core';
import { Order } from '../classes/order';
import { Observable, interval } from 'rxjs';
import { flatMap, map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  ordersUrl: string = '/api/orders';

  constructor(private http: HttpClient) { }

  getOrders(permission: string, vendorId: number): Observable<Order[]> {
    let url;
    if (permission === 'superuser') {
      url = this.ordersUrl;
    }

    if (permission === 'vendor') {
      url = this.ordersUrl + `/vendors/${vendorId}`;
    }

    return interval(5000000).pipe(startWith(0)).pipe(flatMap(() => {
      return this.http.get<Order[]>(url)
        .pipe(map((response) => {
          response.forEach((order) => {
            const orderTime = order['created_at'];
            const orderId = order['id'];

            order['created_at'] = this.formatOrderTime(orderTime);
            order['id'] = this.formatOrderId(orderId)
            return;
          });

          return response;
        }))
    }));
  }

  processOrder(id) {
    return this.http.put(this.ordersUrl + `/${id}`, { orderStatusId: 2 });
  }

  completeOrder(id) {
    return this.http.put(this.ordersUrl + `/${id}`, { orderStatusId: 3 });
  }

  cancelOrder(id) {
    return this.http.delete(this.ordersUrl + `/${id}/cancel`);
  }

  formatOrderId(id) {
    return id.toString().padStart(4, '0');
  }

  formatOrderTime(timestamp) {
    let text;

    const minutes = 60 * 1000;

    const orderTime = new Date(timestamp);
    const orderTimeMilliseconds = orderTime.getTime();
    const currentTimeMilliseconds = new Date().getTime();
    const difference = currentTimeMilliseconds - orderTimeMilliseconds;

    const minutesAgo = Math.trunc(difference / minutes);

    if (minutesAgo === 0) {
      text = 'New Order'
    }

    if (minutesAgo === 1) {
      text = minutesAgo.toString() + ' minute'
    }

    if (minutesAgo > 1) {
      text = minutesAgo.toString() + ' minutes'
    }

    return text;
  }

  //cancelOrder(id)
  //completeOrder(id)
}
