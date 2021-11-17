import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import Axios from "axios";

export const EditarUsuario = ({ val, cancel }) => {
  const [nombreUsuario, setNombreUsuario] = useState("")
  const [rolUsuario, setRolUsuario] = useState("")
  const [estadoUsuario, setEstadoUsuario] = useState("")

  const editarUsuario = async () => {
    debugger
    await Axios.put("https://backend4rt.herokuapp.com/editarrol", {
      id: val._id,
      nombreUsuario: nombreUsuario,
      rolUsuario: rolUsuario,
      estadoUsuario: estadoUsuario,
    });
  };

  function refreshPage() {
    window.location.reload(false);
  };

  return (
    <tr>
      <td>{val._id}</td>
      <td>
        <Input
          type="text"
          onChange={(e) => {
            setNombreUsuario(e.target.value);
          }}
          name="nombreUsuario"
          id="nombreUsuario"
          placeholder="Inserte nombre del Usuario"
        />
      </td>
      <td>
        <Input
          type="text"
          onChange={(e) => {
            setRolUsuario(e.target.value);
          }}
          name="rolUsuario"
          id="rolUsuario"
          placeholder="Inserte rol del Usuario"
        />
      </td>
      <td>
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
      </td>
      <th>
        <Button color="primary" onClick={cancel}>
          Cancelar
        </Button>
      </th>
      <th>
        <Button color="danger" onClick={() => editarUsuario()}>
          Guardar          
        </Button>
        <button onClick={refreshPage}>Click to refresh!</button>
      </th>
    </tr>
  );
};
