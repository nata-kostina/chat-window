export interface IMessage {
    readonly id: string;
    body: string;
    date: number;
    author: string;
    fromMe: boolean;
    reaction?: string;
  }
  
  
