import { useEffect, useState } from 'react';
import './learning-path-details.css';
import learningPathDetails from './learningPathDetails.json';
import { Link, useParams } from 'react-router-dom';
import axiosInt from '@config/axios';
import Sidebar from '@components/Sidebar';
import sidebarItems from '@features/Modulo1/utils/sidebarItemsE'
import '../../../../content/common.css';
import { ArrowLeftCircleFill, People, BarChart } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import Rate from '@features/Modulo1/components/Rate';


function LearningPathDetails(props: any) {
    const { learningPathId } = useParams();
    const [loading, setLoading] = useState(null);
    const [lpName, setLPName] = useState<any>("");
    const [lpDescription, setLPDescription] = useState<any>("");
    const [lpPhoto, setLPPhoto] = useState<any>("");
    const [lpParticipants, setLPParticipants] = useState<any>("");
    const [lpRate, setLPRate] = useState<any>("");
    const [courses, setCourses] = useState<any>([]);
    const [activo, setActivo] = useState(1);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    let url_foto_default = 'https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'

    const loadsCourses = () => {
        setLoading(true);
        axiosInt.get(`capacitaciones/learning_path/detalle_empleado/1/${learningPathId}/`)
            .then(function (response) {
                console.log(response.data)
                setLPName(response.data.nombre);
                setLPDescription(response.data.descripcion);
                setLPPhoto(response.data.url_foto);
                setCourses(response.data.cursos);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        loadsCourses();
    }, []);


    return (
        <>
            <Sidebar items={sidebarItems} active='/modulo1/empleado/rutadeaprendizaje'>
                {
                    loading ?
                        <>
                            <div className='vertical-align-parent' style={{ height: 'calc(100vh - 4rem)' }}>
                                <div className='vertical-align-child'>
                                    <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </> :
                        <>
                            <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                                <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                                    <Link to={`/modulo1/empleado/rutadeaprendizaje`} className="float-right"><ArrowLeftCircleFill style={{ height: "32px", width: "32px", color: "black" }} /></Link>
                                </div>

                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ paddingRight: "2rem" }}>
                                        {
                                            lpPhoto === null ?
                                                (<img src={url_foto_default} style={{ borderRadius: "10rem", width: "6rem", height: "6rem" }}></img>)
                                                :
                                                (<img src={lpPhoto} style={{ borderRadius: "10rem", width: "6rem", height: "6rem" }}></img>)
                                        }
                                    </div>
                                    <div>
                                        <h1 className='screenTitle'>{lpName}</h1>
                                        <p><small className='subtitle'>{lpDescription}</small></p>
                                    </div>
                                </div>
                            </div>

                            <div className='pt-5 pb-2' style={{display: "flex", justifyContent: "space-evenly"}}>
                                <div style={{display: "flex"}}>
                                    {courses.map((course: any) => (
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <div key={course.curso.id} className= {`circulo ${course.nro_orden-1 == activo ? 'activo' : ''}`}>{course.nro_orden-1}</div>
                                            {(course.nro_orden-1) !== courses.length && <div className="linea" style={{paddingLeft: "2rem"}}></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/*            
                            <div className="row mt-3 flex-nowrap overflow-x-auto">
                                {courses.map((course: any) => (
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={course.curso.id}>
                                        <div className="card h-100">
                                            {/* <img
                                                src={course.course_udemy_detail.image_480x270}
                                                className="card-img-top"
                                                alt="Card"
                                            /> 
                                            <div className="card-body">
                                                <h6 className="card-title">{course.curso.nombre}</h6>
                                                <p><small className="opacity-50">{course.curso.descripcion}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {
                                    courses.length === 0 && <>
                                        <div className='col'>
                                            <div className='card'>
                                                <div className='card-body'>
                                                    <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                        <div className='vertical-align-child'>
                                                            <h5 className='opacity-50 text-center'>No hay cursos en la ruta de aprendizaje</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                            */}
                        </>
                }
            </Sidebar>
        </>
    );
}

export default LearningPathDetails;
