import React from "react";

const BookMark = ({ status, bookmark, id, handleToggleBookMark, ...rest }) => {

   //const updateBookmark = bookmark ? '-heart-fill' : ''

   return (
      <button className="btn btn-ligth border-dark m-1 p-1" onClick={() => handleToggleBookMark(id)}>
         {status = <i className={`bi bi-bookmark${bookmark ? '-heart-fill' : ''}`}></i>}
      </button>
   )
}

export default BookMark