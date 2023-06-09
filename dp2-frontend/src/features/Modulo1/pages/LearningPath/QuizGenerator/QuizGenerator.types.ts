export interface Option
{
    id_opcion: number;
    opcion: string;
    es_correcta: boolean;
}

export interface Question
{
    id_pregunta: number;
    pregunta: string;
    opciones: Option[];
}

export interface QuizGeneratorProps
{
    quizId: number;
    title: string;
}
export interface QuizGeneratorState
{
    questions: Question[];
    currentQuestionId: number;
}