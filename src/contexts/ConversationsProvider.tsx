import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IMessage } from "./../types";
import { v4 as uuid } from "uuid";

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
  const [conversation, setConversation] = useState<IMessage[]>([
    {
      id: "12d3",
      author: "Silwia Spencer",
      body: "1111111111",
      date: Date.now(),
      fromMe: false,
    },
    {
      id: "23er4",
      author: "Me",
      body: "2222222",
      date: Date.now(),
      fromMe: true,
    },
    {
      id: "1sc2er3",
      author: "Silwia Spencer",
      body: "3333333",
      date: Date.now(),
      fromMe: false,
    },
    {
      id: "23g4",
      author: "Me",
      body: "444444444",
      date: Date.now(),
      fromMe: true,
    },
    {
      id: "12r3",
      author: "Silwia Spencer",
      body: "55555555555",
      date: Date.now(),
      fromMe: false,
    },
    {
      id: "2334",
      author: "Me",
      body: "66666666666",
      date: Date.now(),
      fromMe: true,
    },
    {
      id: "12erk3",
      author: "Silwia Spencer",
      body: "777777777",
      date: Date.now(),
      fromMe: false,
    },
    {
      id: "2t34",
      author: "Me",
      body: "88888888",
      date: Date.now(),
      fromMe: true,
    },
    {
      id: "12er3",
      author: "Silwia Spencer",
      body: "99999999999",
      date: Date.now(),
      fromMe: false,
    },
    {
      id: "23h4",
      author: "Me",
      body: "",
      date: Date.now(),
      fromMe: true,
    },
  ]);

  const addMessageToConversation = (message: IMessage) => {
    console.log(message);
    setConversation((prevConversation) => [...prevConversation, message]);
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
    //       const newMessage = generateMessage();
    //   addMessageToConversation(newMessage);
    //       const newMessage2 = generateMessage();
    //   addMessageToConversation(newMessage2);
    // const interval = setInterval(() => {
    //   const newMessage = generateMessage();
    //   addMessageToConversation(newMessage);
    // }, 9000);
    // return () => {
    //   clearInterval(interval);
    // };
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
