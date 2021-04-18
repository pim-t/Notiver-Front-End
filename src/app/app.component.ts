import { Component } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:7000');

  constructor() {
    this.myWebSocket.subscribe(
      msg => console.log('message received: ' + msg),
      // Called whenever there is a message from the server
      err => console.log(err),
      // Called if WebSocket API signals some kind of error
      () => console.log('complete')
      // Called when connection is closed (for whatever reason)
   );
  }

  sendMessageToServer() {
    console.log("Clicked")

    const text = (document.getElementById('textExample') as HTMLTextAreaElement).value;
    console.log(text)
    this.myWebSocket.next({message: text});
  }

}