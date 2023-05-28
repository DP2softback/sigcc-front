export type Topics = {
    id: number;
    nombre: string;
}

export type Session = {
    curso_empresa_id?: number;
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_limite?: string;
    ubicacion?: string;
    aforo_maximo?: number;
    url_video?: string;
    temas: Topics[];
}

export type Props = {
    sessions: Session[],
    trainingType: string,
}