import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../store/toastSlice";
import { useEffect } from "react";
import { CircleCheck, CircleX } from "@/components/icons";

const Toast = () => {
  const dispatch = useDispatch();
  const { toast, visible } = useSelector((state) => state.toast);

  useEffect(() => {
    if (!visible || !toast) return;

    const hideTimer = setTimeout(() => dispatch(hideToast()), 2000);

    return () => clearTimeout(hideTimer);
  }, [toast, visible, dispatch]);

  if (!toast) return null;

  const getToastIcon = (type) =>
    type === "success" ? (
      <CircleCheck className="w-5 h-5" />
    ) : (
      <CircleX className="w-5 h-5" />
    );

  const getToastStyle = (type) =>
    type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white";

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-[9999] ${
        visible ? "animate-fade-in-down" : "animate-fade-out-up"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${getToastStyle(
          toast.type
        )}`}
      >
        {getToastIcon(toast.type)}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;
