import React, { Component } from 'react'
import { Nav, Button } from 'reactstrap'
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';

export class HeaderNavBar extends Component {
    render() {
        return (
            <div className="link-me-background"
                aria-label="background image of an arm with rose tattoos holding flowers in a bath">
                <Nav className="navbar navbar-expand-sm navbar-expand-md">
                    <div className="container-fluid">
                        <a className="navbar" href="index.html">
                            <h1><Link className='link-heading'to='/'>Ink Me!</Link></h1>
                        </a>
                        <div className="dropdown float-right">
                            <Button type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-bars light-bar" aria-label="menu"></i>
                            </Button>
                            <div className="dropdown-menu">
                                <NavLink className="dropdown-item" to="/artists">Artists</NavLink>
                                {/* <NavLink className="dropdown-item" to="/styles">Styles</NavLink> */}
                                <NavLink className="dropdown-item" to="/inkme">InkMe</NavLink>
                            </div>
                        </div>
                        <div id="expanded-menu">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <NavLink className="main-links" to="/artists">Artists</NavLink>
                                    </div>
                                    {/* <div className="col">
                                        <a className="main-links" href="#">Styles</a>
                                    </div> */}
                                    <div className="col">
                                        <NavLink className="main-links" to="/inkme">InkMe</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Nav>
            </div>
        )
    }
}

export class ContactInformation extends Component {
    render() {
        return (
            <div className="container-fluid text-center">
                <div className="row">
                    <div className="col">
                        <h4>Creators</h4>
                        <p>Tracy Huynh</p>
                        <p>Rahma Kamel</p>
                    </div>
                    <div className="col">
                        <h4>Contact</h4>
                        <a href="mailto:ischool.uw.edu">ischool.uw.edu</a>
                    </div>
                    <div className="col">
                        <h4>Copyright</h4>
                        <p>© Tracy Huynh</p>
                        <p>© Rahma Kamel</p>
                        <p>Photos from Instagram</p>
                    </div>
                </div>
            </div>
        )
    }
}