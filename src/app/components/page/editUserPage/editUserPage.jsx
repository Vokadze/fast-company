import React, { useState, useEffect } from "react";

import UserForm from "./userForm";
import api from "../../../api";

const EditUserPage = () => {
    const [formUser, setFormUser] = useState({});

    useEffect(() => {
        api.users.update().then((data) => setFormUser(data));
    }, []);

    return <UserForm formUser={formUser} />;
};

export default EditUserPage;
