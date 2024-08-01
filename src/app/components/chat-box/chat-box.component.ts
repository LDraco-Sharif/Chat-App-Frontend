import { ToastrService } from 'ngx-toastr';
import { MessageService } from './../../services/message.service';
import { GroupService } from './../../services/group.service';
import { AuthService } from './../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ChatModel } from './../../models/chat.model';
import { Component, OnInit } from '@angular/core';
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
export class ChatBoxComponent implements OnInit {

  groupId: number = 2;
  userId: string = '2';
  groupName: string = "Lololol";
  message: string = '';
  chats: ChatModel[] = [
    // {
    //   groupId: 2,
    //   messegerId: 1,
    //   messegerName: 'Kawshik',
    //   message: "Hi"
    // },
    // {
    //   groupId: 2,
    //   messegerId: 2,
    //   messegerName: 'Sharif',
    //   message: "Hello"
    // },
    // {
    //   groupId: 2,
    //   messegerId: 3,
    //   messegerName: 'Shatil',
    //   message: "Sup"
    // },
    // {
    //   groupId: 2,
    //   messegerId: 2,
    //   messegerName: 'Sharif',
    //   message: "ki khobor?"
    // },
    // {
    //   groupId: 2,
    //   messegerId: 4,
    //   messegerName: 'Memio',
    //   message: "Apnara koi?"
    // },
    // {
    //   groupId: 2,
    //   messegerId: 5,
    //   messegerName: 'Unknown',
    //   message: "Hey"
    // },
    // {
    //   groupId: 2,
    //   messegerId: 2,
    //   messegerName: 'Sharif',
    //   message: "Nai"
    // }
  ];

  constructor(private route: ActivatedRoute, private authService: AuthService, private groupService: GroupService, private messageService: MessageService, private toastrService: ToastrService) {
  }
  ngOnInit(): void {
    this.groupId = parseInt(this.route.snapshot.paramMap.get('groupId') ?? '0');
    this.groupName = this.route.snapshot.paramMap.get('groupName') ?? "";
    this.userId = this.authService.getUserFromCookies();
    this.groupService.setGroupName(this.groupName);
    this.messageService.getMessages(this.userId, this.groupId, null).subscribe((response) => {
      this.chats = response as ChatModel[];
    });
  }

  isMessageFromUser(messegerId: string) {
    return this.userId == messegerId
  }

  addMessage() {
    this.messageService.postMessage(this.userId, this.groupId, this.message).subscribe({
      next: (response) => {
        this.chats = [...this.chats, response as ChatModel];
      },
      error: errorObj => {
        this.toastrService.error(errorObj.error.message);
      }
    })
    this.message = '';
    // this.chats = [...this.chats, newChat];
  }
}
