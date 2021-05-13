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
      msg => (document.getElementById('textExample') as HTMLTextAreaElement).value = JSON.stringify(msg["other info"]),
      // console.log('message received: ' + JSON.stringify(msg)),
      // Called whenever there is a message from the server
      err => console.log(err),
      // Called if WebSocket API signals some kind of error
      () => console.log('complete')
      // Called when connection is closed (for whatever reason)
   );
   
  }

 
  sendMessageToServer() {
    console.log("Clicked");
    const text = (document.getElementById('textExample') as HTMLTextAreaElement).value;
    console.log(text)
    this.myWebSocket.next(text);
  } 

  getMessageFromServer() { 
    this.myWebSocket.next({id: "search"}); 
    console.log("Retrieving");
    (document.getElementById('textExample') as HTMLTextAreaElement).value = "testing";
  }

  autosaveContent() { 
    
  }

//   private  autoSaveContent() {
//     setInterval(() => {
//         if (this.isSaving == false && this.hasContentChanged() == true) {
//             this.saveContent();
//         }
//     }, 10000);
// }


}