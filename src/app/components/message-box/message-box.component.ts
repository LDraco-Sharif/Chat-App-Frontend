import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.css'
})
export class MessageBoxComponent {
  @Input() name: string = "";
  @Input() message: string = "";
  @Input() isUser: boolean = true;
}
