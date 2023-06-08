import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./ModalExportarReporte.css";
import { getPlantillas } from "@features/Modulo3/services/templates";
import Template from "@features/Modulo3/components/Cards/Template/Template";
import { navigateTo } from "@features/Modulo3/utils/functions";

const ModalChooseTemplate = (props) => {
	const { show, setShow, tipo, employeeId, employeeName, navigate } = props;
	const [isLoading, setIsLoading] = useState(true);
	const [plantillas, setPlantillas] = useState([]);
	const imagen = {
		image:
			"https://media.istockphoto.com/id/1374487428/es/vector/altavoz-de-meg%C3%A1fono-3d-o-altavoz-meg%C3%A1fono-para-anunciar-promoci%C3%B3n-altavoz-de-meg%C3%A1fono-con.jpg?s=612x612&w=0&k=20&c=T_IXBnvEl28k5MTrzMoiO9xwQypsT1VzngBvTlR2S0s=",
		imageStyle: "100px"
	};

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const response = await getPlantillas();
			if (response) setPlantillas(response[tipo]);
			setIsLoading(false);
		})();
	}, []);

	const handleClose = () => {
		setShow(false);
	};

	const handleSeleccion = (template) => {
		setShow(false);
		navigateTo(navigate, {
			id: employeeId,
			name: employeeName,
			idPlantilla: template["plantilla-id"]
		});
	};

	const templates = (
		<div className="pl-templates">
			{plantillas &&
				plantillas.length > 0 &&
				plantillas.map((template) => {
					return (
						<div key={template["plantilla-id"]}>
							<Template
								key={template["plantilla-id"]}
								image={imagen.image}
								imageStyle={imagen.imageStyle}
								name={template["plantilla-nombre"]}
								onClick={() => handleSeleccion(template)}
							/>
						</div>
					);
				})}
		</div>
	);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Elegir Plantilla</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>{templates}</div>
			</Modal.Body>
		</Modal>
	);
};
export default ModalChooseTemplate;
