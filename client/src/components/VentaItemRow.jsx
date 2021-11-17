import { Button } from "reactstrap";
import React, { useState } from "react";
import { EditarVenta } from "./EditarVenta";
import ModalBorrarVenta from "./ModalBorrarVenta";

export const VentaItemRow = ({ val }) => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  return (
    <>
      {showForm ? (
        <EditarVenta val={val} cancel={toggleForm} />
      ) : (
        <tr>
          <td>{val._id}</td>
          <td>{val.nombreVenta}</td>
          <td>{val.precioVenta}</td>
          <td>{val.cantidadVenta}</td>
          <td>{val.fechaVenta}</td>
          <td>{val.idClienteVenta}</td>
          <td>{val.nombreClienteVenta}</td>
          <td>{val.idVendedorVenta}</td>
          <td>{val.estadoVenta}</td>
          <th>
            <Button color="primary" onClick={toggleForm}>
              Actualizar venta
            </Button>
          </th>
          <th>
            <Button color="danger" onClick={() => toggleModal()}>
              Eliminar venta
            </Button>
          </th>
          <ModalBorrarVenta
            id={val._id}
            tipo="venta"
            nombre={val.nombreVenta}
            modal={modal}
            toggle={toggleModal}
          />
        </tr>
      )}
    </>
  );
};
