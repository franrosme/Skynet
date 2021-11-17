import { Button } from "reactstrap";
import React, { useState } from "react";
import { EditarUsuario } from "./EditarUsuario";
import ModalBorrarUsuario from "./ModalBorrarUsuario";

export const UsuarioItemRow = ({ val }) => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  return (
    <>
      {showForm ? (
        <EditarUsuario val={val} cancel={toggleForm} />
      ) : (
        <tr>
          <td>{val._id}</td>
          <td>{val.nombreUsuario}</td>
          <td>{val.rolUsuario}</td>
          <td>{val.estadoUsuario}</td>
          <th>
            <Button color="primary" onClick={toggleForm}>
              Actualizar Usuario
            </Button>
          </th>
          <th>
            <Button color="danger" onClick={() => toggleModal()}>
              Eliminar Usuario
            </Button>
          </th>
          <ModalBorrarUsuario
            id={val._id}
            tipo="Usuario"
            nombre={val.nombreUsuario}
            modal={modal}
            toggle={toggleModal}
          />
        </tr>
      )}
    </>
  );
};
