import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import GroupList from "./groupList";
import SeachStatus from "./seachStatus";
import UsersTable from "../components/usersTable";
import _ from "lodash";
import TestInput from "./testInput";
import { validator } from "../utils/validator";
const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [users, setUsers] = useState();
    const [data, setData] = useState({ name: "" });
    const [errors, setErrors] = useState({});
    const pageSize = 8;

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsers(newArray);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handelProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        console.log("page: ", pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(target.value);
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
             isName: {
                message: "Введеное имя не существует в списке"
             },
            isNameNonWhitespaceCharacter: {
                message: "не существует в списке"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const searchInputName = () => {
            if (data.name !== "") {
                return users.filter((user) => user.name.toLowerCase().trim() === data.name.toLowerCase().trim());
            } else {
                return userCrop;
            }
        };

        const clearFilter = () => {
            setSelectedProf();
            searchInputName();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handelProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {" "}
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SeachStatus length={count} />
                    {count > 0 && (
                        <form onSubmit={handleSubmit}>
                            <TestInput
                                placeholder="Имя..."
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <UsersTable
                                users={searchInputName()}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                handleDelete={handleDelete}
                                onToggleBookMark={handleToggleBookMark}
                                error={errors.name}
                            />
                        </form>
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

UsersList.propTypes = {
    users: PropTypes.func
};

export default UsersList;
