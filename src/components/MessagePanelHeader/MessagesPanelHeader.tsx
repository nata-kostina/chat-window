import { FC } from "react";
import st from "./messagesPanelHeader.module.scss";
import UserImg from "./../../assets/user-1.jpg";

export const MessagesPanelHeader: FC = () => {
  return (
    <header className={st.header}>
      <div className={st.user}>
        <div className={st["user__img-container"]}>
          <img className={st.user__img} alt="User" src={UserImg} />
        </div>
        <h2 className={st.user__name}>Sylwia Spencer</h2>
        <span className={st.user__status}>Online</span>
      </div>
    </header>
  );
};
