import React, { createRef } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import {Props, State} from './RubricGrade.types';

export default class RubricQualification extends React.Component<Props, State>
{

    scores: Array<number>;
    constructor(props) {
        super(props);
        this.scores = []
        this.state = {
            score: 0,
        }
    }
    static defaultProps = {
        rubric: {
            criterias: [
                {
                    label: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    score: 5
                },
                {
                    label: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    score: 7
                },
                {
                    label: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                    score: 4
                },
                {
                    label: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    score: 4
                }
            ]
        },
        disabled: false,
    }

    maxScore() {
        let max = 0;
        this.props.rubric && this.props.rubric.criterias && this.props.rubric.criterias.length && this.props.rubric.criterias.map((criteria, i) => {
            max += criteria.score
        })
        return max;
    }

    getScore() {
        let score = 0;
        this.scores && this.scores.length && this.scores.map((sc, i) => {
            score += sc
        })
        return score;
    }

    componentDidMount() {
        this.props.rubric && this.props.rubric.criterias && (this.scores = new Array(this.props.rubric.criterias.length).fill(0));
    }

    updateScore(sc, i) {
        this.scores[i] = sc;
        this.setState({ score: this.getScore() });
    }

    generate() {
        let rubric = this.props.rubric;
        rubric.studentScore = this.getScore();
        rubric.score = this.maxScore();
        rubric.criterias = rubric.criterias.map((criteria, i) => ({ ...criteria, studentScore: this.scores[i] }))
        return rubric;
    }

    render() {
        return (
            <>
                {
                    this.props.rubric && !Array.isArray(this.props.rubric) && <Table bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Criterio</th>
                                <th style={{ width: 'calc(3 * var(--AWidth))' }}>Puntaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.rubric && this.props.rubric.criterias && this.props.rubric.criterias.length && this.props.rubric.criterias.map((criteria, i) => {
                                    return (<tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{criteria.label}</td>
                                        <td><Form.Control disabled={this.props.disabled} style={{ textAlign: 'right' }} type="number" min="0" max={criteria.score} defaultValue={0} onChange={(e) => this.updateScore(parseInt(e.target.value), i)} /></td>
                                    </tr>)
                                })
                            }
                            <tr style={{ borderTop: 'solid 2px #000' }}>
                                <td></td>
                                <td><b>Total</b></td>
                                <td style={{ textAlign: 'right' }}><b>{this.state.score}</b> / <b>{this.maxScore()}</b></td>
                            </tr>
                        </tbody>
                    </Table>
                }
                <button onClick={() => console.log(this.generate())}>Generar JSON</button>
            </>
        )
    }
}