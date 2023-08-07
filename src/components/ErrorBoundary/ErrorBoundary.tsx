import React, { ReactNode } from "react";
import st from "./errorBoundary.module.scss";

export class ErrorBoundary extends React.Component<
  { children: ReactNode },
  {
    hasError: boolean;
    error: any;
  }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    this.setState({ error: error.toString() });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={st.info}>
          Ooops!
          <br />
          Something went wrong
          <br />
          Reload the page please.
        </div>
      );
    }

    return this.props.children;
  }
}
