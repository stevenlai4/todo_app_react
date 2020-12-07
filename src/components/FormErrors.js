import React from 'react';

function FormErrors(props) {
    // currently only validating for two types of errors, blankfield and mismatched password on Register
    if (
        props.formerrors &&
        (props.formerrors.blankfield || props.formerrors.matchedpassword)
    ) {
        return (
            <div className="error container help is-danger">
                <div className="row justify-content-center">
                    {props.formerrors.matchedpassword
                        ? 'Password value does not match confirm password value'
                        : ''}
                </div>
                <div className="row justify-content-center help is-danger">
                    {props.formerrors.blankfield
                        ? 'All fields are required'
                        : ''}
                </div>
            </div>
        );
    } else {
        return <div />;
    }
}

export default FormErrors;
