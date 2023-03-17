import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    });

    const handleClick = () => {
        history.push("/users");
    };
    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2 className="pb-3">Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <p className="pt-2">
                    completedMeetings: {user.completedMeetings}
                </p>
                <h2 className="pb-2">Rate: {user.rate}</h2>
                <button className="btn btn-primary" onClick={handleClick}>
                    Все пользователи
                </button>
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;