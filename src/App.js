import { collection, getDocs, query, doc, deleteDoc, where, onSnapshot, } from "firebase/firestore";
//import {getDoc, addDoc, updateDoc, setDoc, increment } from "firebase/firestore";
import React, { useEffect,useState } from 'react';
import firebase, { db } from './componente/firebase';
import AppForm from './componente/AppForm';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { async } from "@firebase/util";

function App() {
  ///////////////////////////////////////////////////////////////
  ////////////////////READ - fnRead - Lectura a BD///////////////
  ///////////////////////////////////////////////////////////////
  const [idActual, setIdActual] = useState("");    //Crear Update  //usf
  const [docsBD, setDocsBD] = useState([]);        //Lectura a BD
  const [orden,setOrden] = useState(0);            //Para número - falla
  const i = 1;                                     //Para número - falla

  console.log(docsBD);

  const fnRead = async () =>{
    try {
      const xColeccionConQuery = query(collection(db, "persona"));
      const unsubscribe = onSnapshot(xColeccionConQuery, (xDatosBD) => {
        const xDoc = [];
        xDatosBD.forEach( (doc) => {
          xDoc.push({id: doc.id, ...doc.data()});
          //console.log({id: doc.id, ...doc.data()});
        });
        setDocsBD(xDoc)
        console.log(docsBD);
      });
    } catch (error) {
      console.error(error);
    }

  }

  useEffect( () => {
    fnRead();
  }, [idActual])

  ///////////////////////////////////////////////////////////////
  ////////////////////DELETE - fnDelete - Eliminar///////////////
  ///////////////////////////////////////////////////////////////
  const fnDelete = async (xId) => {
    if(window.confirm("Confirme para eliminar")){
      await deleteDoc(doc(db, 'persona', xId));
      toast("Documento eliminado con exito", {
        type:'error',
        autoClose:2000
      })
    }
  }

  return (
    <div className="container text-center">
      <div className="card bs-secondary p-3 mt-3">
        <ToastContainer/>
        <div className="col-md-12 p-2">
          <div className="card mb-1">
            <h1>Sitioreact1-CRUD (App.js)</h1>
          </div>
        </div>

        <div className="col-md-12 p-2">
          <AppForm {...{idActual, setIdActual}} />
        </div>

        <div className="col-md-12 p-2">
        {
          docsBD.map( (row) =>
            <div className="card mb-1" key={row.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h4>N.  -{row.nombre}</h4>
                  <div>
                    <i className="material-icons text-danger"
                      onClick={() => fnDelete(row.id)}>close</i>
                      ...
                    <i className="material-icons text-danger"
                      onClick={() => setIdActual(row.id)}>create</i>
                  </div>
                </div>
                <div className="d-flex justify-content">
                  <span>Edad: {row.edad} </span>
                  <a href="#"> Genero: {row.genero}</a>
                </div>
              </div>
            </div>
          )
        }
        </div>
      </div>
    </div>




/*    <div style={{width:"350px", background:"greenyellow", padding:"10px"}} >
      <h1>REGISTER</h1>
      <h1>Sitio de Bryan Roman (App.Js)</h1>
      <AppForm {...{idActual, setIdActual, fnRead}} />
      {
        docsBD.map( (row) => 
          <p key={row.id}> 
            No. 1 {row.nombre} ...
            <span onClick={() => fnDelete(row.id)}>X</span>
            ...
            <span onClick={() => setIdActual(row.id)}>A</span>
          </p>
        )
      }
    </div>*/
  );
}

export default App;
