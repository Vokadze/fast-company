import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../../../api";

import Qualities from "../../ui/qualities";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    if (user) {
        return (
            <>
                <div>
                    <h1>{user.name}</h1>
                    <h2 className="pb-3">Профессия: {user.profession.name}</h2>
                    <Qualities qualities={user.qualities} />
                    <p className="pt-2">
                        completedMeetings: {user.completedMeetings}
                    </p>
                    <h2 className="pb-2">Rate: {user.rate}</h2>
                    <button className="btn btn-primary" onClick={handleClick}>
                        Изменить
                    </button>
                </div>
            </>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.object.isRequired
    ])
};

export default UserPage;
