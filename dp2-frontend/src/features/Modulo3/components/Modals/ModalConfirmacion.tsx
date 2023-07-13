import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./ModalExportarReporte.css";
import { eliminarPlantilla, getPlantillas } from "@features/Modulo3/services/templates";
import Template from "@features/Modulo3/components/Cards/Template/Template";
import { navigateTo } from "@features/Modulo3/utils/functions";
import { ToastContainer, toast } from "react-toastify";
import { EVALUATION_TEMPLATE_INDEX } from "@features/Modulo3/routes/path";
import { eliminarSubcategorie } from "@features/Modulo3/services/categories";


const ModalConfirmacion = (props) => {
	const { show, setShow, idPlantilla,type,idSubCat,idCategorie,setEditar } = props;

	function delay(ms: number): Promise<void> {
		return new Promise<void>((resolve) => {
		  setTimeout(resolve, ms);
		});
	  }
	const handleClose = () => {
		setShow(false);
	};
	const closeNotification = async () => {
		await delay(4000);
		type === "plantilla" ? navigateTo(EVALUATION_TEMPLATE_INDEX): window.location.reload();
	  };

	const handleEliminarPlantilla = () => {
		(async () => { 
			const response = await eliminarPlantilla(idPlantilla);
			if (response){
			  toast.success("Se ha eliminado correctamente la plantilla");
			  setShow(false);
			  closeNotification();
			}
		  })();
	}

	const handleEliminarSubCate = () => {
		(async () => { 
			const response = await eliminarSubcategorie(idSubCat,idCategorie);
			if (response){
				toast.success("Se ha quitado correctamente la competencia");
				setShow(false);
				closeNotification();
			}
		  })();

	}
	const handleEditar = () => {
		setEditar(true);
		setShow(false);

	}


	return (
		<Modal show={show} onHide={handleClose}>
			    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />  

			<Modal.Header closeButton>
				<Modal.Title>{
					type === "plantilla" ?
					<div>Eliminar Plantilla</div> :type === "editar" ?<div> Editar Plantilla</div>:<div> Eliminar Competencia</div> 	
					}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{type === "plantilla" ? 
				<div>¿Esta seguro que quieres eliminar la plantilla actual?</div>
				:
				type==="editar"?
				<div>¿Esta seguro que quieres editar la plantilla seleccionada?</div>
				:
				<div>¿Esta seguro que quieres quitar la competencia seleccionada?</div>
				}
				
			</Modal.Body>
            <Modal.Footer>
            <Button variant='outline-primary' className='boton-dejar mr-10' onClick={() => setShow(false)}>
       			Volver
     		</Button>
			{type==="editar"?
			<Button variant="primary" onClick={handleEditar}>
			Editar
			</Button>
			:
			<Button variant="danger" onClick={type==="plantilla"? handleEliminarPlantilla :handleEliminarSubCate}>
			{type==="plantilla"? <div>Eliminar</div> :<div>Quitar</div>}
            </Button>
			}

            </Modal.Footer>
		</Modal>
	);
};
export default ModalConfirmacion;
