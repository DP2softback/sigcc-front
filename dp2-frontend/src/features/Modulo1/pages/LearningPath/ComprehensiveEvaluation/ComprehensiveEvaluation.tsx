import axiosInt from '@config/axios';
import FileDropzone from '@features/Modulo1/components/FileDropzone';
import RubricCriterias from '@features/Modulo1/components/Rubric/RubricCriterias';
import React, { Component, Fragment, createRef } from 'react';

interface Props
{
    learningPathId: string,
    data: any,
}

interface State
{
    canSend: boolean,
    data: any,
}

class LearningPathComprehensiveEvaluation extends Component<Props, State>
{
    refCloseModal: any;
    refDescription: any;
    refRubricCriterias: any;
    refFileDropzone: any;

    constructor(props: any)
    {
        super(props);
        this.refCloseModal = createRef();
        this.refDescription = createRef();
        this.refRubricCriterias = createRef();
        this.refFileDropzone = createRef();
        this.state = {
            canSend: true,
            data: {},
        }
    }

    static defaultProps = {
        learningPathId: 0,
    }

    handleAssignmentClick ()
    {
        let a = {
            descripcion_evaluacion: this.refDescription.current.value,
            criterias: this.refRubricCriterias.current ? this.refRubricCriterias.current.get() : this.state.data.criterias,
            documentos: this.refFileDropzone.current.getFiles()
        }
        axiosInt.post(`capacitaciones/learning_path/${this.props.learningPathId}/competencias/`, a)
            .then((response) =>
            {
                this.refCloseModal.current.click();
                // window.location.reload();
            });
    }

    handleCanSend (value)
    {
        this.setState({
            canSend: value,
        })
    }

    loadsEvaluation ()
    {
        axiosInt.get(`capacitaciones/learning_path/${this.props.learningPathId}/competencias/`)
            .then((response) =>
            {
                this.setState({ data: response.data });
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }

    componentDidMount ()
    {
        this.loadsEvaluation();
    }

    render ()
    {
        return (
            <>
                <div id="comprehensiveEvaluationModal" className="modal">
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Evaluación integral</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal">
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className='row mb-4'>
                                    <div className="col">
                                        <label className="form-label">Descripción</label><textarea ref={this.refDescription} className="form-control" defaultValue={this.state.data.descripcion_evaluacion}></textarea>
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col'>
                                        <h5>Rúbrica de evaluación</h5>
                                        <RubricCriterias ref={this.refRubricCriterias} criterias={this.state.data.criterias} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <h5>Documentos</h5>
                                        <FileDropzone ref={this.refFileDropzone} canSend={this.handleCanSend.bind(this)} prevFiles={this.state.data.documentos} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button ref={this.refCloseModal} type="button" className="btn btn-light" data-bs-dismiss="modal">
                                    Cancelar
                                </button>
                                <button disabled={!this.state.canSend} type="button" className="btn btn-primary" onClick={this.handleAssignmentClick.bind(this)}>
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LearningPathComprehensiveEvaluation;