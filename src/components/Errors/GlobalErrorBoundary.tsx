import { Component, PropsWithChildren } from "react";

import ServerError from "./ServerError";

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string | null;
}

export default class GlobalErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = {
      hasError: false,
      message: null,
    };
  }

  // 하위 컴포넌트에서 오류의 정보를 return을 통해서 State에 저장하는 역할
  //error 파라미터는 발생한 오류의 정보를 담고 있다
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    // const { hasError, message } = this.state;
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (fallback) return fallback;

      return <ServerError />;
    }

    return children;
  }
}
