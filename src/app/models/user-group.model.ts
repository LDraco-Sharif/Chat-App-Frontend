export interface UserGroup {
  user: User
  groupName: string;
}

interface User {
  userName: string;
  password: string;
}
