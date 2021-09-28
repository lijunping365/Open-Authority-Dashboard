export interface Spider {
  id: number;
  name: string;
  url: string;
  method: number;
  headers: string;
  charset: number;
  retry: number;
  timeout: number;
  acceptStatCode: string;
  spiderType: number;
  spiderData: string;
  createTime: Date;
  createUser: number;
}
