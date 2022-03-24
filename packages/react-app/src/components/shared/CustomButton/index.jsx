import React from "react";
import'./style.css';

const Button = (props) => {
  return (
    <div className={props.className}>
      <div
        className="Button"
      >
        {props.children}
      </div>
    </div>
  );
};

export default Button;
