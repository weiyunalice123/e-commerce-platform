export interface list {
    userId: number;
    introduce: string;
    id: number;
    title: string;
}
interface SearchData {
    title: string;
    introduce: string;
    page: number;
    count: number;
    pageSize: number;
}
export class initData {
    searchData: SearchData = {
        title: '',
        introduce: '',
        page: 1,
        count: 0,//数据总条数
        pageSize: 5
    }
    listData: list[] = []
}