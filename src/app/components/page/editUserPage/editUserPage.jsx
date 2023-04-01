import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import UserForm from "./userForm";
import api from "../../../api";

const EditUserPage = ({ formData }) => {
    const [formUser, setFormUser] = useState({});
    const { userId } = useParams();

    useEffect(() => {
        api.users.getById(userId).then((user) => setFormUser(user));
    }, []);

    const getFormUser = (user) => {
        formData = user;
    };

    const updateFormUser = () => {
        const updatedFromUser = {
            ...formData,
            ...formUser
        };
        api.users.update(userId, updatedFromUser).then(() => setFormUser());
    };

    useEffect(() => {
        console.log(formUser);
    }, [formUser]);

    return (
        <UserForm
            getFormUser={getFormUser}
            saveFromUser={updateFormUser}
            formUser={formUser}
        />
    );
};

EditUserPage.propTypes = {
    formData: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default EditUserPage;
