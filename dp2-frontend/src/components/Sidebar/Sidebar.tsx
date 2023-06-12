import React, { Component, Fragment, createRef } from 'react';
import type { Props, State } from './Sidebar.types';
import { Link } from 'react-router-dom';
import './sidebar.css';
class Sidebar extends Component<Props, State>
{
    refRoot: any;

    constructor(props: any)
    {
        super(props);
        this.refRoot = createRef();
    }

    toggleSidebar = () =>
    {
        const root = this.refRoot.current;
        if (root.classList.contains('expanded'))
        {
            root.classList.remove('expanded');
        }
        else
        {
            root.classList.add('expanded');
        }
    }

    render ()
    {
        return (
            <>
                <div ref={this.refRoot}>
                    <div className='sidebar-container'>
                        <div className="d-flex flex-shrink-0  app-sidebar">
                            <button className='app-menu-btn btn btn-link' onClick={this.toggleSidebar.bind(this)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </button>
                            <ul className="nav nav-pills nav-flush mb-auto text-center sidebar-options">
                                {
                                    this.props.items.map((item, i) =>
                                    {
                                        return (
                                            <Fragment key={i}>
                                                <li className="nav-item">
                                                    <Link to={item.to}
                                                        className={`nav-link d-flex justify-content-between py-3 ${item.to === this.props.active ? 'active' : ''}`}
                                                        aria-current="page">
                                                        {item.icon}
                                                        <span className='nav-item-label'>{item.label}</span>
                                                    </Link>
                                                </li>

                                            </Fragment>
                                        )
                                    })
                                }
                            </ul>
                            <div className="dropdown">
                                <a href="#" className="sidebar-options-dropdown d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" className="rounded-circle" />
                                </a>
                                <ul className="dropdown-menu text-small shadow m-3">
                                    <li><a className="dropdown-item" href="#">Perfil</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='main-container'>
                        <div className="row">
                            <div className='col'>
                                <div className='container-fluid'></div>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Sidebar;