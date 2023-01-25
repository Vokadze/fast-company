import React from "react";

const BookMark = ({ status, ...rest }) => {

   let updateBookmark = status ? '-heart-fill' : ''

   return <button className="btn btn-ligth border-dark m-1 p-1" >
      {status = <i className="bi bi-bookmark" {...rest}></i>
         ? <i className={`bi bi-bookmark${updateBookmark}`} {...rest}></i>
         : <i className="bi bi-bookmark" {...rest}></i>}
   </button>
}

export default BookMark

/*
{status = <i className={`bi bi-bookmark${updateBookmark}`} onClick={() => handleToggleBookMark()} {...rest}></i>}
*/