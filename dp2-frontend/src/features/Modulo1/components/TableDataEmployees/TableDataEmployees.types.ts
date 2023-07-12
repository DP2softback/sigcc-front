export type THearder = {
    heading: string;
    value: string;
}

export type Props = {
    tableHeaders: THearder[];
    tableData: any[];
    action: any;
}