import axiosInt from '@config/axios';
import React, { Component, Fragment, createRef } from 'react';
import { PlusLg, DashLg } from 'react-bootstrap-icons';



interface Employee
{
    id: number,
    email: string;
    fullName: string;
    endDate: Date;
}

interface EmployeeRowProps
{
    employee: Employee;
    onUpdateDate: any;
    onRemove: () => void;
}

class EmployeeRow extends Component<EmployeeRowProps> {
    render ()
    {
        const { id, email, fullName, endDate } = this.props.employee;
        return (
            <Fragment>
                <div className='card mb-3'>
                    <div className='card-header'>
                        <div className='d-flex justify-content-between'>
                            {fullName}
                            <button className='btn-close' onClick={this.props.onRemove} />
                        </div>
                    </div>
                    <div className='card-body'>
                        <div className='row row-cols-sm-1 row-cols-md-2 g-3'>
                            <div className='col'>
                                <div className="form-floating">
                                    <input id={`floatingEmail-${id}`} type='email' className='form-control' value={email} readOnly />
                                    <label htmlFor={`floatingEmail-${id}`}>Correo electrónico</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-floating">
                                    <input id={`floatingLimitDate-${id}`} type='date' className='form-control' defaultValue={endDate.toISOString().split('T')[0]} onChange={this.props.onUpdateDate} />
                                    <label htmlFor={`floatingLimitDate-${id}`}>Fecha límite</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

interface EmployeeAssignmentModalProps
{
    assignFunction: any,
}

interface EmployeeAssignmentModalState
{
    employees: Employee[];
    newEmployeeEmail: string;
    errorMsg: string;
}

class LearningPathAssignment extends Component<
    EmployeeAssignmentModalProps,
    EmployeeAssignmentModalState
> {
    refCloseModal: any;
    constructor(props: EmployeeAssignmentModalProps)
    {
        super(props);
        this.state = {
            employees: [],
            newEmployeeEmail: '',
            errorMsg: '',
        };
        this.refCloseModal = createRef();
    }

    handleNewEmployeeEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({ newEmployeeEmail: e.target.value });
    };

    handleAddEmployee = async () =>
    {
        const { newEmployeeEmail, employees } = this.state;

        this.state.errorMsg.length > 0 && this.setState({
            errorMsg: '',
        })
        await axiosInt.post('capacitaciones/learning_path/search_employee/', {
            email: newEmployeeEmail,
        })
            .then((res) =>
            {
                const endDate = employees.length > 0 ? employees[employees.length - 1].endDate : new Date();
                const newEmployee: Employee = {
                    id: res.data.id,
                    email: newEmployeeEmail,
                    fullName: res.data.first_name + " " + res.data.last_name,
                    endDate,
                };

                this.setState({
                    employees: [...employees, newEmployee],
                    newEmployeeEmail: '',
                });

            })
            .catch((err) =>
            {
                this.setState({
                    errorMsg: err.msg,
                })
                return undefined;
            })
    };

    handleRemoveEmployee = (index: number) =>
    {
        const { employees } = this.state;
        const updatedEmployees = [...employees];
        updatedEmployees.splice(index, 1);

        this.setState({ employees: updatedEmployees });
    };

    handleEmployeeDateChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) =>
    {
        const { employees } = this.state;
        const updatedEmployees = [...employees];
        const item = updatedEmployees.splice(index, 1)[0];
        item.endDate = new Date(e.target.value);
        updatedEmployees.splice(index, 0, item);
        this.setState({ employees: updatedEmployees }, () => { console.log(updatedEmployees) });
    };

    handleAssignmentClick()
    {
        const {employees} = this.state;
        const updatedEmployees = employees.map((employee: Employee) => {
            employee['fecha_limite'] = employee.endDate.toISOString();
            delete employee.endDate;
            delete employee.email;
            delete employee.fullName;
            return employee
        })
        this.props.assignFunction(this.state.employees, this.refCloseModal);
    }

    render ()
    {
        const { employees, newEmployeeEmail } = this.state;
        const handleEmployeeDateChange = this.handleEmployeeDateChange.bind(this);
        return (
            <>
                <div id="assignmentModal" className="modal">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Asignar empleados</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal">
                                </button>
                            </div>
                            <div className="modal-body">
                                {
                                    this.state.errorMsg.length > 0 ?
                                        <>
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.errorMsg}
                                            </div>
                                        </> : <></>
                                }
                                {employees.map((employee, index) => (
                                    <EmployeeRow
                                        key={index}
                                        employee={employee}
                                        onUpdateDate={(e) => this.handleEmployeeDateChange(e, index)}
                                        onRemove={() => this.handleRemoveEmployee(index)}
                                    />
                                ))}
                                <div className='row'>
                                    <div className='col pe-0'>
                                        <input value={newEmployeeEmail} onChange={this.handleNewEmployeeEmailChange} className="form-control" type='email' placeholder='Introduce un correo electrónico' />
                                    </div>
                                    <div className='col' style={{ flex: '0 0 1rem' }}>
                                        <button className='btn btn-primary' onClick={this.handleAddEmployee}>
                                            <PlusLg />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button ref={this.refCloseModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-primary" onClick={this.handleAssignmentClick.bind(this)}>
                                    Asignar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LearningPathAssignment;