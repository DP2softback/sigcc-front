import PageContainer from "@components/PageContainer";
import EnhancedHeaderTitle from "@components/EnhancedHeaderTitle";
import CandidateRegisterForm from "./CandidateRegisterForm";
import { CreateJobOfferProvider } from "@features/Modulo4/contexts/CreateJobOfffer";

const CreateJobOffer = () => {
	

	return (

			<>
				<EnhancedHeaderTitle pageTitle="Crear posición">
				Configuración para la creación de una posición o puesto laboral
			</EnhancedHeaderTitle>
			<main>
        <CreateJobOfferProvider>
				  <CandidateRegisterForm />
        </CreateJobOfferProvider>
			</main>
			</>

	);
};

export default CreateJobOffer;
