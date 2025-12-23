import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { useSelector, shallowEqual } from "react-redux";

const ErrorOverlay = () => {
  const { message: authMessage, error: authError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authError && authMessage) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: authMessage,
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  }, [authMessage, authError]);

  const showErrorToast = (message) => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: message,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  

  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ////////////////////Phone Suffixes/////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  const { errorStatesPhoneSuffixesGet, messagesPhoneSuffixesGet } = useSelector(
    (state) => ({
      errorStatesPhoneSuffixesGet:
        state.superPublic?.errorStates?.PHONE_SUFFIXES?.GET,
      messagesPhoneSuffixesGet: state.superPublic?.messages?.PHONE_SUFFIXES?.GET,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (errorStatesPhoneSuffixesGet && messagesPhoneSuffixesGet) {

        console.log(messagesPhoneSuffixesGet)
      showErrorToast(messagesPhoneSuffixesGet);
    }
  }, [errorStatesPhoneSuffixesGet, messagesPhoneSuffixesGet]);

  
  return null;
};

export default ErrorOverlay;

