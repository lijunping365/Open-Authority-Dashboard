export interface Spider {
  id: number;
  name: string;
  url: string;
  method: string;
  params: string;
  headers: string;
  rootPath: string;
  targetType: string;
  topicName: string;
  createTime: Date;
  createUser: number;
}