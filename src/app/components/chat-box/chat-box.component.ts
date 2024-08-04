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

  groupId: number = -1;
  userId: string = '2';
  groupName: string = "";
  message: string = '';
  //baseUrl: string = "https://localhost:44356";
  chats: ChatModel[] = [
  ];

  loadMoreMessage: boolean = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private groupService: GroupService, private messageService: MessageService, private toastrService: ToastrService, private hubService: HubService) {
  }

  ngOnInit() {
    this.groupId = parseInt(this.route.snapshot.paramMap.get('groupId') ?? '0');
    this.groupName = this.route.snapshot.paramMap.get('groupName') ?? "";
    this.userId = this.authService.getUserFromCookies();
    this.groupService.setGroupName(this.groupName);
    this.messageService.getMessages(this.userId, this.groupId, null, 10).subscribe((response) => {
      this.chats = response as ChatModel[];
      if ((response as ChatModel[]).length < 10) {
        this.loadMoreMessage = false;
      } else {
        this.loadMoreMessage = true;
      }

      this.hubService.startConnection(() => {
        this.hubService.getAddedToGroup(this.userId, this.groupId);
        this.hubService.getMessage$<[ChatModel]>('GroupMessage').subscribe(([chat]) => {
          this.chats = [chat, ...this.chats];
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

  loadMoreFromBack() {
    let messageId = this.chats[this.chats.length - 1].id;
    this.messageService.getMessages(this.userId, this.groupId, messageId, 10).subscribe((messages) => {
      let newMessages = messages as ChatModel[];
      this.chats = [...this.chats, ...newMessages];
      if (newMessages.length < 10) {
        this.loadMoreMessage = false;
      } else {
        this.loadMoreMessage = true;
      }
    });
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
