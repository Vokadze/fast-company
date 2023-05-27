import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { validator } from "../../../utils/validator";
import TextField from "../../common/form/testField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backBuuton";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserData } from "../../../store/users";

const EditUserPage = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const currentUser = useSelector(getCurrentUserData());
    const { updateUserData } = useAuth();

    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const professionList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        await updateUserData({
            ...data,
            qualities: data.qualities.map((q) => q.value)
        });

        history.push("/users/" + `${currentUser._id}`);
    };

    function getQualitiesById(qualitieIds) {
        const qualitiesArray = [];
        for (const qualId of qualitieIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }

    const transformData = (data) => {
        const result = getQualitiesById(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
        return result;
    };

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
            console.log(currentUser._id);
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [professionsLoading, qualitiesLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email обязателен для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const formErrors = validator(data, validatorConfig);
        setErrors(formErrors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-8 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <h1>Редактировать</h1>

                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />

                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />

                            <SelectField
                                label="Выберите свою профессию"
                                defaultOption="Choose..."
                                options={professionList}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
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
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />

                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
