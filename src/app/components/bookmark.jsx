import React from "react";

const BookMark = ({ status, ...rest }) => {
   return (
      <button className="btn btn-ligth border-dark m-1 p-1" {...rest}>
         <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
      </button>
   )
}

export default BookMark