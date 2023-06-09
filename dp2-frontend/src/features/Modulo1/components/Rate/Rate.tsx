import React, { Component, Fragment } from 'react';
import type { Props, State } from './Rate.types';
import './rate.css';
import { v4 as uuidv4 } from 'uuid';

class Rate extends Component<Props, State>
{
    uuid: any;
    constructor(props: any)
    {
        super(props);
        this.uuid = uuidv4();
    }
    static defaultProps = {
        rate: 3,
        disabled: false,
        size: 'medium',
        className: '',
    }

    render ()
    {
        return (
            <>
                <fieldset style={{scale: .5}} className={`${this.props.className} rating-control ${this.props.size === 'small' ? 'rating-control-small' : ''}`} defaultValue={this.props.rate}>
                    <input title='5 estrellas' type='radio' id={`star5-${this.uuid}`} name={`rating-${this.uuid}`} value={5} defaultChecked={this.props.rate === 5} disabled={this.props.disabled} />
                    <label htmlFor={`star5-${this.uuid}`} title=''></label>
                    <input title='4 estrellas' type='radio' id={`star4-${this.uuid}`} name={`rating-${this.uuid}`} value={4} defaultChecked={this.props.rate === 4} disabled={this.props.disabled} />
                    <label htmlFor={`star4-${this.uuid}`} title=''></label>
                    <input title='3 estrellas' type='radio' id={`star3-${this.uuid}`} name={`rating-${this.uuid}`} value={3} defaultChecked={this.props.rate === 3} disabled={this.props.disabled} />
                    <label htmlFor={`star3-${this.uuid}`} title=''></label>
                    <input title='2 estrellas' type='radio' id={`star2-${this.uuid}`} name={`rating-${this.uuid}`} value={2} defaultChecked={this.props.rate === 2} disabled={this.props.disabled} />
                    <label htmlFor={`star2-${this.uuid}`} title=''></label>
                    <input title='1 estrella' type='radio' id={`star1-${this.uuid}`} name={`rating-${this.uuid}`} value={1} defaultChecked={this.props.rate === 1} disabled={this.props.disabled} />
                    <label htmlFor={`star1-${this.uuid}`} title=''></label>
                </fieldset>
            </>
        );
    }
}

export default Rate;