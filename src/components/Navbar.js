import React from 'react';

export default function Navbar() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <a href="/" className="navbar-item">
                        Home
                    </a>
                    <a href="/todos" className="navbar-item">
                        To Dos
                    </a>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="auth-buttons">
                            <a
                                href="/register"
                                className="button is-light is-success"
                            >
                                <strong>Register</strong>
                            </a>
                            <a
                                href="/login"
                                className="button is-light is-link"
                            >
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
