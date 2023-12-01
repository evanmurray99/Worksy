import { useState } from "react";
import "../Styles/Accordion.css";

/**
 * Checks if the accordion is open or closed and returns the corresponding symbol.
 * @param {boolean} state - The state of the accordion (true for open, false for closed).
 * @returns {JSX.Element} - The symbol indicating the state of the accordion.
 */
function checkIsOpen(state) {
  var currSymbol = "+";

  if (state) {
    currSymbol = "- ";
  }

  return <p className="removePadding floatRight resize">{currSymbol}</p>;
}

/**
 * Renders the content of the accordion based on the state.
 * @param {boolean} state - The state of the accordion.
 * @param {ReactNode} accordContent - The content to be displayed in the accordion.
 * @param {boolean} hasBackdrop - Indicates whether the accordion has a backdrop.
 * @returns {ReactNode} - The rendered content of the accordion.
 */
function showContent(state, accordContent, hasBackdrop) {
  var content = null;
  var formatting = "layout";

  if (hasBackdrop) {
    formatting += " backdrop";
  }

  if (state) {
    content = <div className={formatting}>{accordContent}</div>;
  }

  return content;
}


export default function Accordion({ title, content, hasBackdrop }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="contentContainer">
      <div className="titleBar" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="removePadding floatLeft">{title}</h2>
        {checkIsOpen(isOpen)}
      </div>
      {showContent(isOpen, content, hasBackdrop)}
    </div>
  );
}
