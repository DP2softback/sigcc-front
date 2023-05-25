export type Props = {
    page: number;
    totalPages: number;
    handlePagination: (page: number) => void;
    setPosition: (page: number) => void;    
    position: number;
    mostrar:  number;
}

