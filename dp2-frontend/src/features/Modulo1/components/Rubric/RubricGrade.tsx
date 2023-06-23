import ReactDOM from 'react-dom';
import React, { Fragment, createRef } from 'react';
import { PropsRubricCriterias, StateRubricCriterias, PropsChoiceBase, StateChoiceBase, Criteria } from './RubricGrade.types';
import { v4 as uuid } from 'uuid';
import levels from './levels.json';

export default class RubricGrade extends React.Component<PropsRubricCriterias, StateRubricCriterias>
{
    static defaultProps = {
        criterias: [],
        disabled: false,
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
            criterias[criteriaIndex].level = criteriaState;
            return { criterias };
        });
    };

    get ()
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

    generate() {
        console.log(this.props.criterias)
    }

    render ()
    {
        return (
            <Fragment>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Criterio de calificación</th>
                            <th>Nivel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.criterias.map((criteria: Criteria, criteriaIndex) =>
                            {
                                return (
                                    <Fragment key={criteriaIndex}>
                                        <tr>
                                            <ChoiceBase disabled={this.props.disabled} key={criteriaIndex} name={criteria.name} choice={criteria.level} limit={criteria.limit}
                                                onChange={criteriaState => this.handleCriteriaChange(criteriaIndex, criteriaState)}
                                            />
                                        </tr>
                                    </Fragment>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    this.props.disabled === false ? 
                    (
                        <div className='text-end'>
                            <button className='btn btn-primary' onClick={() => this.generate()}>Guardar</button>
                        </div>
                    )
                    :
                    (<></>)
                }
            </Fragment>
        )
    }
}

class ChoiceBase extends React.Component<PropsChoiceBase, StateChoiceBase>
{
    static defaultProps = {
        choice: levels[0],
        name: "",
    }

    handleSelectChange (e)
    {
        const selected = levels.find(obj => obj.id === parseInt(e.target.value));
        this.props.onChange(selected);
    }

    render ()
    {
        return (
            <Fragment>
                <td>
                    <p className="mb-0"><small>{this.props.name}</small></p>
                </td>
                <td>
                    {
                        this.props.disabled ?
                            <>
                                <p className="mb-0"><small>{this.props.choice.name}</small></p>
                            </> : <>
                                <select style={{ width: '8rem' }} className="form-select" value={this.props.choice.id} onChange={this.handleSelectChange.bind(this)}>
                                    {
                                        levels.map((item: {
                                            id: number,
                                            name: string,
                                        }, index) =>
                                        {
                                            return (
                                                <Fragment key={index}>
                                                    {
                                                        (item.id <= this.props.limit) ? <>
                                                            <option value={item.id}>{item.name}</option>

                                                        </> : <></>
                                                    }
                                                </Fragment>
                                            )
                                        })
                                    }
                                </select>
                            </>
                    }
                </td>
            </Fragment>
        )
    }
}