import {Criteria} from "@features/Modulo1/components/Rubric/RubricCriterias.types"

export type LearningPath = {
    nombre: string,
    descripcion: string,
    url_foto: string,
    suma_valoraciones: number,
    cant_valoraciones: number,
    cant_empleados: number,
    horas_duracion: number,
    cant_intentos_cursos_max: number,
    cant_intentos_evaluacion_integral_max: number,
    estado: number,
    cantidad_cursos: number,
    rubrica: Array<Criteria>,
}

export type Course = {
    id: number,
    nombre: string,
    descripcion: string,
    duracion: string,
    cant_valoraciones: number,
    suma_valoracionees: number,
    nro_orden: number,
    cant_intentos_max: number,
    tipo_curso: string,
    udemy_id: number,
    course_udemy_detail: any,
    estado: number,
    tipo: string,
    es_libre: boolean,
    url_foto: string,
    fecha_creacion: string,
    fecha_primera_sesion: string,
    fecha_ultima_sesion: string,
    cantidad_empleados: number,
    cantidad_sesiones: number,
}

export type LPData = {
    learning_path: LearningPath,
    cursos: Array<Course>,
}

export type Props = {
    data: LPData,
}

export type State = {
    data: LPData,
}