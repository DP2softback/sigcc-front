import React, { Component, Fragment, createRef } from 'react';
import { ThreeDots } from 'react-bootstrap-icons'
import type { Props } from './BasicCard.types';
import { Link } from 'react-router-dom';
import './BasicCard.css';

class BasicCard extends Component<Props>
{
    refRoot: any;

    constructor(props: any) {
        super(props);
        this.refRoot = createRef();
    }


    render() {



        let imageComp = null;

        if (this.props.image != null) {
            imageComp = (
                <img src={this.props.image}
                    alt={`Imagen de ${this.props.title}`}
                    className="basicCard-image"
                    style={{ borderRadius: this.props.imageStyle }}
                />
            );
        }

        function showIcon(icon) {
            if (icon == null)
                return <></>
            return <div className="basicCard-icon">{icon}</div>;
        }

        function simpleRow(item) {
            return (
                <div className="basicCard-row">
                    {showIcon(item.icon)}
                    <div className="basicCard-text">{item.text}</div>
                    {item.aditional != null ? (
                        <div className="basicCard-aditional"
                            style={{ backgroundColor: item.aditional.backgroundColor, color: item.aditional.color, marginTop: item.aditional.margin }}>
                            {item.aditional.text}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            );
        }

        function badgesRow(item) {
            return (
                <div className="basicCard-row">
                    {item.list.map((element, index) => {
                        return (
                            <div key={index}
                                className="basicCard-badge"
                                style={{ backgroundColor: item.backgroundColor }}>
                                {element}
                            </div>
                        );
                    })}
                </div>
            );
        }


        return (
            <>
                <div className='basicCard-container' style={{ width: '460px' }}>
                    <div className='basicCard-header'>
                        <div className="basicCard-headerLine">
                            <div className='basicCard-imageContainer'>{imageComp}</div>
                            <div className='basicCard-headerInfo'>
                                <div className='basicCard-title'>{this.props.title}</div>
                                {this.props.subtitle != null &&
                                    <>
                                        <div className='basicCard-subtitle'>{this.props.subtitle}</div>
                                    </>
                                }
                            </div>
                            {this.props.options == 'SI' &&
                                // <ThreeDots className='basicCard-dots' />
                                <div>
                                    <div className="dropdown">
                                        <button className="btn basicCard-dots" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            ...
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Usar como plantilla</a></li>
                                            <li><a className="dropdown-item" href="#">Desactivar</a></li>
                                        </ul>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                    <div className='basicCard-body'>
                        {(this.props.items != null) &&
                            this.props.items.map((item, index) => {
                                return (
                                    <div key={index}>
                                        {!item.hasOwnProperty("list") ? simpleRow(item) : badgesRow(item)}
                                    </div>
                                );
                            })
                        }
                    </div>

                    <div className={`${this.props.button2 == 'SI' ? 'basicCard-footer-2b' : 'basicCard-footer-1b'}`}>
                        {(this.props.button1 == 'SI') &&
                            <button type="button" className="btn btn-primary btn1">{this.props.button1Text}</button>
                        }

                        {(this.props.button2 == 'SI') &&
                            <button type="button" className="btn btn-primary btn2">{this.props.button2Text}</button>
                        }
                    </div>
                </div>
            </>
        )
    }
}
export default BasicCard;