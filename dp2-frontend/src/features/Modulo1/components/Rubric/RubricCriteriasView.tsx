import React, { createRef } from 'react';
import { Table, Form } from 'react-bootstrap';
import {Props, State} from './RubricCriteriasView.types';

export default class RubricCriteriasView extends React.Component<Props, State>
{
    scores: Array<number>
    constructor(props) {
        super(props);
        this.scores = []
        this.state = {
            score: 0,
        }
    }
    static defaultProps = {
        rubric: {
            "criterias": [
                {
                    "label": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    "score": 5,
                    "studentScore": 0
                }
            ],
            "studentScore": 0,
            "score": 20
        }
    }



    componentDidMount() {
    }
    render() {
        return (
            <>
                {
                    this.props.rubric && <Table bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Criterio</th>
                                <th style={{ width: 'calc(3 * var(--AWidth))' }}>Puntaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.rubric.criterias && this.props.rubric.criterias.length && this.props.rubric.criterias.map((criteria, i) => {
                                    return (<tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{criteria.label}</td>
                                        <td style={{ textAlign: 'right' }}>{criteria.score}</td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </Table>
                }
            </>
        )
    }
}