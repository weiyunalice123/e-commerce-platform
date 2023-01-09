export interface AuthorityList {
  name: string;
  roleId: number;
  roleList?: AuthorityList[],
  viewRole?: string;
}
export class Authority {
  id: number;
  authority: number[];
  constructor(id: number, authority: number[]) {
    this.id = id;
    this.authority = authority;
  }
  authorityList:AuthorityList[] = []
  treeRef: any
}