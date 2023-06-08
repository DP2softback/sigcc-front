export type THearder = {
    heading: string;
    value: string;
}

export type TBodyEmployee = {
    id: number;
    nombre: string;
    estado: number;
    nota: number;
    intento: number;
    fecha_completado?: string;
}

export type Props = {
    tableHeaders: THearder[];
    tableData: TBodyEmployee[];
    action: any;
}