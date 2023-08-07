import { FC, useCallback, useRef, useState } from "react";
import {
  IConversationsContext,
  useConversations,
} from "../../contexts/ConversationsProvider";
import st from "./messagesPanel.module.scss";
import { MessageBubble } from "./../MessageBubble/MessageBubble";
import { SettingsModal } from "./../SettingsModal/SettingsModal";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuid } from "uuid";
import { Rect } from "../../types";
import { Popup } from "../Popup/Popup";
import ScrollToBottom from "react-scroll-to-bottom";
import cn from "classnames";
import DeleteSound from "../../assets/delete.wav";

export const MessagePanel: FC = () => {
  const { conversation, deleteMessageFromConversation, editMessage } =
    useConversations() as IConversationsContext;
  const listRef = useRef<HTMLUListElement | null>(null);
  const [lastChangedIndex, setLastChangedIndex] = useState(0);
  const [areSettingsVisible, setAreSettingsVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const [selectedMessageRect, setSelectedMessageRect] = useState<Rect | null>(
    null
  );
  const setRef = useCallback((node: HTMLLIElement | null, fromMe: boolean) => {
    if (node && fromMe) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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
      setIsPopupVisible(true);
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 2000);
    }
    hideSettings();
  };

  const handleDelete = () => {
    if (selectedMessageId) {
      const sound = new Audio(DeleteSound);
      sound
        .play()
        .catch(() => {})
        .finally(() => {
          const idx = conversation.findIndex(
            (message) => message.id === selectedMessageId
          );
          setLastChangedIndex(idx);
          deleteMessageFromConversation(selectedMessageId);
        });
    }
    hideSettings();
  };

  const addReaction = (reaction: string) => {
    const message = conversation.find(
      (message) => message.id === selectedMessageId
    );
    if (message) {
      const updatedMessage = {
        ...message,
        reaction: {
          key: uuid(),
          emoji: reaction,
        },
      };
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

  const animatingMessages = conversation.slice(lastChangedIndex);

  return (
    <>
      <main className={st.panel}>
        <div className={st.panel__inner}>
          <ScrollToBottom
            mode="bottom"
            className={st["scrollable-list"]}
            followButtonClassName={cn(st.btn, st.btn_bottom)}
          >
            <div className={st.container}>
              <ul className={st["message-list"]} ref={listRef} id="list">
                <AnimatePresence>
                  {conversation.map((message, index) => {
                    const lastMessage = conversation.length - 1 === index;

                    return (
                      <motion.li
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          opacity: { duration: 0.2 },
                          scale: { duration: 0.4 },
                          layout: {
                            type: "spring",
                            bounce: 0.4,
                            duration:
                              animatingMessages.indexOf(message) * 0.4 + 0.85,
                          },
                        }}
                        ref={
                          lastMessage
                            ? (el) => setRef(el, message.fromMe)
                            : null
                        }
                        key={message.id}
                        className={st["message-list__item"]}
                        style={{
                          boxSizing: "content-box",
                          originX: +message.fromMe,
                          paddingTop: index ? "0px" : "4rem",
                        }}
                      >
                        <MessageBubble
                          message={message}
                          showSettings={showSettings}
                          removeReaction={removeReaction}
                        />
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            </div>
          </ScrollToBottom>
          <AnimatePresence>{isPopupVisible && <Popup />}</AnimatePresence>
        </div>
      </main>
      <AnimatePresence>
        {areSettingsVisible && (
          <SettingsModal
            targetRect={selectedMessageRect}
            hideModal={hideSettings}
            handleCopy={handleCopy}
            handleDelete={handleDelete}
            addReaction={addReaction}
          />
        )}
      </AnimatePresence>
    </>
  );
};
