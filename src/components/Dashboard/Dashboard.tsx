import { FC } from "react";
import { MessageForm } from "../MessageForm/MessageForm";
import { MessagesPanelHeader } from "../MessagePanelHeader/MessagesPanelHeader";
import { MessagePanel } from "../MessagesPanel/MessagesPanel";
import st from "./dashboard.module.scss";

export const Dashboard: FC = () => {
  return (
    <div className={st.dashboard}>
      <MessagesPanelHeader />
      <MessagePanel />
      <MessageForm />
    </div>
  );
};
