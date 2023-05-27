import React, { Component, Fragment, createRef } from 'react';
import { ThreeDots } from 'react-bootstrap-icons'
import type { Props } from './SupplierCard.types';
import { Link } from 'react-router-dom';
import '../BasicCard/BasicCard.css';
import './SupplierCard.css';

class SupplierCard extends Component<Props>
{
    refRoot: any;

    constructor(props: any) {
        super(props);
        this.refRoot = createRef();
    }

    


    render() {

        let imageComp = null;
        let widthC = '300px';

        if (this.props.image != null) {
            imageComp = (
                <img src={this.props.image}
                    alt={`Imagen de ${this.props.name}`}
                    className="basicCard-image"
                    style={{ borderRadius: "100px" }}
                />
            );
        }
        
        type Supplier = {
            id: string;
            name: string;
            image: string;
            capacities: any[];    
        }

        const suppliers: Supplier[] = [
            {
                id: this.props.id,
                name: this.props.name,
                capacities: this.props.capacities,
                image: this.props.image,
            }
        ]
        

        const handleClick = (e: any) => {
            if(this.props.button === "Agregar"){
                this.props.option(suppliers)
            }
        }
        

        function showIcon(icon) {
            if (icon == null)
                return <></>
            return <div className="basicCard-icon">{icon}</div>;
        }

        function simpleRow(item) {
            return (
                <div className="supplierCard-row">
                    {showIcon(item.icon)}
                    <div className="basicCard-text">{item.text}</div>
                    {item.aditional != null ? (
                        <div className="basicCard-aditional">
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
                <div className="supplierCard-row">
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
                <div className='basicCard-container' style={{ width: widthC}}>
                    <div className='basicCard-header'>
                        <div className="basicCard-headerLine">
                            <div className='basicCard-imageContainer'>{imageComp}</div>
                            <div className='basicCard-headerInfo'>
                                <div className='basicCard-title'>{this.props.name}</div>                               
                            </div>
                        </div>
                    </div>
                    <div className='basicCard-body'>
                        {(this.props.capacities != null) &&
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridGap: "10px" }}>
                                {
                                this.props.capacities.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            {!item.hasOwnProperty("list") ? simpleRow(item) : badgesRow(item)}
                                        </div>
                                    );
                                })
                                }
                            </div>
                        }
                    </div>

                    <div className='basicCard-footer-1b'>
                        {(this.props.button != '') &&
                            <>                                
                               <button type="button" className="btn btn-primary btn1" style={{backgroundColor: this.props.buttonColor, border: "none"}}  onClick={handleClick}>{this.props.button}</button>                                      
                            </>
                                                      
                        }
                        
                    </div>
                </div>
            </>
        )
    }
}
export default SupplierCard;