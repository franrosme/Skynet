import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import {VentaItemRow } from "./VentaItemRow";


const ListaVentasTabla = () => {
  const [listaVentas, setListaVentas] = useState([]);

  useEffect(() => {
    if(!listaVentas.length) {
      Axios.get("https://backend4rt.herokuapp.com/listarventas").then((response) => {
        setListaVentas(response.data);
      });
    }
  })

  const executeSearch = (vl) => {

    const newList = listaVentas.filter((item) => {
      return JSON.stringify(item)
        .toLowerCase()
        .includes(vl?.toLowerCase());
    });
    vl ? setListaVentas(newList) : setListaVentas([])
  };
    return (
        <div>
       {/*  <section >
          <Link to ='/agregarventas'>
          <Button color="primary" size="lg">Adicionar venta</Button></Link>
        </section> */}

        <FormGroup className="mt-3 w-100">
        <Label for="Search">Buscar integrante</Label>
        <Input
          type="text"
          onChange={(e) => {
            executeSearch(e.target.value);
          }}
          name="Search"
          id="Search"
          placeholder="Buscar...."
        />
      </FormGroup>

      {listaVentas.map((val, key) => {
        return (
          <Table striped key={key}>
            <thead>
              <tr>
              <th>Código integrante</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Nombre proyecto</th>
              <th>Fecha Actualización</th>
              <th>Estado</th>
              <th>Actualizar</th>
              <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <VentaItemRow val={val} />
            </tbody>
          </Table>
        );
      })}

      <section style={{ display: "flex", width: "100%", justifyContent: "flex-end" }} >
      <Pagination aria-label="Page navigation example">
    <PaginationItem>
        <PaginationLink first href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          2
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          3
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          4
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          5
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink next href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last href="#" />
      </PaginationItem>
    </Pagination>
      </section>
    </div>
    )
}

export default ListaVentasTabla
