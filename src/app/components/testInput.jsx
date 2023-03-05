import React from "react";
import PropTypes from "prop-types";

const TestInput = ({ type, name, placeholder, value, onChange, error }) => {
    return (
        <>
            <input
                className="form-control"
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error && <p>{error}</p>}
        </>
    );
};

TestInput.defaultProps = {
    type: "text"
};

TestInput.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TestInput;
