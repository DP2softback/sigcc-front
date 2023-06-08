export type TopicObj = {
    id?: number;
    nombre: string;
}

export type SupplierObj = {
    id: number
    nombres?: string;
    apellidos?: string;
}

export type SessionObj = {
    id?: number;
    nombre: string;
    descripcion: string;
    fecha_inicio?: string;
    ubicacion?: string;
    aforo_maximo?: number;
    url_video?: string;
    temas: TopicObj[];
    responsables: SupplierObj[];
}

export type Props = {
    sessions: SessionObj[],
    trainingType: string,
    mode: string
}