import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/index";
import UserForm from "./userForm";

const EditUserPage = () => {
    const { userId } = useParams();

    useEffect(() => {
        api.users.update((data) => data._id === userId);
    }, []);

    return <UserForm data={userId} />;
};

export default EditUserPage;
