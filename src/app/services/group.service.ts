import { UserGroup } from './../models/user-group.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baseUrl: string = environment.baseUrl;
  private groupNameSubject: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) { }

  enterGroup(userName: string, password: string, groupName: string) {
    let model: UserGroup = {
      user: {
        userName: userName,
        password: password
      },
      groupName: groupName
    };
    return this.http.post(`${this.baseUrl}Groups/enter-group`, model);
  }

  createGroup(userName: string, password: string, groupName: string) {
    let model: UserGroup = {
      user: {
        userName: userName,
        password: password
      },
      groupName: groupName
    };
    return this.http.post(`${this.baseUrl}Groups/create-group`, model);
  }

  $groupName() {
    return this.groupNameSubject.asObservable();
  }

  setGroupName(value: string) {
    this.groupNameSubject.next(value);
  }
}
