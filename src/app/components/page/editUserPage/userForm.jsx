import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import api from "../../../api";
import TextField from "../../common/form/testField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";

const UserForm = ({ getFormUser }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });
    const [professions, setProfessions] = useState({});
    const [qualities, setQualities] = useState([]);
    const { userId } = useParams();
    const [errors, setErrors] = useState({});

    const getProfById = (id) => {
        const profIndex = Object.values(professions).findIndex(
            ({ _id }) => _id === id
        );
        return professions[profIndex];
    };

    console.log(getProfById());

    useEffect(() => {
        api.users.getById(userId).then((formData) => setFormData(formData));
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.values(data).map((quality) => ({
                value: quality._id,
                label: quality.name,
                color: quality.color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setFormData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const sendProfName = formData.profession._id
            ? formData.profession._id
            : formData.profession;

        getFormUser({
            ...formData,
            profession: getProfById(sendProfName)
        });

        console.log({
            name: formData.name,
            email: formData.email,
            profession: sendProfName,
            sex: "",
            qualities: formData.qualities
        });
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Email обязателен для заполнения"
            },
            isEmail: {
                message: "Email не корректный"
            }
        },
        profession: {
            isRequired: {
                message: "Надо выбрать качества"
            }
        }
    };

    useEffect(() => {
        validate();
    }, []);

    const validate = () => {
        const formErrors = validator(validatorConfig, errors);
        setErrors(formErrors);
    };

    return (
        <>
            <h1>Редактировать</h1>
            <TextField
                label="Имя"
                value={formData.name}
                onChange={handleChange}
                name="name"
                error={errors.name}
            />

            <TextField
                label="Электронная почта"
                value={formData.email}
                onChange={handleChange}
                name="email"
                error={errors.email}
            />

            <SelectField
                label="Выберите свою профессию"
                defaultOption="Choose..."
                name="profession"
                options={professions}
                onChange={handleChange}
                value={formData.profession}
            />

            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" }
                ]}
                value={formData.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />

            <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Выберите ваши качества"
                error={errors.qualities}
                defaultValue={formData.qualities}
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

UserForm.propTypes = {
    getFormUser: PropTypes.func
};

export default UserForm;
