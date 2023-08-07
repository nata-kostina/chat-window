export interface IMessage {
  readonly id: string;
  body: string;
  date: number;
  author: string;
  fromMe: boolean;
  reaction?: {
    key: string;
    emoji: string;
  };
}

export interface Rect {
  top: number;
  left: number;
  right: number;
  bottom: number;
}
