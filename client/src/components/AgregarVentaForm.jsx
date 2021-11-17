import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export const AgregarVentaForm = () => {
  const [nombreVenta, setNombreVenta] = useState("");
  const [precioVenta, setPrecioVenta] = useState(0);
  const [cantidadVenta, setCantidadVenta] = useState(0);
  const [fechaVenta, setFechaVenta] = useState("");
  const [idClienteVenta, setIdClienteVenta] = useState(0);
  const [nombreClienteVenta, setNombreClienteVenta] = useState("");
  const [idVendedorVenta, setIdVendedorVenta] = useState(0);
  const [estadoVenta, setEstadoVenta] = useState("");
  const [error, setError] = useState(false)
  const history = useHistory();

  const agregarVenta = async () => {

    const res = await Axios.post("https://backend4rt.herokuapp.com/agregarventa", {
        nombreVenta: nombreVenta,
        precioVenta: Number(precioVenta),
        cantidadVenta: Number(cantidadVenta),
        fechaVenta: fechaVenta,
        idClienteVenta: Number(idClienteVenta),
        nombreClienteVenta: nombreClienteVenta,
        idVendedorVenta: idVendedorVenta,
        estadoVenta: estadoVenta,
    });


    if ((res.data = "enviadaVenta")) {
      history.push("/listarventas");
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
              <Link to="/listarproductos">
                <Button color="primary">Ver lista de ventas</Button>
              </Link>
            </div>
          </li>
        </ul>
      </section>


      <Form className="w-75">
        <FormGroup className="mb-3">
          <h2 className="TituloFormProductos"> Adicionar venta </h2>
          <Label for="nombreProducto">Nombre del producto</Label>
          <Input
            type="text"
            onChange={(e) => {
              setNombreVenta(e.target.value);
            }}
            name="nombreProducto"
            id="nombreProducto"
            placeholder="Inserte nombre del producto"
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <Label for="precioProducto">Valor</Label>
          <Input
            type="number"
            onChange={(e) => {
              setPrecioVenta(e.target.value);
            }}
            name="precio"
            id="precio"
            placeholder="Inserte precio"
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <Label for="cantidadVenta">Cantidad</Label>
          <Input
            type="number"
            onChange={(e) => {
              setCantidadVenta(e.target.value);
            }}
            name="cantidadVenta"
            id="cantidadVenta"
            placeholder="Inserte cantidad de la venta"
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <Label for="fechaVenta">Fecha de venta</Label>
          <Input
            type="date"
            onChange={(e) => {
              setFechaVenta(e.target.value);
            }}
            name="fechaVenta"
            id="fechaVenta"
            placeholder="Inserte fecha de la venta"
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <Label for="idClienteVenta">ID Cliente</Label>
          <Input
            type="number"
            onChange={(e) => {
              setIdClienteVenta(e.target.value);
            }}
            name="idClienteVenta"
            id="idClienteVenta"
            placeholder="Inserte documento de identidad del cliente"
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <Label for="nombreClienteVenta">Nombre del cliente</Label>
          <Input
            type="text"
            onChange={(e) => {
              setNombreClienteVenta(e.target.value);
            }}
            name="nombreClienteVenta"
            id="nombreClienteVenta"
            placeholder="Inserte nombre del cliente"
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <Label for="idVendedorVenta">ID del vendedor</Label>
          <Input
            type="number"
            onChange={(e) => {
              setIdVendedorVenta(e.target.value);
            }}
            name="idVendedorVenta"
            id="idVedendedorVenta"
            placeholder="Inserte número de identificación del vendedor"
          />
        </FormGroup>


        <FormGroup className="mb-3">
          <Label for="estadoVenta">Estado</Label>
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
        </FormGroup>

        <div
          style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <Button className="mx-3">Cancelar</Button>

          <Button onClick={() => agregarVenta()} color="primary">
            Guardar
          </Button>
        </div>
        {error && (
          <Alert color="danger" className='mt-3'>Error guardando venta.</Alert>
        )}
      </Form>
    </div>
  );
};
