import { useEffect, useState } from 'react';
import { formatDashboardJson, navigateTo } from '@features/Modulo3/utils/functions';
import { Form, Button } from 'react-bootstrap';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import TableCategories from '@features/Modulo3/components/Tables/TableCategories';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import NoDataFound from '@features/Modulo3/components/Shared/NoDataFound/NoDataFound';
import cat from '@features/Modulo3/jsons/Categories';
import { listAllCategorias } from '@features/Modulo3/services/categories';
import { CATEGORIES_CREATE, CATEGORIES_INDEX } from '@features/Modulo3/routes/path';
import '../EvaluacionContinua/EvaluacionContinua.css';
import 'react-toastify/dist/ReactToastify.css'; 
import { CONTINUOS_EVALUATION_TYPE } from '@features/Modulo3/utils/constants';
import ModalAddCategorie from '@features/Modulo3/components/Modals/ModalAddCategorie';
import { toast, ToastContainer } from 'react-toastify';
import ModalConfirmacion from '@features/Modulo3/components/Modals/ModalConfirmacion';


const Index = () => {

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show,setShow] = useState(false);
	const [showAS,setShowAS] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);


  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await listAllCategorias(CONTINUOS_EVALUATION_TYPE);
      if(response){
        setCategories(response)

      }
        
      setIsLoading(false);
    })();
  }, []);



useEffect(() => {
  const filteredData = categories.filter((category) =>
    category.name.toLowerCase().includes(filterValue.toLowerCase())
  );
  setFilteredCategories(filteredData);
}, [filterValue, categories]);

  
  const filters = (
    <Form.Group controlId="searchEmployees" className="d-flex justify-content">
      <Form.Control
        placeholder="Buscar categoría"
        aria-describedby="ec-indexSearch"
        className="me-2 w-90"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
    </Form.Group>
  );

  


  const table =(
    <div>
      <TableCategories rows ={filteredCategories}/>
    </div>
  );

  const content = (
		<>
			{categories && categories.length > 0 ? (
				<div className="row mt-32">
					{table}
				</div>
			) : (
				<NoDataFound />
			)}
			<div className="text-end">
				<Button onClick={()=>setShowAS(true)}>
					Agregar nueva categoría
				</Button>
			</div>
		</>
	);

  const body = (
    <Section
      title={"Categorías"}
      content={isLoading ? <LoadingScreen/> : content}
      filters={filters}
    />
  );

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />  
      <ModalAddCategorie show={showAS} setShow={setShowAS}></ModalAddCategorie>
      <Layout
        title={`Gestión de Categorías`}
        body={body}
        route={CATEGORIES_INDEX}
        subtitle={``}
        />
		</div>
	);
};

export default Index;