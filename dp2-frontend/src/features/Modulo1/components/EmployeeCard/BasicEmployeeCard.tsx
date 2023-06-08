import React, { Component, Fragment, createRef } from 'react';
import { ThreeDots } from 'react-bootstrap-icons'
import type { Props } from './BasicEmployeeCard.types';
import { Link } from 'react-router-dom';
import '../BasicCard/BasicCard.css';

class BasicEmployeeCard extends Component<Props>
{
    refRoot: any;

    constructor(props: any) {
        super(props);
        this.refRoot = createRef();
    }

    render() {

        let imageComp = null;
        let widthC = '460px';

        if (this.props.image != null) {
            imageComp = (
                <img src={this.props.image}
                    alt={`Imagen de ${this.props.title}`}
                    className="basicCard-image"
                    style={{ borderRadius: this.props.imageStyle }}
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
            if (this.props.button1Text === "Agregar") {
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
                    
                    <div className={`${this.props.button2 == 'SI' ? 'basicCard-footer-2b' : this.props.button1 == 'SI' ? 'basicCard-footer-1b' : ''}`}>
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
export default BasicEmployeeCard;