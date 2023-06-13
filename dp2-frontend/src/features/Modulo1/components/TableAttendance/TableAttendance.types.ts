export type THearder = {
    heading: string;
    value: string;
}

export type TBodyEmployee = {
    empleado: number;
    nombre?: string;
    estado_asistencia: boolean;
}

export type Props = {
    tableHeaders: THearder[];
    tableData: TBodyEmployee[];
    enable: string;
    trainingID: string;
    sessionID: string;
    mode: string;
}