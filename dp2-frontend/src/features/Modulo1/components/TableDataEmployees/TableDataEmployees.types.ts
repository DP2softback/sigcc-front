export type THearder = {
    heading: string;
    value: string;
}

export type TBodyEmployee = {
    id?: number;
    first_name: string;
    last_name: string;
    estado: string;
    fecha_completado: string;
}

export type Props = {
    tableHeaders: THearder[];
    tableData: TBodyEmployee[];
    action: any;
}