import { useEffect, useState } from 'react';
import './learning-path-details.css';
import learningPathDetails from './learningPathDetails.json';
import { Link, useParams } from 'react-router-dom';
import axiosInt from '@config/axios';
import Sidebar from '@features/Modulo1/components/Sidebar';
import sidebarItems from '@features/Modulo1/utils/sidebarItems';
import '../../../content/common.css';

function LearningPathDetails (props: any)
{
    const { learningPathId } = useParams();
    const [lpName, setLPName] = useState<any>("");
    const [lpDescription, setLPDescription] = useState<any>("");
    const [courses, setCourses] = useState<any>([]);

    const loadsCourses = () =>
    {
        axiosInt.get(`capacitaciones/learning_path/${learningPathId}/course/`)
            .then(function (response)
            {
                setLPName(response.data.nombre);
                setLPDescription(response.data.descripcion);
                setCourses(response.data.curso_x_learning_path);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }

    useEffect(() =>
    {
        loadsCourses();
    }, []);

    const handleRemoveCard = (id: number) =>
    {
        axiosInt.delete(`capacitaciones/learning_path/${learningPathId}/course/detail/${id}`)
            .then(function (response)
            {
                const updatedCourses = courses.filter((course: any) => course.id !== id);
                setCourses(updatedCourses);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    };

    return (
        <>
            <Sidebar items={sidebarItems} active='/modulo1/rutadeaprendizaje'>
                <div className='col'>
                    <h1>{lpName}</h1>
                    <p><small className='opacity-50'>{lpDescription}.</small></p>
                </div>
                <div className='d-flex gap-2 w-100 justify-content-between'>
                    <h4>Cursos seleccionados</h4>
                    <Link to={`/modulo1/curso/agregar/${learningPathId}`} className='btn btn-primary'>Agregar cursos</Link>
                </div>
                <div className="row mt-3 flex-nowrap overflow-x-auto">
                    {courses.map((course: any) => (
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={course.course_udemy_detail.id}>
                            <div className="card h-100">
                                <img
                                    src={course.course_udemy_detail.image_480x270}
                                    className="card-img-top"
                                    alt="Card"
                                />
                                <div className="card-body">
                                    <h6 className="card-title">{course.course_udemy_detail.title}</h6>
                                    <p><small className="opacity-50">{course.course_udemy_detail.headline}</small></p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveCard(course.id)}
                                    >
                                        Quitar
                                    </button>
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
                                                <h5 className='opacity-50 text-center'>Agrega un curso para empezar</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className='mt-3 d-flex gap-2 w-100 justify-content-between'>
                    <h4>Empleados asignados</h4>
                    <Link to={`/course/add/${learningPathId}`} className='btn btn-primary'>Agregar empleados</Link>
                </div>
            </Sidebar>
        </>
    );
}

export default LearningPathDetails;
