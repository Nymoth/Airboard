import { Observable } from 'rxjs/Observable';

export interface Connection {
  connect(string): void;
  getStream(): Observable<any>;
  sendMessage(string): void;
  getConnectionStatus(): Observable<string>;
}
