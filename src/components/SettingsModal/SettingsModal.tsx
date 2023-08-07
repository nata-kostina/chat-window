import { FC, useRef } from "react";
import st from "./settingsModal.module.scss";
import { AiOutlineCopy } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";
import { ISettingsModal } from "./interface";
import { createPortal } from "react-dom";
import { motion, useAnimate } from "framer-motion";

const modalOffset = 150;

export const SettingsModal: FC<ISettingsModal> = ({
  targetRect,
  hideModal,
  handleCopy,
  handleDelete,
  addReaction,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [scope, animate] = useAnimate();

  // check if modal is not out of the viewport
  let modalX = 0;
  let modalY = 0;
  if (targetRect !== null) {
    modalX = targetRect.left;
    modalY = targetRect.bottom;

    if (modalY + modalOffset >= window.innerHeight) {
      modalY = targetRect.top - modalOffset;
    }
    if (modalX + modalOffset >= window.innerWidth) {
      modalX = modalX - modalOffset;
    }
  }

  const animateReaction = (reaction: { code: number; name: string }) => {
    animate(
      "#" + reaction.name,
      { y: ["3px", "-20px"], scale: 1.1 },
      {
        ease: "easeOut",
        onComplete: () => addReaction(String.fromCodePoint(reaction.code)),
      }
    );
  };

  return createPortal(
    <div className={st.modal}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={st.overlay}
        onClick={hideModal}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
        ref={modalRef}
        className={st["modal__content"]}
        onClick={(e) => e.stopPropagation()}
        style={{ translateX: modalX, translateY: modalY }}
      >
        <ul className={st["reactions-list"]} ref={scope}>
          {reactions.map((reaction) => (
            <li
              className={st["reactions-list__item"]}
              key={reaction.name}
              id={reaction.name}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={st.btn}
                onClick={() => animateReaction(reaction)}
              >
                {String.fromCodePoint(reaction.code)}
              </motion.button>
            </li>
          ))}
        </ul>
        <ul className={st["actions-list"]}>
          <li className={st["actions-list__item"]}>
            <button className={st.btn} onClick={handleCopy}>
              <span className={st["action-icon-container"]}>
                <AiOutlineCopy className={st["action-icon"]} />
              </span>
              Copy
            </button>
          </li>
          <li className={st["actions-list__item"]}>
            <button className={st.btn} onClick={handleDelete}>
              <span className={st["action-icon-container"]}>
                <RiDeleteBin7Line className={st["action-icon"]} />
              </span>
              Delete
            </button>
          </li>
        </ul>
      </motion.div>
    </div>,
    document.body
  );
};

const reactions = [
  { code: 0x2764, name: "heart" },
  { code: 0x1f44d, name: "fingerUp" },
  { code: 0x1f44e, name: "fingerDown" },
];
