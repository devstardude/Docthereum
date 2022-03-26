import React from "react";
import'./style.css';

const Button = (props) => {
  return (
    <div className={props.className}>
      <button type="submit"
        className="Button"
        type = "submit"
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
