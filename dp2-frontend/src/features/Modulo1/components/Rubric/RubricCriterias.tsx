import ReactDOM from 'react-dom';
import React, { Fragment, createRef } from 'react';
import { PropsRubricCriterias, StateRubricCriterias, PropsChoiceBase, StateChoiceBase, Criteria } from './RubricCriterias.types';
import { v4 as uuid } from 'uuid';
import proficiencies from './proficiencies.json';

export default class RubricCriterias extends React.Component<PropsRubricCriterias, StateRubricCriterias>
{
    static defaultProps = {
        criterias: [],
    }

    constructor(props)
    {
        super(props);
        this.state = {
            criterias: props.criterias,
        }
    }

    handleCriteriaChange = (criteriaIndex, criteriaState) =>
    {
        this.setState(prevState =>
        {
            const criterias = [...prevState.criterias];
            criterias[criteriaIndex] = criteriaState;
            return { criterias };
        }, () => console.log(this.state.criterias));
    };

    addCriteria = () =>
    {
        const { criterias } = this.state;
        this.setState({ criterias: [...criterias, JSON.parse(JSON.stringify(proficiencies[0]))] });
    };

    removeCriteria = (criteriaIndex) =>
    {
        if (this.state.criterias.length)
        {
            let criterias = this.state.criterias;
            criterias.splice(criteriaIndex, 1);
            this.setState({
                criterias: criterias,
            });
        }
    };

    get()
    {
        return this.state.criterias;
    }

    componentDidUpdate (prevProps: Readonly<PropsRubricCriterias>)
    {
        if (this.props.criterias && prevProps.criterias !== this.props.criterias)
        {
            this.setState({
                criterias: this.props.criterias,
            })
        }
    }

    render ()
    {
        return (
            <Fragment>
                <div>
                    <div className="row mb-2">
                        <div className="col pe-2">
                            <p className="form-label mb-0">Criterio de calificación</p>
                        </div>
                        <div className="col ps-2" style={{ flex: '0 0 4rem' }}>
                        </div>
                    </div>
                </div>
                {
                    this.state.criterias.map((criteria: Criteria, criteriaIndex) =>
                    {
                        return (<ChoiceBase key={criteriaIndex} choice={criteria}
                            onChange={criteriaState => this.handleCriteriaChange(criteriaIndex, criteriaState)}
                            onDelete={() => this.removeCriteria(criteriaIndex)}
                        />)
                    })
                }
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary btn-sm" onClick={this.addCriteria.bind(this)}>Agregar criterio</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

class ChoiceBase extends React.Component<PropsChoiceBase, StateChoiceBase>
{
    static defaultProps = {
        choice: proficiencies[0],
    }

    handleSelectChange (e)
    {
        const selected = proficiencies.find(obj => obj.id === parseInt(e.target.value));
        this.props.onChange(selected);
    }

    handleDelete ()
    {
        this.props.onDelete();
    }

    render ()
    {
        return (
            <Fragment>
                <div className="row mb-3">
                    <div className='col pe-1'>
                        <select className="form-select" value={this.props.choice.id} onChange={this.handleSelectChange.bind(this)}>
                            {
                                proficiencies.map((item: {
                                    id: number,
                                    name: string,
                                }, index) =>
                                {
                                    return (
                                        <Fragment key={index}>
                                            <option value={item.id}>{item.name}</option>
                                        </Fragment>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="col ps-1" style={{ flex: '0 0 4rem' }}>
                        <button className='btn btn-danger h-100 w-100' onClick={this.handleDelete.bind(this)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </Fragment>
        )
    }
}