import { useEffect, useState } from 'react';
import { formatDashboardJson, navigateBack, navigateTo } from '@features/Modulo3/utils/functions';
import { Form, Button } from 'react-bootstrap';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import TableCategories from '@features/Modulo3/components/Tables/TableCategories';
import Linechart from '@features/Modulo3/components/Charts/Linechart/Linechart';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import NoDataFound from '@features/Modulo3/components/Shared/NoDataFound/NoDataFound';
import cat from '@features/Modulo3/jsons/Categories';
import { CATEGORIES_DETAIL, CATEGORIES_INDEX } from '@features/Modulo3/routes/path';
import TableCompetencia from '@features/Modulo3/components/Tables/TableCompetencia';

const Detail = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const [categorie, setCategorie] = useState({
    id: parseInt(urlParams.get('id')),
    name: urlParams.get('name')
  });
  const [categories,setCategories]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [competencias, setCompetencias]=useState([])
  useEffect(() => {
    setIsLoading(true);
    (async () => {
       const response= cat.find((cate) => cate.id === categorie.id);
      setCompetencias(response["subcategories"]);
      console.log(response);
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
      <TableCompetencia rows ={competencias}/>
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
				<Button>
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