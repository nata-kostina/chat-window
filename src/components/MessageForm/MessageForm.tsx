import { FC, useRef, useState } from "react";
import {
  IConversationsContext,
  useConversations,
} from "./../../contexts/ConversationsProvider";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import cn from "classnames";
import st from "./messageForm.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { LiaKeyboardSolid } from "react-icons/lia";

export const MessageForm: FC = () => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState("");
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const { sendMessage } = useConversations() as IConversationsContext;
  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(value);
    setValue("");
  };
  const toggleEmojiPicker = () => {
    setIsEmojiPickerVisible((prev) => !prev);
  };
  const addEmoji = (e: EmojiClickData) => {
    const codes = e.unified.split("-");
    const codesHex = codes.map((code) => +("0x" + code))
    const emoji = String.fromCodePoint(...codesHex);

    let newInputValue = "";

    if (inputRef.current) {
      const cursorPosition = inputRef.current.selectionStart;
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
  return (
    <>
      <div className={st.footer}>
        <form
          className={st.form}
          onSubmit={handleSubmit}
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
      {isEmojiPickerVisible && (
        <div className={st["picker-container"]}>
          <EmojiPicker onEmojiClick={addEmoji} width={"100%"} />
        </div>
      )}
    </>
  );
};
