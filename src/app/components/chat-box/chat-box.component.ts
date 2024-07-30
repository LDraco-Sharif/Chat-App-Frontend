import { ChatModel } from './../../models/chat.model';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from "../message-box/message-box.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, MessageBoxComponent, MatInputModule, MatFormFieldModule, FormsModule, MatButton],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {

  groupId: number = 2;
  userId: number = 2;
  message: string = '';
  chats: ChatModel[] = [
    {
      groupId: 2,
      messegerId: 1,
      messegerName: 'Kawshik',
      message: "Hi"
    },
    {
      groupId: 2,
      messegerId: 2,
      messegerName: 'Sharif',
      message: "Hello"
    },
    {
      groupId: 2,
      messegerId: 3,
      messegerName: 'Shatil',
      message: "Sup"
    },
    {
      groupId: 2,
      messegerId: 2,
      messegerName: 'Sharif',
      message: "ki khobor?"
    },
    {
      groupId: 2,
      messegerId: 4,
      messegerName: 'Memio',
      message: "Apnara koi?"
    },
    {
      groupId: 2,
      messegerId: 5,
      messegerName: 'Unknown',
      message: "Hey"
    },
    {
      groupId: 2,
      messegerId: 2,
      messegerName: 'Sharif',
      message: "Nai"
    }
  ];

  isMessageFromUser(messegerId: number) {
    return this.userId == messegerId
  }

  addMessage() {
    let newChat: ChatModel = {
      groupId: 2,
      messegerId: 2,
      messegerName: 'Sharif',
      message: this.message
    }
    this.chats = [...this.chats, newChat];
    this.message = '';
  }
}
