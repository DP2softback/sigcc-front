import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Competencia, tipoCompetencia, AreaActiva } from "../GestionDeCompetencias/Tipos";
import { DEMAND_COMPANY_COURSES, DEMAND_COMPANY_COURSES_LIST } from '@features/Modulo2/routes/path';

import { TOKEN_SERVICE, URL_SERVICE } from '@features/Modulo2/services/ServicesApis'


const SelectDemandCourses = () => {
    const navigate = useNavigate();

    useEffect(() => {

    });

    return (
        <div className="container">
            Aqui va la pantalla para seleccionar la demanda de cursos de la area y puesto elegida
        </div>
    );
};
export default SelectDemandCourses