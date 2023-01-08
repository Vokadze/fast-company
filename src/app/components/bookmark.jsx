import React from "react";

const BookMark = ({ status, ...rest }) => {

   //const nextStatus = status ? '-heart-fill' : ''

   return !status ? <i id="0" className="bi bi-bookmark"></i> : <i id="1" className="bi bi-bookmark-heart-fill"></i>

}

export default BookMark