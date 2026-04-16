import React, { useContext } from "react";
import { AppContext } from "../context";
import "../styles/Toast.css";

const Toast = () => {
  const { toast } = useContext(AppContext);
  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.message}
    </div>
  );
};

export default Toast;