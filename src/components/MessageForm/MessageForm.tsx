import { FC, useRef, useState } from "react";
import {
  IConversationsContext,
  useConversations,
} from "./../../contexts/ConversationsProvider";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import cn from "classnames";
import st from "./messageForm.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { LiaKeyboardSolid } from "react-icons/lia";
import { AnimatePresence, motion } from "framer-motion";

export const MessageForm: FC = () => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState("");
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const { sendMessage } = useConversations() as IConversationsContext;
  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  const handleSubmit = () => {
    sendMessage(value);
    setValue("");
  };
  const toggleEmojiPicker = () => {
    setIsEmojiPickerVisible((prev) => !prev);
  };
  const addEmoji = (e: EmojiClickData) => {
    const codes = e.unified.split("-");
    const codesHex = codes.map((code) => +("0x" + code));
    const emoji = String.fromCodePoint(...codesHex);
    let newInputValue = "";
    if (inputRef.current) {
      const cursorPosition = inputRef.current.selectionStart;
      newInputValue =
        value.slice(0, cursorPosition) + emoji + value.slice(cursorPosition);
      newInputValue =
        value.slice(0, cursorPosition) + emoji + value.slice(cursorPosition);
      inputRef.current.setSelectionRange(
        cursorPosition + 1,
        cursorPosition + 1
      );
    } else {
      newInputValue = value + emoji;
    }
    setValue(newInputValue);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <>
      <div className={st.footer}>
        <div className={st.container}>
          <form
            className={st.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            name="conversationForm"
          >
            <button
              type="button"
              className={cn(st.btn, st["btn-emoji"])}
              onClick={toggleEmojiPicker}
            >
              {isEmojiPickerVisible ? (
                <LiaKeyboardSolid className={st["btn-icon"]} />
              ) : (
                <BsEmojiSmile className={st["btn-icon"]} />
              )}
            </button>
            <TextareaAutosize
              ref={inputRef}
              value={value}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              name="message"
              className={st.input}
              placeholder="Enter Message..."
              maxRows={6}
            />
            <button type="submit" className={cn(st.btn, st["btn-send"])}>
              <IoSendSharp className={st["btn-icon"]} />
            </button>
          </form>
        </div>

        <AnimatePresence mode="popLayout">
          {isEmojiPickerVisible && (
            <div className={st["picker"]}>
              <div className={st["picker__inner"]}>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    layout: {
                      type: "spring",
                      bounce: 0.4,
                    },
                  }}
                  className={st["picker-box"]}
                >
                  <EmojiPicker
                    onEmojiClick={addEmoji}
                    width={"100%"}
                    emojiStyle={EmojiStyle.NATIVE}
                    lazyLoadEmojis={true}
                    previewConfig={{ showPreview: false }}
                  />
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
