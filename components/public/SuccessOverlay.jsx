import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { useSelector, shallowEqual } from "react-redux";

const SuccessOverlay = () => {
  // Helper function to check if message contains HTML tags
  const containsHTML = (message) => {
    if (typeof message !== "string") return false;
    return /<[a-z][\s\S]*>/i.test(message);
  };

  // Helper function to strip HTML tags and decode HTML entities
  const stripHTML = (html) => {
    if (typeof html !== "string") return html;
    // Remove HTML tags
    let text = html.replace(/<[^>]*>/g, "");
    // Decode common HTML entities
    text = text
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    return text.trim();
  };

  const { message: authMessage, error: authError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!authError && authMessage) {
      const messageText = containsHTML(authMessage)
        ? stripHTML(authMessage)
        : authMessage;

      Toast.show({
        type: "info",
        text1: "Info",
        text2: messageText,
        position: "top",
        visibilityTime: 20000,
        autoHide: true,
      });
    }
  }, [authMessage, authError]);

  const showSuccessToast = (message) => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: message,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  
  return null;
};

export default SuccessOverlay;

