import { Component, OnInit } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {delay} from 'rxjs/operators'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:7000');

  constructor() {
    this.myWebSocket.subscribe(
      msg => (document.getElementById('textarea') as HTMLTextAreaElement).value = JSON.stringify(msg["other info"]),
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
    const text = (document.getElementById('textarea') as HTMLTextAreaElement).value;
    console.log(text)
    this.myWebSocket.next({"id": "new_doc", "other_info": text});
  } 

  getMessageFromServer() { 
    this.myWebSocket.next({id: "search", "other_info": "text"}); 
    console.log("Retrieving");
    // (document.getElementById('textExample') as HTMLTextAreaElement).value = "testing";
  }
 
  autosaveContent() { 
    console.log("Updating"); 
    
    const text = (document.getElementById('textarea') as HTMLTextAreaElement).value;
    this.myWebSocket.next({id: "update", "other_info": text}); 
    delay(500);
    
  }

}

