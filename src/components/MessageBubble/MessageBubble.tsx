import { FC, useRef } from "react";
import st from "./messageBubble.module.scss";
import { IMessageBubble } from "./interface";
import { TbDotsVertical } from "react-icons/tb";
import cn from "classnames";
import { IoCheckmarkDone } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import { timeFormatter } from "../../tools";
import { MessageReaction } from "../MessageReaction/MessageReaction";

export const MessageBubble: FC<IMessageBubble> = ({
  message,
  showSettings,
  removeReaction,
}) => {
  const formattedDate = timeFormatter.format(message.date);
  const settingsBtnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className={st["message-container"]}>
      <div
        className={cn(st["message"], { [st["message_me"]]: message.fromMe })}
      >
        <div className={st["message__body"]}>
          <div className={st["message__content"]}>{message.body}</div>
          <div className={st["message__info"]}>
            <span className={st["message__time"]}>{formattedDate}</span>
            {message.fromMe && (
              <span className={st["message__read"]}>
                <IoCheckmarkDone className={st["message__read-icon"]} />
              </span>
            )}
          </div>
          <button
            ref={settingsBtnRef}
            type="button"
            className={st["message__settings"]}
            onClick={() => showSettings(message.id, settingsBtnRef)}
          >
            <TbDotsVertical className={st["message__settings-icon"]} />
          </button>
          <AnimatePresence mode="wait">
            {message.reaction && (
              <MessageReaction
                messageId={message.id}
                fromMe={message.fromMe}
                reaction={message.reaction}
                removeReaction={removeReaction}
              />
            )}
          </AnimatePresence>
        </div>
        <span className={st["message__author"]}>
          {message.fromMe ? "Me" : message.author}{" "}
        </span>
      </div>
    </div>
  );
};
