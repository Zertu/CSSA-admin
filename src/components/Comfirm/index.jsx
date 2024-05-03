import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Confrim = ({
  title = "Confirm to submit",
  message = "Are you sure to do this.",
  buttons = [
    {
      label: "Yes",
      onClick: () => alert("Click Yes"),
    },
    {
      label: "No",
      onClick: () => alert("Click No"),
    },
  ],
}) => {
  return confirmAlert({
    title,
    message,
    buttons,
  });
};
export default Confrim;
