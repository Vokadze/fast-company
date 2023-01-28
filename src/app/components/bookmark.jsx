import React from "react";

const BookMark = ({ bookmark, id, handleToggleBookMark, ...rest }) => {
   return (
      <button className="btn btn-ligth border-dark m-1 p-1" onClick={() => handleToggleBookMark(id)} {...rest}>
         {<i className={`bi bi-bookmark${bookmark ? '-heart-fill' : ''}`} ></i>}
      </button>
   )
}

export default BookMark