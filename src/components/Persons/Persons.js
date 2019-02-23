import React from "react";
import "./Persons.css";

const person = props => {
  return (
    <div onClick={() => props.display(props.info.id)} className="Persons">
      <p>{`${props.info.firstName} ${props.info.surname}`}</p>
    </div>
  );
};

export default person;
