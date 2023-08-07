import { FC } from "react";
import { IMessageReaction } from "./interface";
import st from "./messageReaction.module.scss";
import { motion } from "framer-motion";
import cn from "classnames";

export const MessageReaction: FC<IMessageReaction> = ({
  messageId,
  fromMe,
  reaction,
  removeReaction,
}) => {
  return (
    <motion.button
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      type="button"
      className={cn(st["message__reaction"], {
        [st["message__reaction_me"]]: fromMe,
      })}
      onClick={() => removeReaction(messageId)}
    >
      <motion.div
        key={reaction.key}
        initial={{ y: "-20px" }}
        animate={{ y: "0px" }}
        exit={{ y: ["8px", "-20px"], opacity: [1, 0] }}
        transition={{
          type: "spring",
          mass: "0.2",
          damping: 3,
        }}
      >
        {reaction.emoji}
      </motion.div>
    </motion.button>
  );
};
