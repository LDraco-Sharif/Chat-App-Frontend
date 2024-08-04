import { HubService } from './../../hub.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from './../../services/message.service';
import { GroupService } from './../../services/group.service';
import { AuthService } from './../../services/auth.service';
import { ChatModel } from './../../models/chat.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from "../message-box/message-box.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, MessageBoxComponent, MatInputModule, MatFormFieldModule, FormsModule, MatButton],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent implements OnInit, OnDestroy {

  groupId: number = 2;
  userId: string = '2';
  groupName: string = "";
  message: string = '';
  //baseUrl: string = "https://localhost:44356";
  chats: ChatModel[] = [
  ];

  loadMessage: boolean = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private groupService: GroupService, private messageService: MessageService, private toastrService: ToastrService, private hubService: HubService) {
  }

  async ngOnInit() {
    this.groupId = parseInt(this.route.snapshot.paramMap.get('groupId') ?? '0');
    this.groupName = this.route.snapshot.paramMap.get('groupName') ?? "";
    this.userId = this.authService.getUserFromCookies();
    this.groupService.setGroupName(this.groupName);
    this.messageService.getMessages(this.userId, this.groupId, null).subscribe((response) => {
      this.chats = response as ChatModel[];
      this.hubService.startConnection(() => {
        this.hubService.getAddedToGroup(this.userId, this.groupId);
        this.hubService.getMessage$<[string, string]>('GroupMessage').subscribe(([user, message]) => {
          let newMessage: ChatModel = {
            groupId: 1,
            userId: user,
            userName: user,
            messageText: message
          };
          this.chats = [newMessage as ChatModel, ...this.chats];
        });
      });


      this.hubService.getMessage$<[string]>('StartMessage').subscribe(([message]) => {
        this.toastrService.success(message);
      });
    });
  }

  ngOnDestroy(): void {
    this.hubService.endConnection();
  }

  sendMessage() {
    this.hubService.sendGroupMessage(this.userId, this.groupId, this.message);
    this.message = '';
  }

  isMessageFromUser(messegerId: string) {
    return this.userId == messegerId;
  }

  // addMessage() {
  //   this.messageService.postMessage(this.userId, this.groupId, this.message).subscribe({
  //     next: (response) => {
  //       this.chats = [response as ChatModel, ...this.chats];
  //     },
  //     error: errorObj => {
  //       this.toastrService.error(errorObj.error.message);
  //     }
  //   })
  //   this.message = '';
  //   // this.chats = [...this.chats, newChat];
  // }
}
