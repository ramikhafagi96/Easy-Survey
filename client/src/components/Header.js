import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <nav>
                <div class="nav-wrapper">
                    <a class="left brand-logo">Easy Survey</a>
                    <ul id="nav-mobile" class="right">
                        <li>
                            <a>Login With Google</a>
                            </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header; 