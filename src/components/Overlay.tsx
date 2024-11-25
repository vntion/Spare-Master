import { useToggleForm } from "../contexts/ToggleFormContext";

function Overlay() {
  const { isOpen, isOpenAction, onCloseForm, onCloseAction, onCurrOpenAct } =
    useToggleForm();

  if (isOpenAction)
    return (
      <div
        className="absolute inset-0"
        onClick={() => {
          onCloseAction();
          onCurrOpenAct(null);
        }}
      ></div>
    );

  if (isOpen)
    return (
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onCloseForm}
      ></div>
    );

  return null;
}

export default Overlay;
