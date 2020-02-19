import React from "react";

const Popup = props => {
  return (
    <div className="popup">
      <div className="popup_inner">
        <button className="Close-popup-btn">X</button>
        <div>this is pop up</div>
        {/* {props.children} */}
      </div>
    </div>
  );
};

export default Popup;
