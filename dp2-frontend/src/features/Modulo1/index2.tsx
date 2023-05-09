import TrainingCard from "./components/Training/TrainingCard";
import LearningPathCard from "./components/LearningPath/LearningPathCard";

const ListExample = () => {
    return (
        <>
            <TrainingCard
                id={'1'}
                name={'Seguridad en el trabajo'}
                photoURL={
                    'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg'
                }
                description={'Capacitación básica de prevención de riesgos laborales en el entorno laboral'}
                creationDate={'20 - 04 - 2023'}
                eventDate={'04 - 05 - 2023'}
                employees={'10'}
            />

            <LearningPathCard
                id={'2'}
                name={'Aprendiendo sobre FrontEnd'}
                photoURL={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGabnZ60I2I1DiXQioIxVA3YIQHZiD4k4W7dE13A4gz2aMYtNmo69xPepv1GmZPp2Dbo&usqp=CAU'
                }
                description={'Curso básico de HTML, CSS y Javascript'}
                creationDate={'20 - 04 - 2023'}
                eventDate={'10 - 04 - 2023'}
                employees={'10'}
            />




        </>
    );
}

export default ListExample