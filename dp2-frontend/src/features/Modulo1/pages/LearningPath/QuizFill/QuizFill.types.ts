export interface Option
{
    id_opcion: number;
    opcion: string;
}

export interface Question
{
    id_pregunta: number;
    pregunta: string;
    opciones: Option[];
}

export interface QuizComponentProps
{
    questions: Question[];
    courseId?: number;
    employeeId?: number;
    lp?: number;
    lpId?: string;
}

export interface QuizComponentState
{
    answers: { [questionId: number]: number };
}