import { IMessage } from "./../../types";
export interface IMessageBubble {
  message: IMessage;
  showSettings: (
    id: string,
    btnRef: React.MutableRefObject<HTMLButtonElement | null>
  ) => void;
  removeReaction: (id: string) => void;
}
