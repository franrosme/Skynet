import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import Axios from "axios";

export const EditarProducto = ({ val, cancel }) => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState(0);
  const [estadoProducto, setEstadoProducto] = useState("");

  const editarProducto = () => {
    Axios.put("https://backend4rt.herokuapp.com/editarproducto", {
      id: val._id,
      nombreProducto: nombreProducto,
      precioProducto: Number(precioProducto),
      estadoProducto: estadoProducto,
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
            setNombreProducto(e.target.value);
          }}
          name="nombreProducto"
          id="nombreProducto"
          placeholder="Inserte nombre del producto"
        />
      </td>
      <td>
        <Input
          type="number"
          onChange={(e) => {
            setPrecioProducto(e.target.value);
          }}
          name="precio"
          id="precio"
          placeholder="Inserte precio"
        />
      </td>
      <td>
        <select
          className="select"
          type="text"
          onChange={(e) => {
            setEstadoProducto(e.target.value);
          }}
          name="estadoProducto"
          required
          defaultValue={0}
        >
          <option disabled value={0}>
            Seleccione una opción
          </option>
          <option>Disponible</option>
          <option>No disponible</option>
        </select>
      </td>
      <th>
        <Button color="primary" onClick={cancel}>
          Cancelar
        </Button> 
      </th>
      <th>       
        <Button color="danger" onClick={() => editarProducto()}>
          Guardar
        </Button>
        <button onClick={refreshPage}>Click to refresh!</button>
      </th>
    </tr>
  );
};
