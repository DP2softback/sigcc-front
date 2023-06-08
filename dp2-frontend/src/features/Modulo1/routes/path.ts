/*----- Ruta de Aprendizaje -----*/
export const LEARNING_PATH_INDEX = '/modulo1/rutadeaprendizaje';
export const LEARNING_PATH_ADDCOURSE = '/modulo1/curso/agregar/:learningPathId';
export const LEARNING_PATH_DETAIL = '/modulo1/rutadeaprendizaje/detalle/:learningPathId';
export const LEARNING_PATH_ASSIGNMENT = '/modulo1/rutadeaprendizaje/asignacion/:learningPathId';

/*----- Curso Empresa -----*/
export const ORG_COURSE_INDEX = '/modulo1/cursoempresa';
export const ORG_COURSE_CREATE = '/modulo1/cursoempresa/creacion/:trainingID';
export const ORG_COURSE_DETAIL = '/modulo1/cursoempresa/detalle/:trainingID';
export const ORG_COURSE_ATTENDANCE = '/modulo1/cursoempresa/detalle/:trainingID/asistencia/:sessionID';
export const ORG_COURSE_ASSIGNMENT = '/modulo1/cursoempresa/asignacion/:trainingID';


/*----- Vista Empleado LP -----*/
export const EMP_LEARNING_PATH_INDEX = '/modulo1/empleado/rutadeaprendizaje';
export const EMP_LEARNING_PATH_DETAIL = '/modulo1/empleado/rutadeaprendizaje/detalle/:learningPathId';

/*----- Vista Empleado CE -----*/
export const EMP_ORG_COURSE_INDEX = '/modulo1/empleado/cursoempresa';
export const EMP_ORG_COURSE_DETAIL = '/modulo1/empleado/cursoempresa/sessions/:trainingID';

