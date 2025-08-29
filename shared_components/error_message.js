import { Alert } from "react-native";

export default function showError(message, onRetry, omitCancelButton) {
  const buttons = [];


  buttons.push({
    text: "Retry",
    onPress: () => {
      if (onRetry) onRetry();
    },
  });

    if (!omitCancelButton) {
    buttons.push({
      text: "Cancel",
        style: 'cancel',
      onPress: () => {},
    });
  }

  Alert.alert("Error", message, buttons);
}
