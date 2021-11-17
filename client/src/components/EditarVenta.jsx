import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import Axios from "axios";

export const EditarVenta = ({ val, cancel }) => {
  const [nombreVenta, setNombreVenta] = useState("");
  const [precioVenta, setPrecioVenta] = useState(0);
  const [cantidadVenta, setCantidadVenta] = useState(0);
  const [fechaVenta, setFechaVenta] = useState("");
  const [idClienteVenta, setIdClienteVenta] = useState(0);
  const [nombreClienteVenta, setNombreClienteVenta] = useState("");
  const [idVendedorVenta, setIdVendedorVenta] = useState(0);
  const [estadoVenta, setEstadoVenta] = useState("");

  const editarVenta = () => {
    Axios.put("https://backend4rt.herokuapp.com/editarventa", {
      id: val._id,
      nombreVenta: nombreVenta,
      precioVenta: Number(precioVenta),
      cantidadVenta: Number(cantidadVenta),
      fechaVenta: fechaVenta,
      idClienteVenta: Number(idClienteVenta),
      nombreClienteVenta: nombreClienteVenta,
      idVendedorVenta: Number(idVendedorVenta),
      estadoVenta: estadoVenta,
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
            setNombreVenta(e.target.value);
          }}
          name="nombreVenta"
          id="nombreVenta"
          placeholder="Inserte descripción de la venta"
        />
      </td>
      <td>
        <Input
          type="number"
          onChange={(e) => {
            setPrecioVenta(e.target.value);
          }}
          name="precioVenta"
          id="precioVenta"
          placeholder="Inserte precio de la venta"
        />
      </td>
      <td>
        <Input
          type="number"
          onChange={(e) => {
            setCantidadVenta(e.target.value);
          }}
          name="cantidadVenta"
          id="cantidadVenta"
          placeholder="Inserte cantidad de la venta"
        />
      </td>
      <td>
        <Input
          type="data"
          onChange={(e) => {
            setFechaVenta(e.target.value);
          }}
          name="fechaVenta"
          id="fechaVenta"
          placeholder="Inserte fecha de la venta"
        />
      </td>
      <td>
        <Input
          type="number"
          onChange={(e) => {
            setIdClienteVenta(e.target.value);
          }}
          name="idClienteVenta"
          id="idClienteVenta"
          placeholder="Inserte documento de identidad del cliente"
        />
      </td>
      <td>
        <Input
          type="text"
          onChange={(e) => {
            setNombreClienteVenta(e.target.value);
          }}
          name="nombreClienteVenta"
          id="nombreClienteVenta"
          placeholder="Inserte nombre del cliente"
        />
      </td>
      <td>
        <Input
          type="number"
          onChange={(e) => {
            setIdVendedorVenta(e.target.value);
          }}
          name="idVendedorVenta"
          id="idVendedorVenta"
          placeholder="Inserte número de identificación del vendedor"
        />
      </td>
      <td>
        <select
          className="select"
          type="text"
          onChange={(e) => {
            setEstadoVenta(e.target.value);
          }}
          name="estadoVenta"
          required
          defaultValue={0}
        >
          <option disabled value={0}>
            Seleccione una opción
          </option>
          <option>Alistamiento</option>
          <option>En ruta</option>
          <option>Entregado</option>
        </select>
      </td>
      <th>
        <Button color="primary" onClick={cancel}>
          Cancelar
        </Button>
      </th>
      <th>
        <Button color="danger" onClick={() => editarVenta()}>
          Guardar          
        </Button>
        <button onClick={refreshPage}>Click to refresh!</button>
      </th>
    </tr>
  );
};
