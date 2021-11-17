import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export const AgregarUsuarioForm = () => {
  const [nombreUsuario, setNombreUsuario] = useState("")
  const [rolUsuario, setRolUsuario] = useState("")
  const [estadoUsuario, setEstadoUsuario] = useState("")
  const [error, setError] = useState(false)
  const history = useHistory()

  const agregarUsuario = async () => {

    const res = await Axios.post("https://backend4rt.herokuapp.com/agregarrol", {
        nombreUsuario: nombreUsuario,
        rolUsuario: rolUsuario,
        estadoUsuario: estadoUsuario,
    });


    if ((res.data = "enviadoUsuario")) {
      history.push("/listarroles");
    } else {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000);
    }
  };

  return (
    <div>
      <section>
        <ul className="OpcionesProductos">
          <li>
            <div style={{ margin: "30px" }}>
              {" "}
              <Link to="/listarroles">
                <Button color="primary">Ver lista de Usuarios</Button>
              </Link>
            </div>
          </li>
        </ul>
      </section>


      <Form className="w-75">
        <FormGroup className="mb-3">
          <h2 className="TituloFormProductos"> Adicionar Usuario </h2>
          <Label for="nombreUsuario">Nombre del Usuario</Label>
          <Input
            type="text"
            onChange={(e) => {
              setNombreUsuario(e.target.value);
            }}
            name="nombreUsuario"
            id="nombreUsuario"
            placeholder="Inserte nombre del Usuario"
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <Label for="rolUsuario">Rol del Usuario</Label>
          <Input
            type="text"
            onChange={(e) => {
              setRolUsuario(e.target.value);
            }}
            name="rolUsuario"
            id="rolUsuario"
            placeholder="Ingrese el rol del Usuario"
          />
        </FormGroup>


        <FormGroup className="mb-3">
          <Label for="estadoUsuario">Estado Usuario</Label>
          <select
            className="select"
            type="text"
            onChange={(e) => {
              setEstadoUsuario(e.target.value);
            }}
            name="estadoUsuario"
            required
            defaultValue={0}
          >
            <option disabled value={0}>
            Seleccione una opción
          </option>
          <option>Activo</option>
          <option>Inactivo</option>
          </select>
        </FormGroup>

        <div
          style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <Button className="mx-3">Cancelar</Button>

          <Button onClick={() => agregarUsuario()} color="primary">
            Guardar
          </Button>
        </div>
        {error && (
          <Alert color="danger" className='mt-3'> Error guardando Usuario </Alert>
        )}
      </Form>
    </div>
  );
};