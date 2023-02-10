import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    handleDelete,
    bookmark,
    onToggleBookMark
}) => {
    return (
        <>
            <tr key={_id}>
                <td>{name}</td>
                <td>
                    {qualities.map((qualitie) => (
                        <Qualitie key={qualitie._id} {...qualitie} />
                    ))}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate} /5</td>
                <td>
                    <BookMark
                        status={bookmark}
                        onClick={() => onToggleBookMark(_id)}
                    />
                </td>
                <td>
                    <button
                        className={"btn btn-danger"}
                        onClick={() => handleDelete(_id)}
                    >
                        Удалить
                    </button>
                </td>
            </tr>
        </>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array,
    profession: PropTypes.object,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
    bookmark: PropTypes.bool,
    onToggleBookMark: PropTypes.func
};

export default User;
