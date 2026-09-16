import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success", duration = 4000) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`toast-container toast-${toast.type}`} role="alert">
          <div className="toast-icon">
            <span className="material-symbols-rounded" aria-hidden="true">
              {toast.type === "success" ? "check_circle" : "info"}
            </span>
          </div>
          <div className="toast-message">{toast.message}</div>
          <button className="toast-close" onClick={() => setToast(null)}>
            <span className="material-symbols-rounded" aria-hidden="true">close</span>
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
