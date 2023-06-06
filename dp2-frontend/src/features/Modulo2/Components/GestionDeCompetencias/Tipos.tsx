export  type Competencia = {
    id: number;
    code: string;
    name: string;
    description: string;
    type: number;
    active: boolean;
  };


export  type tipoCompetencia = {
    id: number,
    abbreviation: string;
    name: string;
    description: string;
    active: boolean;
    upperType: boolean;
  }

export type CompetenciaTrabajador = {
  competence__code: string,
  competence__name: string,
  competence__type__name: string,
  levelCurrent: number,
  levelRequired: number,
  levelGap: number,
  description: string
}
  