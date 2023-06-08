import React, { createRef } from 'react';
import { Table, Form } from 'react-bootstrap';
import {Props, State} from './RubricView.types';

export default class RubricView extends React.Component<Props, State>
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
                },
                {
                    "label": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    "score": 7,
                    "studentScore": 0
                },
                {
                    "label": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                    "score": 4,
                    "studentScore": 0
                },
                {
                    "label": "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "score": 4,
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
                                        <td style={{ textAlign: 'right' }}>{criteria.studentScore} / {criteria.score}</td>
                                    </tr>)
                                })
                            }
                            <tr style={{ borderTop: 'solid 2px #000' }}>
                                <td></td>
                                <td><b>Total</b></td>
                                <td style={{ textAlign: 'right' }}><b>{this.props.rubric.studentScore}</b> / <b>{this.props.rubric.score}</b></td>
                            </tr>
                        </tbody>
                    </Table>
                }
            </>
        )
    }
}