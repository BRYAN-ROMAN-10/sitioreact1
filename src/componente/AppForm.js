import {collection, doc, getDoc, addDoc, updateDoc} from "firebase/firestore";
//import {getDocs, query, setDoc, where, deleteDoc} from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import firebase, { db } from './firebase';
import { async } from '@firebase/util';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppForm = (props) => {
    ///////////////////////////////////////////////////////////////
    ////////////////////CREAR - fnCrear - Guardar//////////////////
    ///////////////////////////////////////////////////////////////
    const camposRegistro = {nombre:"", edad:"", genero:""};   //estructura tbL
    const [objeto, setObjeto] = useState(camposRegistro);     //Tabla u objeto

    const handleStatusChange = (e) => {                        //Manejo cambios en input...
        const {name, value} = e.target;                       //Capta lo que se escribe
        setObjeto({...objeto, [name]:value });                //Asigna al objeto name y value
        //console.log(objeto);                                //Ver en tiempo real
    }

    const handleSubmit = async (e) => {                       //Manejo submit (emvio)
                                        //evitar por defecto (false)
        //////////REGISTRAR////////////////////////////////////////
        try{
            e.preventDefault();
            if(props.idActual === ""){
                //console.log(props.idActual);                    //Verificar idActual
                if(validarForm()){                                //Verificar
                    addDoc(collection(db, 'persona'), objeto);    //CREAR
                    //console.log('Se guardo...');                  //Msj
                    toast("se GUARDO con exito...", {
                        type:'success',
                        autoClose: 2000
                    })
                    //props.fnRead();                               //Actualizar LECTURA BD
                }else{
                    console.log('No se guardo...');
                }
            }else{
                await updateDoc(doc(collection(db, "persona"), props.idActual), objeto);
                //console.log("Se actualizó... ");
                toast("se ACTUALIZO con exito...", {
                    type:'info',
                    autoClose: 2000
                })
                //props.fnRead();           //No es necesario se cambio fn en useEffect
                props.setIdActual('');
            }
            setObjeto(camposRegistro); 
        } catch (error) {
            console.log("Error en CREAR o UPDATE: ", error);
        }
    }
    /////////////////////////////VALIDACIÓN////////////////////////
    const validarForm = () => {
        if(objeto.nombre===""|| /^\s+$/.test(objeto.nombre)){
            alert("Escriba nombres...");
            return false;                                     //Si no tiene texto
        }
        return true;                                          //Si tiene texto
    };
    ///////////////////////////////////////////////////////////////
    ////////////////////UPDATE - fnUpdate - Actualizar/////////////
    ///////////////////////////////////////////////////////////////
    //console.log("props.idActual", props.idActual);
    useEffect(() => {
        if(props.idActual === ""){
            setObjeto({...camposRegistro});
        }else{
            obtenerDastosPorId(props.idActual);
        }
    },[props.idActual]);

    const obtenerDastosPorId = async (xId) =>{
        const objPorId = doc(db, "persona", xId);
        const docPorId = await getDoc(objPorId);
        if (docPorId.exists()) {
            setObjeto(docPorId.data());
        }else{
            console.log("No hay doc... ");
        }
    }
    //console.log(objeto);

    return (
        <div>
        <form className="card card-body" onSubmit={handleSubmit}>
            <button className="btn btn-primary btn-block"> 
                Formulario (AppForm.js)
            </button>
            <div className="form-group input-group">
                <div className="input-group-text bd-light">
                    <i className="material-icons">group_add</i>
                </div>
                <input type="text" className="form-control" name="nombre" placeholder="Nombres..."
                    onChange={handleStatusChange} value={objeto.nombre} />
            </div>
            <div className="form-group input-group clearfix">
                <div className="input-group-text bd-light ">
                    <i className="material-icons">star_half</i>
                </div>
                <input type="text" className="form-control float-start" name="edad" placeholder="Edad..."
                    onChange={handleStatusChange} value={objeto.edad} />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bd-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input type="text" className="form-control" name="genero" placeholder="Género..."
                    onChange={handleStatusChange} value={objeto.genero} />
            </div>
            <button className="btn btn-primary btn-block"> 
                {props.idActual === ""? "Guardar" : "Actualizar"} 
            </button>
        </form>
        </div>
    )
}

export default AppForm;