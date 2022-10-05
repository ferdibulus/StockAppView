import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Router} from '@angular/router';
 
export interface SubscriptionModel {
  stompSub?: Stomp.Subscription;
  subject: Subject<Stomp.Message>;
  subscriberCount: number;
}
 
@Injectable({
  providedIn: 'root'
})
export class RmStompServiceService {
  private stompClient: Stomp.Client | null = null;
  private url = 'http://92.205.30.150:8181/appWebSocket';
  private connectionSubject: Subject<Stomp.Client | null> = new Subject();
 
  private subscriptions: Map<string, SubscriptionModel> = new Map<string, SubscriptionModel>();
  connectionStatusChange: Subject<boolean> = new Subject<boolean>();
  private cscPreviousValue: boolean | undefined = undefined;
 
  constructor(private router: Router) {
 
    this.connect();
    this.resubscribe(); // task
    this.connectionSubject.subscribe(value => {
      if (value) {
        if (!this.cscPreviousValue) {
          this.connectionStatusChange.next(true);
          this.cscPreviousValue = true;
        }
      } else {
        if (this.cscPreviousValue !== false) {
          this.connectionStatusChange.next(false);
          this.cscPreviousValue = false;
        }
      }
    });
  }
 
  connect(): void {
    if (this.stompClient?.connected) {
      return;
    }
    const socket: WebSocket = new SockJS(this.url);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect(() => {
 
      const interval = setInterval(() => {
        if (this.stompClient?.connected) {
          this.connectionSubject.next(this.stompClient);
          clearInterval(interval);
        }
      }, 1000);
 
    }, (error) => {
      console.log(error);
    });
  }
 
  consume(destination: string): Observable<any> {
    const model = this.subscriptions.get(destination);
    if (model?.subject) {
      model.subscriberCount++;
      return model?.subject;
    } else {
      this.subscriptions.set(destination, {subject: new Subject<Stomp.Message>(), subscriberCount: 0});
    }
    return this.consume(destination);
  }
 
  unsubscribe(destination: string): void {
    const model = this.subscriptions.get(destination);
    if (model) {
      model.subscriberCount--;
      if (model.subscriberCount <= 0) {
        if (model.stompSub) {
          model.stompSub.unsubscribe();
          this.subscriptions.delete(destination);
        }
        console.log('Destination ' + destination + ' unsubscribed from socket');
      }
    }
  }
 
  resubscribe(): void {
    const interval = setInterval(() => {
      this.subscriptions.forEach((value, destination) => {
        if (this.stompClient?.connected && !value.stompSub && value.subscriberCount > 0) {
          console.log('Subscribing to destination ' + destination);
          // @ts-ignore
          this.subscriptions.get(destination).stompSub = this.stompClient.subscribe(destination, (data: Stomp.Message) => {
            try {
              // @ts-ignore
              this.subscriptions.get(destination).subject.next(JSON.parse(data.body));
              data.ack();
            } catch (error) {
              data.nack();
            }
          }, {ack: 'client'});
        }
      });
    }, 1000);
 
  }
 
  retry(retryCount: number, interval: number): void {
    // @ts-ignore
    const intervalFnc = setInterval(() => {
      if (!this.stompClient?.connected && retryCount > 0) {
        this.connect();
        retryCount--;
      } else {
        clearInterval(intervalFnc);
      }
    }, interval);
  }
 
  reconnect():void{
    this.connect();
  }
}
 
