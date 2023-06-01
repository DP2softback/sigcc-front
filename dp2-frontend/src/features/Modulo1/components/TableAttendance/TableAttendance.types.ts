export type THearder = {
    heading: string,
    value: string,
}

export type TBodyEmployee = {
    id: number;
    nombre: string;
    codigo: string;
    area: string;
    asistencia: string;
}

export type Props = {
    tableHeaders: THearder[],
    tableData: TBodyEmployee[] | [],
    pageNumber: number,
    pageSize: number,
    enable: string,
}