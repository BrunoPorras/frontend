import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '../../styles/Aplicacion.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMailBulk, faUserAlt , faPen, faStar , faPhone, faUserGraduate, faChalkboardUser, faBookOpen} from '@fortawesome/free-solid-svg-icons'

import perfil from '../../assets/Demo/perfil1.PNG';

const baseUrl = "https://buscatututorbackend.herokuapp.com/api/getTutor";

const VerMas = () => {    

    const urlFinal = baseUrl + "?id=" + localStorage.getItem("idUltimaConsulta");
    const [tutor, setTutor] = useState({});

    /*DATOS DEL TUTOR*/
    const [TutorVisto, setTutorVisto] = useState({nombre: '', num_telf: '' , correo:''})
    const [EspYHab, setEspYHab] = useState({especialidades: [], habilidades: []})

    useEffect (() => {        
        async function obtenerDatos() {
            const resultado = await peticionDatos();  
            setTutor(resultado);                        
            setTutorVisto({                
                nombre: resultado.estudiante.nombre,
                num_telf: resultado.estudiante.num_telf,
                correo: resultado.estudiante.correo,
            })
            setEspYHab({                
                especialidades: resultado.especialidades,
                habilidades: resultado.habilidades
            })
        }
        obtenerDatos();
    });
   
    //  Funcion para obtener todos los datos del tutor seleccionado a partir de su id general
    const peticionDatos = async () => {        
        const result = await axios({
            method: 'GET',
            url: urlFinal,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
        return result.data;
    }


    return(
        <div className={styles.Datos}>
            <div className={styles.DatosCabecera}>
                <h2>Más datos sobre {TutorVisto.nombre}</h2>            
                <button className={styles.botonEditarDatos} ><FontAwesomeIcon icon={faStar}/>Agregar a Favoritos</button>
            </div>
            <div className={styles.DatosBody}>
                <h5 className={styles.tituloSeccion}>Datos personales</h5>                
                <img src={perfil} alt="Foto de perfil" />
                <div className={styles.DatosItems}>
                    <div className={styles.DatoItem}>
                        <FontAwesomeIcon icon={faUserAlt}/>
                        <label>Nombre: </label>
                        <input value={TutorVisto.nombre} readOnly></input>
                    </div>
                    <div className={styles.DatoItem}>
                        <FontAwesomeIcon icon={faMailBulk}/>
                        <label>Correo: </label>
                        <input value={TutorVisto.correo} readOnly></input>                        
                    </div>
                    <div className={styles.DatoItem}>
                        <FontAwesomeIcon icon={faPhone}/>
                        <label>Telefono: </label>
                        <input value={TutorVisto.num_telf} readOnly></input>                        
                    </div>                
                </div>                
                <h5 className={styles.tituloSeccion}>Datos como docente</h5>
                <div className={styles.DatosItems2}>
                    <div className={styles.DatoItem}>
                        <FontAwesomeIcon icon={faBookOpen}/>
                        <label>Su descripción: </label>
                        <p>{tutor.descripcion}</p>                        
                    </div>
                    <div className={styles.DatoItem}>
                        <FontAwesomeIcon icon={faUserGraduate} />
                        <label>Sus especialidades: </label>                                            
                        <div className={styles.ContEsHa}>                                                          
                            {EspYHab.especialidades.map((esp)=>                             
                                <h6 className={styles.EsHa}>{esp.desc_esp}</h6>
                            )}
                        </div>                        
                    </div>
                    <div className={styles.DatoItem}>
                        <FontAwesomeIcon icon={faChalkboardUser}/>
                        <label>Sus habilidades: </label>
                        <div className={styles.ContEsHa}>
                            {EspYHab.habilidades.map((esp)=>                             
                                <h6 className={styles.EsHa}>{esp.desc_esp}</h6>
                            )}
                        </div>
                    </div>                
                </div>
            </div>            
        </div>
    )
}

export default VerMas