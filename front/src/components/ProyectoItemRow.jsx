import { Button } from "reactstrap";
import React, { useState } from "react";
import { EditarProducto } from "./EditarProducto";
import ModalBorrarProducto from "./ModalBorrarProducto";

export const ProyectoItemRow = ({ val }) => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  return (
    <>
      {showForm ? (
        <EditarProducto val={val} cancel={toggleForm} />
      ) : (
        <tr>
          <td>{val._id}</td>
          <td>{val.nombre}</td>
          <td>{val.lider}</td>
          <td>{val.estado}</td>
          <td>{val.fase}</td>
          <td>{val.presupuesto}</td>
          <th>
            <Button color="primary" onClick={toggleForm}>
              Actualizar producto
            </Button>
          </th>
          <th>
            <Button color="danger" onClick={() => toggleModal()}>
              Eliminar producto
            </Button>
          </th>
          <ModalBorrarProducto
            id={val._id}
            tipo="producto"
            nombre={val.nombre}
            modal={modal}
            toggle={toggleModal}
          />
        </tr>
      )}
    </>
  );
};
