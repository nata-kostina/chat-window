import { FC, useLayoutEffect, useRef, useState } from "react";
import st from "./settingsModal.module.scss";
import { AiOutlineCopy } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";
import { ISettingsModal } from "./interface";
import { createPortal } from "react-dom";

export const SettingsModal: FC<ISettingsModal> = ({
  targetRect,
  hideModal,
  handleCopy,
  handleDelete,
  toggleReaction,
}) => {
  debugger;
  console.log(targetRect);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [modalHeight, setModalHeight] = useState(0);
  const [modalWidth, setModalWidth] = useState(0);

  useLayoutEffect(() => {
    debugger;

    if (modalRef.current) {
      const { height, width } = modalRef.current.getBoundingClientRect();
      setModalHeight(height);
      setModalWidth(width);
    }
  }, []);
  debugger;

  let modalX = 0;
  let modalY = 0;
  if (targetRect !== null) {
    modalX = targetRect.left;
    modalY = targetRect.bottom;
    if (modalY + modalHeight >= window.innerHeight) {
      modalY = targetRect.top - modalHeight;
    }
    if (modalX + modalWidth >= window.innerWidth) {
      modalX = window.innerWidth - modalWidth;
    }
    console.log("modalX: ", modalX);
    console.log("modalX + modalWidth: ", modalX + modalWidth);
    console.log("window.innerWidth: ", window.innerWidth);
    console.log("targetRect.left - modalWidth: ", targetRect.left - modalWidth);
  }
  return createPortal(
    <div className={st.modal}>
      <div className={st.overlay} onClick={hideModal}></div>
      <div
        ref={modalRef}
        className={st["modal__content"]}
        onClick={(e) => e.stopPropagation()}
        style={{ transform: `translate(${modalX}px, ${modalY}px)` }}
      >
        <ul className={st["reactions-list"]}>
          {reactions.map((reaction) => (
            <li className={st["reactions-list__item"]} key={reaction}>
              <button
                className={st.btn}
                onClick={() => toggleReaction(String.fromCodePoint(reaction))}
              >
                {String.fromCodePoint(reaction)}
              </button>
            </li>
          ))}
        </ul>
        <ul className={st["actions-list"]}>
          <li className={st["actions-list__item"]}>
            <div className={st["action-btn-container"]}>
              <button className={st.btn} onClick={handleCopy}>
                <span className={st["action-icon-container"]}>
                  <AiOutlineCopy className={st["action-icon"]} />
                </span>
                Copy
              </button>
            </div>
          </li>
          <li className={st["actions-list__item"]}>
            <div className={st["action-btn-container"]}>
              <button className={st.btn} onClick={handleDelete}>
                <span className={st["action-icon-container"]}>
                  <RiDeleteBin7Line className={st["action-icon"]} />
                </span>
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>,
    document.body
  );
};

const reactions = [0x2764, 0x1f44d, 0x1f44e];
