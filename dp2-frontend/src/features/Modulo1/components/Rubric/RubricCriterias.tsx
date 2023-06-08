import ReactDOM from 'react-dom';
import React, { Fragment, createRef } from 'react';
import {PropsRubricCriterias, StateRubricCriterias, PropsChoiceBase, StateChoiceBase} from './RubricCriterias.types';
import { v4 as uuid } from 'uuid';

export default class RubricCriterias extends React.Component<PropsRubricCriterias, StateRubricCriterias>
{
    static defaultProps = {
        placeholder: "Título de la pregunta de selección única",
        disabled: false,
    }

    constructor (props)
    {
        super(props);
        this.state = {
            label: "",
            options: [0],
            errorNoOptions: false,
        }
    }

    references = [];

    componentDidMount ()
    {
        // ReactDOM.findDOMNode(this).scrollIntoView({
        //     behavior: 'smooth',
        // })
    }

    addNewOption ()
    {
        let newOption = this.state.options[this.state.options.length - 1] + 1
        if (!this.state.options.length)
            newOption = 0;
        this.setState({
            options: [...this.state.options, newOption]
        })
    }

    generate ()
    {
        this.setState({ errorNoOptions: false });
        let error = false;
        let a = {};
        let o = [];
        this.references.forEach((ref) =>
        {
            if (ref.current)
            {
                let criteria = ref.current.getCriteria();
                !criteria && (error = true);
                criteria && o.push(criteria);

            }
        })
        if (!o.length)
        {
            this.setState({ errorNoOptions: true });
            error = true;
        }
        if (error === true) return null;
        a["criterias"] = o;
        console.log(JSON.stringify(a));
        return a;
    }

    removeOption (value)
    {
        var array = this.state.options;
        var index = array.indexOf(value);
        if (index !== -1)
        {
            array.splice(index, 1);
            this.setState({
                options: array
            });
        }
    }

    resetValidator ()
    {
        this.setState({
            errorNoOptions: false,
        })
    }

    render ()
    {
        return (
            <Fragment>
                <div className='alert alert-danger mb-3' hidden={!this.state.errorNoOptions}>
                    La pregunta debe tener al menos un criterio de calificación.
                </div>
                <div className="rubric animate__animated animate__zoomIn animate__faster">
                    <div className="row mx-0 mb-2">
                        <div className="col pe-2">
                            <b>Criterio de calificación</b>
                        </div>
                        <div className="col ps-2 pe-2" style={{ flex: '0 0 6rem' }}>
                            <b>Puntaje</b>
                        </div>
                        <div className="col ps-2" style={{ flex: '0 0 4rem' }}>
                        </div>
                    </div>
                </div>
                <div className="row mx-0">
                    {this.state.options.map((element) =>
                    {
                        const ref = createRef<ChoiceBase>();
                        this.references.push(ref);
                        return (<ChoiceBase disabled={this.props.disabled} resetValidator={this.resetValidator.bind(this)} type="select" ref={ref} key={element} removeOption={this.removeOption.bind(this)} value={element} />)
                    })}
                </div>
                <div className="row mx-0">
                    <div className="col">
                        <button className="btn btn-primary" onClick={() => { this.addNewOption(); this.setState({ errorNoOptions: false }) }}>Agregar criterio</button>
                    </div>
                </div>
                <button onClick={() => console.log(this.generate())}>Exportar</button>
            </Fragment>
        )
    }
}

class ChoiceBase extends React.Component<PropsChoiceBase, StateChoiceBase>
{
    static defaultProps = {
        placeholder: "Describe un criterio de calificación",
        type: "select",
        disabled: false,
    }

    constructor (props)
    {
        super(props);
        this.state = {
            label: "",
            errorEmptyLabel: false,
            errorEmptyScore: false,
        }
    }

    componentDidMount ()
    {
        // ReactDOM.findDOMNode(this).scrollIntoView({
        //     behavior: 'smooth',
        // })
    }

    scoreRef = React.createRef<HTMLInputElement>();

    getCriteria ()
    {
        let error = false;
        if (!this.state.label.length)
        {
            this.setState({ errorEmptyLabel: true })
            error = true;
        }
        if (!this.scoreRef.current.value.length)
        {
            this.setState({ errorEmptyScore: true })
            error = true;
        }
        if (error) return null;
        let c = {};
        c["label"] = this.state.label;
        c["score"] = parseInt(this.scoreRef.current.value);
        return c;
    }

    render ()
    {
        var removeOption: any = this.props.removeOption;
        return (
            <Fragment>
                <div className="rubric mb-3">
                    <div className="row">
                        <div className="col pe-2">
                            <textarea className='form-control' rows={2} placeholder={this.props.placeholder} onChange={event => { this.setState({ label: event.target.value, errorEmptyLabel: false }); this.props.resetValidator() }} />
                            <label hidden={!this.state.errorEmptyLabel} className="text-muted text-error">
                                Este campo es obligatorio
                            </label>
                        </div>
                        <div className="col ps-2 pe-2" style={{ flex: '0 0 6rem' }}>
                            <input type="number" className='form-control' disabled={this.props.disabled} min={1} max={this.props.max ? this.props.max : 20} defaultValue={1} ref={this.scoreRef} onChange={() => this.setState({ errorEmptyScore: false })} />
                            <label hidden={!this.state.errorEmptyScore} className="text-muted text-error">
                                *
                            </label>
                        </div>
                        <div className="col ps-2" style={{ flex: '0 0 4rem' }}>
                            <button className='btn btn-danger w-100' value={this.props.value} onClick={() => removeOption(this.props.value)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}