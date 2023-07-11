import { useEffect, useState } from 'react';
import { formatDashboardJson, navigateBack, navigateTo } from '@features/Modulo3/utils/functions';
import { Form, Button } from 'react-bootstrap';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import NoDataFound from '@features/Modulo3/components/Shared/NoDataFound/NoDataFound';
import cat from '@features/Modulo3/jsons/Categories';
import { CATEGORIES_DETAIL, CATEGORIES_INDEX } from '@features/Modulo3/routes/path';
import TableCompetencia from '@features/Modulo3/components/Tables/TableCompetencia';
import ModalConfirmacion from '@features/Modulo3/components/Modals/ModalConfirmacion';
import 'react-toastify/dist/ReactToastify.css'; 
import { toast, ToastContainer } from 'react-toastify';
import ModalAddSubcategorie from '@features/Modulo3/components/Modals/ModalAddSubcategorie';
import { listSubcategories } from '@features/Modulo3/services/categories';

const Detail = () => {
  const urlParams = new URLSearchParams(window.location.search);
	const [show,setShow] = useState(false);
	const [showAS,setShowAS] = useState(false);
	const [idSubCat,setIdSubCat]=useState(-1);
  const [categorie, setCategorie] = useState({
    id: parseInt(urlParams.get('id')),
    name: urlParams.get('name')
  });
  const [categories,setCategories]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [competencias, setCompetencias]=useState([]);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
       const response= await listSubcategories(categorie.id)
      setCompetencias(response);
      setIsLoading(false);
    })();
  }, []);

  const filters = (
		<Form.Group controlId="searchEmployees" className="d-flex justify-content-end">
			<Form.Control
				type="date"
				placeholder="Fecha inicio"
				className="me-2 w-auto"
			/>
			<Form.Control
				type="date"
				placeholder="Fecha fin"
				className="me-2 w-auto"
			/>
			<Button variant="primary">Buscar</Button>
		</Form.Group>
  );


  const table =(
    <div >
      <TableCompetencia rows ={competencias} setShow={setShow} setIdSubCat={setIdSubCat}/>
    </div>
  );

  const content = (
		<>
			{competencias && competencias.length > 0 ? (
				<div className="row mt-32">
					{table}
				</div>
			) : (
				<NoDataFound />
			)}
			<div className="text-end">
				<Button
					variant="outline-primary me-2"
					onClick={() => {
						navigateBack();
					}}>
					Volver
				</Button>
				<Button onClick={()=>setShowAS(true)}>
					Agregar nueva competencia
				</Button>
			</div>
		</>
	);

  const body = (
    <Section
      title={"Competencias"}
      content={isLoading ? <LoadingScreen/> : content}

    />
  );

  return (
		<div>
			<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />  
			<ModalAddSubcategorie show={showAS} setShow={setShowAS} idCategory={categorie.id}></ModalAddSubcategorie>
			<ModalConfirmacion show={show} setShow={setShow} type={"subcategoria"} idSubCat={idSubCat} idCategorie={categorie.id}></ModalConfirmacion>
			<Layout
				title={`Categoría - ${categorie.name}`}
				body={body}
				route={CATEGORIES_DETAIL}
				subtitle={``}
			/>
		</div>
	);
};

export default Detail;