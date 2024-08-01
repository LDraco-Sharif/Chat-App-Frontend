import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { CreateMessageModel } from '../models/create-message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getMessages(userId: string, groupId: number, startingId: number | null = null, quantity: number = 10) {
    let params = new HttpParams().set("userId", userId)
      .set("groupId", groupId)
      .set("quantity", quantity);
    if (startingId) {
      params = params.set("startingId", startingId);
    }
    return this.http.get(`${this.baseUrl}Messages`, { params });
  }

  postMessage(userId: string, groupId: number, messageText: string) {
    let model: CreateMessageModel = {
      userId: userId,
      groupId: groupId,
      messageText: messageText
    }
    return this.http.post(`${this.baseUrl}Messages`, model);
  }
}
