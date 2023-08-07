import { motion } from "framer-motion";
import { FC } from "react";
import st from "./popup.module.scss";
import { AiOutlineCopy } from "react-icons/ai";

export const Popup: FC = () => {
  return (
    <motion.div
      initial={{ y: "50px", opacity: 0 }}
      animate={{ y: "0px", opacity: 1 }}
      exit={{ y: "50px", opacity: 0 }}
      transition={{ duration: 0.7 }}
      className={st.popup}
      style={{ translateX: "-50%" }}
    >
      <div className={st.container}>
        <div className={st.popup__content}>
          <div className={st["popup__icon-container"]}>
            <AiOutlineCopy className={st["popup__icon"]} />
          </div>
          <span className={st.popup__text}>Text copied to clipboard.</span>
        </div>
      </div>
    </motion.div>
  );
};
