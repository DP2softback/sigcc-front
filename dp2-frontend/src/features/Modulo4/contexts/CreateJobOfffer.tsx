import { createContext, useState } from "react";
import { Control, UseFormReturn } from "react-hook-form";

type TProps = {
	children?: React.ReactNode;
};

interface ICreateJobOffer {
	currentControl: Control;
  setCurrentControl: React.Dispatch<React.SetStateAction<Control>>;
	// localRegister: UseFormReturn;
	// setLocalRegister: React.Dispatch<React.SetStateAction<UseFormReturn>>;
}

const DefaultCreateJobOffer: ICreateJobOffer = {
	currentControl: undefined,
  setCurrentControl: undefined
	// localRegister: undefined,
	// setLocalRegister: undefined
};

const CreateJobOfferContext = createContext<ICreateJobOffer>(
	DefaultCreateJobOffer
);

export const CreateJobOfferProvider: React.FC<TProps> = (props: TProps) => {
	const [currentControl, setCurrentControl] = useState<Control>(null);
	// const [localRegister, setLocalRegister] = useState<UseFormReturn>(null);

	return (
		<CreateJobOfferContext.Provider
			value={{
				currentControl: currentControl,
        setCurrentControl: setCurrentControl
				// localRegister: localRegister,
				// setLocalRegister: setLocalRegister
			}}>
			{props.children}
		</CreateJobOfferContext.Provider>
	);
};

export default CreateJobOfferContext;