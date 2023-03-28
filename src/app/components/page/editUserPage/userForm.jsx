import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../../api";
import TextField from "../../common/form/testField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserForm = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });
    const [professions, setProfessions] = useState({});
    const [qualities, setQualities] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        api.users.getById(userId).then((data) => setData(data));
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((users) => {
            const professionList = Object.keys(users).map((professionName) => ({
                label: users[professionName].name,
                value: users[professionName]._id
            }));
            setProfessions(professionList);
        });
        api.qualities.fetchAll().then((users) => {
            const qualitiesList = Object.keys(users).map((qualitiesName) => ({
                label: users[qualitiesName].name,
                value: users[qualitiesName]._id,
                color: users[qualitiesName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(target.value);
    };

    const handleSubmit = (e) => {
        console.log(e.target);
    };

    return (
        <>
            <h1>Редактировать</h1>
                <TextField
                    label="Имя"
                    value={data.name}
                    onChange={handleChange}
                    name="name"
                />

                <TextField
                    label="Электронная почта"
                    value={data.email}
                    onChange={handleChange}
                    name="email"
                />

                <SelectField
                    label="Выберите свою профессию"
                    defaultOption="Choose..."
                    name="professions"
                    options={professions}
                    onChange={handleChange}
                    value={professions.name}
                />

                <RadioField
                    options={[
                        { name: "Male", value: "male" },
                        { name: "Female", value: "female" }
                    ]}
                    value={data.sex}
                    name="sex"
                    onChange={handleChange}
                    label="Выберите ваш пол"
                />

                <MultiSelectField
                    label="Выберите ваши качества"
                    onChange={handleChange}
                    options={qualities}
                    defaultValue={data.qualities}
                    name={qualities}
                    value={data.qualities}
                />

                <button
                className="btn btn-primary"
                type="button"
                onClick={handleSubmit}
                >
                    Обновить
                </button>
        </>
    );
};

// UserForm.propTypes = {
//    errors: PropTypes.string
// };

export default UserForm;
