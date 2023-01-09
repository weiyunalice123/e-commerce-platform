export interface UserList {
  id: number;
  nickName: string;
  username: string;
  role: Role[];
}
export interface Role {
  role: number;
  roleName: string; 
}
export interface SearchUserData {
  role: number;
  nickName: string;
}
export interface RoleList {
  outhority: number[];
  roleId: number;
  roleName: string;
}
interface Active {
  id: number;
  nickName: string;
  username: string;
  role: number[];
}
export class userListData {
  userList: UserList[] = []
  searchUserData: SearchUserData = {
    role: 0,
    nickName: ''
  }
  roleList: RoleList[] = []
  isShow: boolean =  false
  active: Active = {
    id: 0,
    nickName: '',
    username: '',
    role: []
  }
}