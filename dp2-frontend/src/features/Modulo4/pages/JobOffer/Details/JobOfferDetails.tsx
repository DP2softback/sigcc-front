import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  GeoFill,
  JournalBookmarkFill,
  InfoCircleFill,
  PeopleFill,
  DoorClosedFill,
  Calendar2EventFill,
  Calendar,
  Calendar2Event,
  People,
  ArrowLeftCircle,
  ArrowLeftCircleFill,
  ArrowRightCircle,
} from "react-bootstrap-icons";
import EmployeeCard from "@features/Modulo1/components/EmployeeCard/EmployeeCard";
import "../basic.css";
import "../job-offer.css";
import PostulationModal from "./PostulationModal";
import {LOCAL_CONNECTION, SAMPLE_TOKEN}  from '../../../utils/constants';

type JobDetail = {
  id: number;
  position_name: string;
  photoURL: string;
  offer_introduction: string;
  modified_date: string;
  location: string;
  salary_range: string;
  job_description: string;
  benefits: string;
  responsibilities: string;
  requirements: string;
  summary: string;
};

const datos: JobDetail[] = [
  // Tus datos existentes
];

const JobOfferDetails = () => {
  const { trainingID } = useParams();
  const [jobDetail, setJobDetail] = useState<JobDetail | null>(null);
  const [position, setPosition] = useState(0);
  const [prueba, setPrueba] = useState(0);
  const id = parseInt(localStorage.getItem("idOffer"));
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handlePrevious = () => {
    if (position > 0) {
      setPosition(position - 3);
    }
  };

  const fetchJobDetail = async () => {
    try {
      const response = await axios.get(
        `${LOCAL_CONNECTION}/job-offers`,{
					headers: {
						Authorization: `Token ${SAMPLE_TOKEN}`
					}
				}
      );
      setJobDetail(response.data);
    } catch (error) {
      console.error("Error fetching job detail:", error);
    }
  };

  const loadTrainingDetails = () => {};

  const handleSubmit = () => {
    setShowModal(false);
    navigate("/selection-offers-and-positions/job-offers/register");
  };

  useEffect(() => {
    loadTrainingDetails();
    fetchJobDetail();
  }, []);

  if (!jobDetail) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "10px",
        }}
      >
        <div
          className="text-end"
          style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}
        >
          <Link
            to={`/selection-offers-and-positions/job-offers/list`}
            className="float-right"
          >
            <ArrowLeftCircleFill
              style={{ height: "32px", width: "32px", color: "black" }}
            />
          </Link>
        </div>

        <div className="col">
          <h1 className="screenTitle">{"Detalle de la oferta laboral"}</h1>
          <p>
            <small className="subtitle">
              Descripción de la oferta, requisitos para el puesto y beneficios
              otorgados para el contratado.
            </small>
          </p>
        </div>
      </div>
      <div>
        <div className="row mt-3">
          <div className="col-12">
            <div className="card px-2">
              <div className="row">
                <div className="col-9">
                  <h1>{jobDetail[id].position_name}</h1>
                  <div>Área de desarrollo de software</div>
                </div>
                <div className="col-3 text-end">
                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={() => setShowModal(true)}
                  >
                    Postular
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-6">
            <div className="row-7 mt-2">
              <div className="card">
                <h3 className="px-1">Descripcion del puesto</h3>
                <div className="px-3">{jobDetail[id].introduction}</div>
              </div>
            </div>
            <div className="row-7 mt-2">
              <div className="card">
                <h3 className="px-1">Responsabilidades</h3>
                <div className="px-3">
								{jobDetail[id].responsabilities_introduction}
                    
                </div>
              </div>
            </div>
            <div className="row-7 mt-2">
              <div className="card">
                <h3 className="px-1">Requisitos</h3>
                <div className="px-3">
                	{jobDetail[id].capacities_introduction}
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row-5 mt-2">
              <div className="card">
                <h3 className="px-1">Beneficios</h3>
                <div className="px-3">{jobDetail[id].beneficies_introduction}</div>
              </div>
            </div>
            <div className="row-5 mt-2">
              <div className="card">
                <h3 className="px-1">Resumen</h3>
                <div className="px-3">{jobDetail[id].training_detail}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PostulationModal
        funcionPrincipal={() => handleSubmit()}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
};

export default JobOfferDetails;
