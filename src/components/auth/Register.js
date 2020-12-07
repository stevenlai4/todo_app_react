import React, { Component } from 'react';
import FormErrors from '../FormErrors';
import Validate from '../util/Validation';

class Register extends Component {
    //state variables for form inputs and errors
    state = {
        email: '',
        password: '',
        confirmpassword: '',
        errors: {
            blankfield: false,
            matchedpassword: false,
        },
    };

    handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        //in the handleSubmit before you start validation
        this.clearErrors();
        //Perform Validation here
        //in the handleSubmit just before the fetch...
        const error = Validate(event, this.state);
        if (error) {
            this.setState({
                errors: { ...this.state.errors, ...error },
            });
        } else {
            // do the fetch ...
            //Integrate Auth here on valid form submission
            fetch('https://netcoreapi1.azurewebsites.net/Auth/Register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: this.state.email,
                    Password: this.state.password,
                    ConfirmPassword: this.state.confirmpassword,
                }),
            })
                // Response received.
                .then((response) => response.json())
                // Data retrieved.
                .then((json) => {
                    console.log(JSON.stringify(json));
                    // Store token with session data.
                    if (json['status'] == 'OK') {
                        sessionStorage.setItem('bearer-token', json['token']);
                        console.log(sessionStorage.getItem('bearer-token'));
                    } else {
                        // error message handling
                        console.log('Error in Auth/Register');
                    }
                })
                // Data not retrieved.
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    onInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });

        //add to the end of the onInputChange. As the user fixes the error(s) they are cleared
        document.getElementById(event.target.id).classList.remove('is-danger');
    };

    // helper function...be sure to list the state variables specific to the form
    clearErrors = () => {
        this.setState({
            errors: {
                blankfield: false,
                matchedpassword: false,
            },
        });
    };

    render() {
        return (
            <section className="section auth">
                <div className="container">
                    <h1>Register</h1>
                    <FormErrors formerrors={this.state.errors} />
                    <form onSubmit={this.handleSubmit}>
                        <div className="field">
                            <p className="control">
                                <input
                                    className="input"
                                    type="email"
                                    id="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onInputChange}
                                />
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <input
                                    className="input"
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onInputChange}
                                />
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <input
                                    className="input"
                                    type="password"
                                    id="confirmpassword"
                                    placeholder="Confirm password"
                                    value={this.state.confirmpassword}
                                    onChange={this.onInputChange}
                                />
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button className="button is-success">
                                    Register
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}
export default Register;
