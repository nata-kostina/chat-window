import { FC, useCallback, useState } from "react";
import {
  IConversationsContext,
  useConversations,
} from "../../contexts/ConversationsProvider";
import st from "./messagesPanel.module.scss";
import { MessageBubble } from "./../MessageBubble/MessageBubble";
import { SettingsModal } from "./../SettingsModal/SettingsModal";
export const MessagePanel: FC = () => {
  const { conversation, deleteMessageFromConversation, editMessage } =
    useConversations() as IConversationsContext;
  const setRef = useCallback((node: HTMLLIElement | null) => {
    if (node) {
      console.log(node);
      node.scrollIntoView(true);
    }
  }, []);
  const [areSettingsVisible, setAreSettingsVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const [selectedMessageRect, setSelectedMessageRect] = useState<{
    top: number;
    left: number;
    right: number;
    bottom: number;
  } | null>(null);

  const showSettings = (
    id: string,
    btnRef: React.MutableRefObject<HTMLButtonElement | null>
  ) => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setSelectedMessageRect({
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
      });
      setSelectedMessageId(id);
      setAreSettingsVisible(true);
    }
  };

  const hideSettings = () => {
    setAreSettingsVisible(false);
  };

  const handleCopy = () => {
    const message = conversation.find(
      (message) => message.id === selectedMessageId
    );
    if (message) {
      navigator.clipboard.writeText(message.body);
    }
    hideSettings();
  };

  const handleDelete = () => {
    if (selectedMessageId) {
      deleteMessageFromConversation(selectedMessageId);
    }
    hideSettings();
  };

  const toggleReaction = (reaction: string) => {
    const message = conversation.find(
      (message) => message.id === selectedMessageId
    );
    if (message) {
      const updatedMessage = { ...message, reaction };
      editMessage(updatedMessage);
    }
    hideSettings();
  };

  const removeReaction = (messageId: string) => {
    const message = conversation.find((message) => message.id === messageId);
    if (message) {
      delete message.reaction;
      editMessage(message);
    }
  };
  return (
    <>
      <main className={st.panel}>
        <div className={st.panel__inner}>
          <ul className={st["message-list"]}>
            {conversation.map((message, index) => {
              const lastMessage = conversation.length - 1 === index;
              return (
                <li
                  ref={lastMessage ? setRef : null}
                  key={message.id}
                  className={st["message-list__item"]}
                  style={{ paddingTop: index === 0 ? "4.5rem" : "" }}
                >
                  <MessageBubble
                    message={message}
                    showSettings={showSettings}
                    removeReaction={removeReaction}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      {areSettingsVisible && (
        <SettingsModal
          targetRect={selectedMessageRect}
          hideModal={hideSettings}
          handleCopy={handleCopy}
          handleDelete={handleDelete}
          toggleReaction={toggleReaction}
        />
      )}
    </>
  );
};
