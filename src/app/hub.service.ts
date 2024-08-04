import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { SignalrClient, SignalrConnection } from 'ngx-signalr-websocket';
import { CreateMessageModel } from './models/create-message.model';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  private connection!: SignalrConnection;

  constructor(private httpClient: HttpClient, private toastrService: ToastrService) {

  }

  startConnection(func: Function) {
    const client = new SignalrClient(this.httpClient);
    client.connect("https://localhost:44356/chathub").subscribe({
      next: (con => {
        this.connection = con;
        func();
      }),
      error: (errorObj => {
        this.toastrService.error("Real-time connection failed");
        console.log(errorObj);
      })
    });
  }

  endConnection() {
    this.connection.close();
  }

  getMessage$<TArguments extends Array<unknown>>(functionName: string) {
    return this.connection.on<TArguments>(functionName);
  }

  getAddedToGroup(userId: string, groupId: number) {
    this.connection.send("AddToGroup", userId, groupId);
  }

  sendGroupMessage(userId: string, groupId: number, messageText: string) {
    let model: CreateMessageModel = {
      userId: userId,
      groupId: groupId,
      messageText: messageText
    }
    this.connection.send("GroupMessage", model);
  }
}
