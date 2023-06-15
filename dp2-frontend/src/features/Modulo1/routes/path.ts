export const TRAINING_MANAGMENT_MODULE = 'modulo1';

/*---- Ruta de Aprendizaje -----*/
export const LEARNING_PATH_INDEX = 'rutadeaprendizaje';
export const LEARNING_PATH_ADDCOURSE = 'curso/agregar/:learningPathId';
export const LEARNING_PATH_DETAIL = 'detalle/:learningPathId';
export const LEARNING_PATH_ASSIGNMENT = 'asignacion/:learningPathId';

/*----- Curso Empresa -----*/
export const ORG_COURSE_INDEX = 'cursoempresa';
export const ORG_COURSE_CREATE = 'creacion/:trainingID';
export const ORG_COURSE_DETAIL = 'detalle/:trainingID';
export const ORG_COURSE_ATTENDANCE = 'detalle/:trainingID/asistencia/:sessionID';
export const ORG_COURSE_ASSIGNMENT = 'asignacion/:trainingID';


/*----- Vista Empleado LP -----*/
export const EMP_LEARNING_PATH_INDEX = 'empleado/rutadeaprendizaje';
export const EMP_LEARNING_PATH_DETAIL = 'detalle/:learningPathId';

/*----- Vista Empleado CE -----*/
export const EMP_ORG_COURSE_INDEX = 'empleado/cursoempresa';
export const EMP_ORG_COURSE_DETAIL = 'sessions/:trainingID';