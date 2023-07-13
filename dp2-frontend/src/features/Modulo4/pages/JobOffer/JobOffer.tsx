import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OfferCard from "@features/Modulo4/components/OfferCard/OfferCard";
import {LOCAL_CONNECTION, SAMPLE_TOKEN}  from '../../utils/constants';
import { right } from '@popperjs/core';


type JobOfferObj = {
  id: number;
  position_name: string;
  photoURL: string;
  offer_introduction: string;
  modified_date: string;
  location: string;
  salary_range: string;
};

const JobOffer = () => {
  const [data, setData] = useState<JobOfferObj[]>([]);
  const navigate = useNavigate();

  const loadOffers = () => {
    axios
      .get(`${LOCAL_CONNECTION}/job-offers`,{
        headers: {
          Authorization: `Token ${SAMPLE_TOKEN}`
        }
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadOffers();
  }, []);

  return (
    <>
      <div className='row mt-3'>
        <div className='col'>
          <h1 className='screenTitle'>Ofertas laborales</h1>
          <p>
            <small className='subtitle'>
              Portal que presenta las ofertas laborales disponibles de la empresa y permite postular a alguna de ellas
            </small>
          </p>
        </div>
      </div>
      <div className='row mt-3' style={{ paddingBottom: "32px" }}>
        <div className='col-11'>
          <input className='form-control' type='text' placeholder='Ingrese palabras clave' />
        </div>
        <div className='col-1 text-end'>
          <button className='btn btn-primary' type='button'>
            Buscar
          </button>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", flexDirection: "column", marginRight: "20px"}}>
        <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
            {data.map((tr, index) => {
              return (
                
                <OfferCard
                  key={tr.id}
                  id={tr.id}
                  name={tr.position_name}
                  photoURL={tr.photoURL}
                  description={tr.offer_introduction}
                  creationDate={tr.modified_date.substring(0, 10)}
                  eventDate={tr.salary_range}
                  index={index}
                />
                
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobOffer;
