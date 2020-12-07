import React, { Component } from 'react';
import FormErrors from '../FormErrors';
import Validate from '../util/Validation';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {
            blankfield: false,
        },
    };

    handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        //in the handleSubmit before you start validation
        this.clearErrors();
        //Form validation
        //in the handleSubmit just before the fetch...
        const error = Validate(event, this.state);
        if (error) {
            this.setState({
                errors: { ...this.state.errors, ...error },
            });
        } else {
            // do the fetch ...
            //Integrate Auth here on valid form submission
            fetch('https://netcoreapi1.azurewebsites.net/Auth/Login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: this.state.email,
                    Password: this.state.password,
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
                        console.log('Error in Auth/Login');
                    }
                })
                // Data not retrieved.
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    // helper function...be sure to list the state variables specific to the form
    clearErrors = () => {
        this.setState({
            errors: {
                blankfield: false,
            },
        });
    };

    onInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });

        //add to the end of the onInputChange. As the user fixes the error(s) they are cleared
        document.getElementById(event.target.id).classList.remove('is-danger');
    };

    render() {
        return (
            <section className="section auth">
                <div className="container">
                    <h1>Log in</h1>
                    <FormErrors formerrors={this.state.errors} />
                    <form onSubmit={this.handleSubmit}>
                        <div className="field">
                            <p className="control">
                                <input
                                    className="input"
                                    type="text"
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
                                <button className="button is-success">
                                    Login
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default Login;
