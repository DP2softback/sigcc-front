import PageContainer from "@components/PageContainer";
import EnhancedHeaderTitle from "@components/EnhancedHeaderTitle";
import CandidateRegisterForm from "./CandidateRegisterForm";
import { CreateJobOfferProvider } from "@features/Modulo4/contexts/CreateJobOfffer";

const CreateJobOffer = () => {
	return (
		<>
			<EnhancedHeaderTitle pageTitle="Registro en oferta laboral">
				A continuacion, ingresa tus datos para crearte un perfil en nuestro sistema
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
