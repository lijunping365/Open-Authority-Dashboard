export interface Spider {
  id: number;
  name: string;
  url: string;
  method: string;
  params: string;
  headers: string;
  content: string;
  createTime: Date;
  createUser: number;
}
