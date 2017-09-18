import React from 'react';
import { Route, Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class MenuBar extends React.Component {

    render() {

        return (
            <div className="menuBar">
                <ul>
                    <li>
                        {/*<Link to="/"><img className="logo" src="when3meet-logo.png" /></Link>*/}
                        <Link to="/">WTF <strong>WPI</strong></Link>
                    </li>
                    <li>
                        <Link to="/about-us">About</Link>
                    </li>

                    <li>
                        <a className="loginButton" href="#">Login</a>
                    </li>
                </ul>
            </div>
        );

    }
}
/*
const mapStateToProps = state => ({
    count: state.counter.count,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changeToAbout: () => push('/about-us'),
    changeToHome: () => push('/')
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar)
*/