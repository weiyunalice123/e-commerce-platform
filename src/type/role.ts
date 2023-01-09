interface RoleList {
  roleId: number;
  roleName: string;
  authority: number[];

}

export class roleListData {
  roleList: RoleList[] = []
  isShow = false
  addRoleData: RoleList = {
    roleId: 0,
    roleName: "",
    authority:[]
  }
}