import { Link, useNavigate } from 'react-router-dom';
import './learning-path.css';
import axiosInt from '@config/axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import Sidebar from '@features/Modulo1/components/Sidebar';
import sidebarItems from '../../utils/sidebarItems';


function LearningPath (props: any)
{
    const [lps, setLps] = useState([]);
    const [lpsFiltered, setLpsFiltered] = useState([]);
    const navigate = useNavigate();

    const refLpName = useRef<HTMLInputElement>(null);
    const refLpDescription = useRef<HTMLTextAreaElement>(null);

    const createLP = () =>
    {
        const data = {
            nombre: refLpName.current?.value,
            descripcion: refLpDescription.current?.value,
        }

        axiosInt.post('curso/learning_path/', data)
            .then(function (response)
            {
                navigate(`/learningpath/detail/${response.data.id}`);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }
    const loadLPs = () =>
    {
        axiosInt.get('curso/learning_path/')
            .then(function (response)
            {
                setLps(response.data);
                setLpsFiltered(response.data);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }

    useEffect(() =>
    {
        loadLPs();
    }, []);

    const handleFilter = (e: any) =>
    {
        const searchTerm = e.target.value;
        const filtered = lps.filter((item: any) =>
            item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setLpsFiltered(filtered);
    };

    return (
        <>
            <Sidebar items={sidebarItems} active='capacitacion'>
                <div className='row mt-3'>
                    <div className='col'>
                        <h1>Rutas de aprendizaje</h1>
                        <p><small className='opacity-50'>Lista de Learnings Paths creados que los empleados pueden completar para adquirir habilidades y competencias específicas.</small></p>
                    </div>
                    <div style={{ flex: '0 0 15rem' }} className="col text-end">
                        <button type="button" className="btn btn-primary" data-bs-target="#createLPModal" data-bs-toggle="modal">
                            <span className='me-3'>Crear ruta</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input className="form-control" type="text" placeholder="Buscar" onChange={handleFilter} />
                    </div>
                </div>
                <div className='row row-cols-1 row-cols-md-3 align-items-stretch g-3 py-3 px-0 mx-0'>
                    {
                        lpsFiltered.map((lp: {
                            id: number,
                            nombre: string,
                            descripcion: string
                        }, i: number) =>
                        {
                            return <Fragment key={i}>
                                <div className='cols'>
                                    <div className="card">
                                        {/* <img src={lp.photo} className="card-img-top" alt="..." /> */}
                                        <div className="card-body">
                                            <h6 className="card-title">{lp.nombre}</h6>
                                            <p className="card-text opacity-50"><small>{lp.descripcion}</small></p>
                                            <div className="d-flex gap-2 w-100 justify-content-between">
                                                <span></span>
                                                <Link to={`/learningpath/detail/${lp.id}`} className="btn btn-primary float-right">Detalles</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        })
                    }
                </div>
                {
                    lpsFiltered.length === 0 && <>
                        <div className='row align-items-stretch g-3 py-3'>
                            <div className='col'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                            <div className='vertical-align-child'>
                                                <h5 className='opacity-50 text-center'>Crea un Learning Path para empezar</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </Sidebar>
            <div className="modal fade" id="createLPModal" aria-hidden="true" aria-labelledby="createLPModal" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">Crear Learning Path</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Nombre</label>
                                <input ref={refLpName} type="text" className="form-control" />
                            </div>
                            <div>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Descripción</label>
                                <textarea ref={refLpDescription} className="form-control" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" data-bs-target="#createLPModal" data-bs-toggle="modal" onClick={createLP}>Crear</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LearningPath;
