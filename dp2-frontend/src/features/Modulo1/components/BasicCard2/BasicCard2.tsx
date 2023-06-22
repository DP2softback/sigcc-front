import React, { Component, Fragment, createRef } from 'react';
import { ThreeDots } from 'react-bootstrap-icons'
import type { Props } from './BasicCard2.types';
import { Link } from 'react-router-dom';
import './BasicCard2.css';

class BasicCard2 extends Component<Props>
{
    refRoot: any;

    constructor(props: any) {
        super(props);
        this.refRoot = createRef();
    }

    render() {

        let imageComp = null;
        let widthC = "24rem";

        if (this.props.image != null) {
            imageComp = (
                <img src={this.props.image}
                    alt={`Imagen de ${this.props.title}`}
                    className="basicCard-image"
                    // style={{ borderRadius: this.props.imageStyle }}
                />
            );
        }

        if (this.props.widthC != null) widthC = `${this.props.widthC}`;

        type Employee = {
            id: string;
            name: string;
            code: string;
            area: string;
            position: string;
            image: string;
        }

        const employees: Employee[] = [
            {
                id: this.props.id,
                name: this.props.title,
                code: this.props.items[0].text,
                area: this.props.subtitle,
                position: this.props.items[1].text,
                image: this.props.image,
            }
        ]


        const handleClick = (e: any) => {
            if (this.props.button1Text === "Agregar" && this.props.typeCard === "Empleado") {
                this.props.option(employees)
            }
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
                <div className='basicCard-container'>
                    <div className='basicCard-imageContainer'>{imageComp}</div>
                    <div className='basicCard-header'>                        
                        <div className="basicCard-headerLine">
                            <div className='basicCard-headerInfo'>
                                <div className='basicCard-title'>{this.props.title}</div>
                            </div>
                            {this.props.options == 'SI' &&
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
                        <>
                            <div className='basicCard-subtitle'>{this.props.subtitle}</div>
                        </>

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
                            <>
                                {(this.props.button1Link != "") ?
                                    <Link to={this.props.button1Link}>
                                        <button type="button" className="btn btn-primary btn1" style={{ backgroundColor: this.props.button1Color, border: "none" }} onClick={handleClick}>{this.props.button1Text}</button>
                                    </Link>
                                    :
                                    <button type="button" className="btn btn-primary btn1" style={{ backgroundColor: this.props.button1Color, border: "none" }} onClick={handleClick}>{this.props.button1Text}</button>
                                }
                            </>

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
export default BasicCard2;