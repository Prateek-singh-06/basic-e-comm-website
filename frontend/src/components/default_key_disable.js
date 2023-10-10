// ShortcutComponent.js
import { useEffect } from "react";

function Disable_default() {
  useEffect(() => {
    function handleKeyPress(event) {
      if (
        event.ctrlKey &&
        (event.keyCode === 83 ||
          event.keyCode === 85 ||
          event.keyCode === 65 ||
          event.keyCode === 80 ||
          event.keyCode === 82)
      ) {
        event.preventDefault();
        // alert("Ctrl + S is disabled on this website.");
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });
}

export default Disable_default;
