import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";

const UserPage = ({
   _id,
   name,
   profession,
   qualities,
   completedMeetings,
   rate,
   handleClick
}) => {
   return (
      <div key={_id}>
         <h1>Имя: {name}</h1>
         <h2 className="pb-3">Профессия: {profession}</h2>
         <div className="pb-2">
            <Qualitie qualities={qualities} />
         </div>
         <p>completedMeetings: {completedMeetings}</p>
         <h2 className="pb-2">Rate: {rate}</h2>
         <button className="btn btn-primary" onClick={handleClick}>
            Все пользователи
         </button>
      </div>
   );
};

UserPage.propTypes = {
   _id: PropTypes.array,
   userData: PropTypes.array,
   name: PropTypes.string,
   qualities: PropTypes.array,
   profession: PropTypes.object,
   completedMeetings: PropTypes.number,
   rate: PropTypes.number,
   handleClick: PropTypes.func
};

export default UserPage;
