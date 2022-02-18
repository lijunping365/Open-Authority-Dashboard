export interface Spider {
  id: number;
  name: string;
  url: string;
  method: string;
  headers: string;
  charset: string;
  retry: number;
  timeout: number;
  acceptStatCode: string;
  spiderType: number;
  spiderData: string;
  createTime: Date;
  createUser: number;
}
