import React from "react";
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
import { ProyectoItemRow } from "./ProyectoItemRow";
import {
  useQuery,
  gql
} from "@apollo/client";


 

const ListaProyectosTabla = () => {
    
  const PROYECTOS = gql`
  query  {
    Proyectos {
      _id
      nombre
      lider
      presupuesto
      fase 
      estado
      fechaInicio
    }
  }
`;
const { loading, error, data } = useQuery(PROYECTOS)
    if (loading) return "<h1>Cargando</h1>"
    console.log(data)
    const listaProyectos = data.Proyectos;
    if(error){
        console.log(error)
    }
  
  return (
    <div>
      <section>
        <Link to="/agregarproductos">
          <Button color="primary" size="lg">
            Crear Proyecto
          </Button>
        </Link>
      </section>

      <FormGroup className="mt-3 w-100">
        <Label for="Search">Buscar proyecto</Label>
        <Input
          type="text"
          onChange={(e) => {
           // executeSearch(e.target.value);
          }}
          name="Search"
          id="Search"
          placeholder="Buscar...."
        />
      </FormGroup>

      
     
     
              {listaProyectos.map((val, key) => {
        return (
          <Table striped key={key}>
            <thead>
              <tr>
                <th>Código del proyecto</th>
                <th>Nombre del proyecto</th>
                <th>Lider proyecto</th>
                <th>Estado</th>
                <th>Fase</th>
                <th>Presupuesto</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <ProyectoItemRow val={val} />
            </tbody>
          </Table>
        );
      })}

      <section
        style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
      >
        <Pagination aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink first href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink previous href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
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
  );
};

export default ListaProyectosTabla;
