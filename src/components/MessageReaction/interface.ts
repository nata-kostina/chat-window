export interface IMessageReaction {
  messageId: string;
  reaction: { key: string; emoji: string };
  fromMe: boolean;
  removeReaction: (messageId: string) => void;
}
