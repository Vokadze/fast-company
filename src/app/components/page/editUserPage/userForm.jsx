import React, { useEffect, useState } from "react";
import api from "../../../api";

import { validator } from "../../../utils/validator";
import TextField from "../../common/form/testField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useParams } from "react-router-dom";

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const { userId } = useParams();

    useEffect(() => {
        api.users.getById(userId).then((data) => setFormData(data));
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
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        console.log(qualities);
    }, [qualities]);

    const handleChange = (target) => {
        setFormData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(target.value);
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
    }, [formData]);

    const validate = () => {
        const formErrors = validator(validatorConfig, errors);
        setErrors(formErrors);
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = formData;
        console.log({
            ...formData,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
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
                error={errors.profession}
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
                defaultValue={formData.qualities}
            />

            <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
            >
                Обновить
            </button>
        </>
    );
};

export default UserForm;
