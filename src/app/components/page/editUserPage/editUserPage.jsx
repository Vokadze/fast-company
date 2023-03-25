import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import api from "../../../api";
import TextField from "../../common/form/testField";
import SelectField from "../../common/form/selectField";
import { professions } from "../../../api/fake.api/professions.api";

// import { UserPageEdit } from "../userPage/userPage";

const EditUserPage = () => {
    const [userEdit, setUserEdit] = useState({
        fio: "",
        email: "",
        profession: ""
    });
    const { userId } = useParams();
    console.log(userId);

    const raw = localStorage.getItem("users");
    const users = JSON.parse(raw);
    console.log(users);

    useEffect(() => {
        api.users.fetchAll(userId).then((userEdit) => setUserEdit(userEdit));
    }, []);

    const handleChange = (target) => {
        setUserEdit((prevState) => ({
            ...prevState,
            [target.value]: target.name
        }));
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession } = userEdit;
        console.log({
            ...userEdit,
            profession: getProfessionById(profession)
        });
    };

    const getUserPage = () => {
        const userPageInfo = users.filter((user) => user._id === userId);
        return userPageInfo;
    };

    return (
        <>
            <h1>Редактировать</h1>
            {getUserPage().map((user) => (
                <div key={user._id}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            id={userEdit}
                            onChange={handleChange}
                            name={user.name}
                            value={user.name}
                        />
                        <TextField
                            label="Электронная почта"
                            onChange={handleChange}
                            name={userEdit}
                            value={user.email}
                        />
                        <SelectField
                            label="Выберите свою профессию"
                            defaultOption="Choose..."
                            name="profession"
                            options={professions}
                            onChange={handleChange}
                            value={user.name}
                        // error={errors.profession}
                        />
                    </form>
                </div>
            ))}
        </>
    );
};

EditUserPage.propTypes = {
    label: PropTypes.string,
    user: PropTypes.array,
    handleClick: PropTypes.func
};

export default EditUserPage;
