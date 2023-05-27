import React, { Component, Fragment, createRef } from 'react';
import { ThreeDots } from 'react-bootstrap-icons'
import type { Props } from './Pagination.types';
import { Link } from 'react-router-dom';
import './Pagination.css';


class Pagination extends Component<Props>
{

    refRoot: any;

    constructor(props: any) {
        super(props);
        this.refRoot = createRef();
    }


    render() {

        const handlePage1 = (e: any) => {
            this.props.handlePagination(1)
            this.props.setPosition(0)
        }

        const handlePageF = (e: any) => {
            this.props.handlePagination(this.props.totalPages)
            console.log(this.props.totalPages)
            console.log(this.props.position + (this.props.totalPages-this.props.page)*this.props.mostrar)
            this.props.setPosition(this.props.position + (this.props.totalPages-this.props.page)*this.props.mostrar)
        }

        const handlePrevious = (e: any) => {
            this.props.handlePagination(this.props.page - 1)
            this.props.setPosition(this.props.position - this.props.mostrar)
        }

        const handlePrevious2 = (e: any) => {
            this.props.handlePagination(this.props.page - 2)
            this.props.setPosition(this.props.position - 2*this.props.mostrar)
        }


        const handleNext = (e: any) => {
            this.props.handlePagination(this.props.page + 1)
            this.props.setPosition(this.props.position + this.props.mostrar)
        }


        const handleNext2 = (e: any) => {
            this.props.handlePagination(this.props.page + 2)
            this.props.setPosition(this.props.position + 2*this.props.mostrar)
        }


        return (
            <>

                <div>
                    <div className="paginationWrapper">
                        {this.props.page !== 1 && (
                            <button
                                onClick={handlePrevious}
                                type="button"
                                className="pageItem sides"
                            >
                                &lt;
                            </button>
                        )}

                        <button
                            onClick={handlePage1}
                            type="button"
                            className= {`pageItem ${this.props.page === 1 ? 'active' : ''} `}
                        >
                            {1}
                        </button>

                        {this.props.page > 3 && <div className="separator">...</div>}

                        {this.props.page === this.props.totalPages && this.props.totalPages > 3 && (
                            <button
                                onClick={handlePrevious2}
                                type="button"
                                className="pageItem"
                            >
                                {this.props.page - 2}
                            </button>
                        )}

                        {this.props.page > 2 && (
                            <button
                                onClick={handlePrevious}
                                type="button"
                                className="pageItem"
                            >
                                {this.props.page - 1}
                            </button>
                        )}

                        {this.props.page !== 1 && this.props.page !== this.props.totalPages && (
                            <button
                                onClick={() => this.props.handlePagination(this.props.page)}
                                type="button"
                                className="pageItem active"
                            >
                                {this.props.page}
                            </button>
                        )}

                        {this.props.page < this.props.totalPages - 1 && (
                            <button
                                onClick={handleNext}
                                type="button"
                                className="pageItem"
                            >
                                {this.props.page + 1}
                            </button>
                        )}

                        {this.props.page === 1 && this.props.totalPages > 3 && (
                            <button
                                onClick={handleNext2}
                                type="button"
                                className="pageItem"
                            >
                                {this.props.page + 2}
                            </button>
                        )}

                        {this.props.page < this.props.totalPages - 2 && <div className="separator">...</div>}

                        <button
                            onClick={handlePageF}
                            type="button"
                            className= {`pageItem ${this.props.page === this.props.totalPages ? 'active' : ''} `}
                        >
                            {this.props.totalPages}
                        </button>

                        {this.props.page !== this.props.totalPages && (
                            <button
                                onClick={handleNext}
                                type="button"
                                className="pageItem sides"
                            >
                                &gt;
                            </button>
                        )}
                    </div>
                </div>

            </>
        )
    }



}

export default Pagination;