import React, { Fragment } from 'react';
import { PropsRubricCriterias, StateRubricCriterias, PropsChoiceBase, StateChoiceBase, Criteria } from './RubricGrade.types';
import levels from './levels.json';

export default class RubricGrade extends React.Component<PropsRubricCriterias, StateRubricCriterias>
{
    static defaultProps = {
        criterias: [
            {
                "id": 1,
                "name": "Capacidad para crear aplicaciones y sitios web utilizando tecnologías como HTML, CSS, JavaScript, y frameworks populares como React, Angular o Vue.js.",
                "score": 60
            }
        ],
        disabled: false,
    }

    constructor(props)
    {
        super(props);
        let criterias = props.criterias;
        if (props.disabled)
        {
            criterias = props.criterias.map(item => {
                const score = item.score;
                const option = levels.find(op => op.score === score);
                if (option) {
                    item.score = { id: option.id, name: option.name, score: score };
                }
                return item;
            });
        }
        this.state = {
            criterias: criterias,
        }
    }

    handleCriteriaChange = (criteriaIndex, criteriaState) =>
    {
        this.setState(prevState =>
        {
            const criterias = [...prevState.criterias];
            criterias[criteriaIndex].score = criteriaState;
            return { criterias };
        });
    };

    get ()
    {
        const criterias = this.state.criterias.map(obj => {
            const score = obj.score ? obj.score.score : 0;
            return {
              id: obj.id,
              name: obj.name,
              score: score
            };
          });
        return criterias;
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

                <table className="table">
                    <thead>
                        <tr>
                            <th>Criterio de calificación</th>
                            <th>Escala</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.criterias.map((criteria: Criteria, criteriaIndex) =>
                            {
                                return (
                                    <Fragment key={criteriaIndex}>
                                        <tr>
                                            <ChoiceBase disabled={this.props.disabled} key={criteriaIndex} name={criteria.name} choice={criteria.score}
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
                                <button className='btn btn-primary' onClick={() => console.log(this.get())}>Guardar</button>
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
                                                    <option value={item.id}>{item.name}</option>
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