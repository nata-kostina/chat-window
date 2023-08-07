import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IMessage } from "./../types";
import { v4 as uuid } from "uuid";
import { generateMessage } from "../tools";
import Sound from "../assets/sound.mp3";

export interface IConversationsContext {
  conversation: IMessage[];
  sendMessage: (message: string) => void;
  deleteMessageFromConversation: (messageId: string) => void;
  editMessage: (message: IMessage) => void;
}

const ConversationsContext = createContext<IConversationsContext | null>(null);

export function useConversations() {
  return useContext(ConversationsContext);
}

interface ConversationsProviderProps {
  children: ReactNode;
}

export const ConversationsProvider = ({
  children,
}: ConversationsProviderProps) => {
  const [conversation, setConversation] = useState<IMessage[]>([]);

  const addMessageToConversation = async (message: IMessage) => {
    setConversation((prevConversation) => [...prevConversation, message]);
    const audio = new Audio(Sound);
    audio.play().catch(() => {});
  };
  const deleteMessageFromConversation = (messageId: string) => {
    const filteredMessages = conversation.filter(
      (message) => message.id !== messageId
    );
    setConversation(filteredMessages);
  };
  const sendMessage = (message: string) => {
    const newMessage: IMessage = {
      id: uuid(),
      body: message,
      date: Date.now(),
      fromMe: true,
      author: "me",
    };
    addMessageToConversation(newMessage);
  };

  const editMessage = (updatedMessage: IMessage) => {
    const updatedConversation = conversation.map((message) =>
      message.id === updatedMessage.id ? updatedMessage : message
    );
    setConversation(updatedConversation);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = generateMessage();
      addMessageToConversation(newMessage);
    }, 8000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ConversationsContext.Provider
      value={{
        conversation,
        sendMessage,
        deleteMessageFromConversation,
        editMessage,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
