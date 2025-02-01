import React, { Component, ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo: string | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-4 text-center bg-red-100 rounded-lg">
          <h2 className="text-red-600 text-lg font-bold">
            Something went wrong.
          </h2>
          <p className="text-sm text-gray-600">
            Error details: {this.state.errorInfo || "Unknown error"}
          </p>
          <button
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={this.handleReload}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
