import React from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { ConversationsProvider } from "./contexts/ConversationsProvider";

function App() {
  return (
    <ConversationsProvider>
      <Dashboard />
    </ConversationsProvider>
  );
}

export default App;
