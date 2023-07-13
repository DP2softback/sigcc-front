import { string } from "zod";

export  type Competencia = {
    id: number;
    code: string;
    name: string;
    description: string;
    type: number;
    isActive: boolean;
  };

export  type tipoCompetencia = {
    id: number,
    abbreviation: string;
    name: string;
    description: string;
    isActive: boolean;
    upperType: boolean;
  }

export type CompetenciaTrabajador = {
  competence_code: string,
  competence_name: string,
  competence_type: string,
  levelCurrent: number,
  levelRequired: number,
  likeness: number
}
  
export type EmpleadoDeArea = {
  id: number,
  user__first_name: string,
  user__last_name: string,
  position__name: string,
  area__name: string,
  user__email: string,
  user__is_active: boolean
}

export type AreaActiva = {
  id: number,
  name: string
}

export type Posicion = {
  position__id: number,
  position__name: string
}

export type comp2={
  competencia: number,
  competencia_nombre: string,
}

export type comp={
  competencias: comp2[],
  curso: number,
  curso_nombre:string

}