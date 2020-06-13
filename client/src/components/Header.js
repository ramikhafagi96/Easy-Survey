import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
class Header extends Component {
    // Helper Methods
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/api/auth/google">Login With Google</a></li>;
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li><Link
                        to={'/surveys'}
                        className="right"
                    >
                        Dashboard
                    </Link>
                    </li>,
                    <li key="2" style={{ margin: '0 10px' }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="3"><a href="/api/auth/logout">Logout</a></li>
                ]
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                        style={{ marginLeft: '10px' }}
                    >
                        Easy Survey
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return {
        auth
    };
}

export default connect(mapStateToProps)(Header); 