import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import Axios from "axios";

function ModalBorrarVenta({ id, tipo, nombre, modal, toggle }) {
  const borrarVenta = async () => {
    const res = await Axios.delete(`https://backend4rt.herokuapp.com/eliminarventa/${id}`);
    if (res.data === "deleted") {
      window.location.reload()
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modal title</ModalHeader>
      <ModalBody>
        Esta seguro que desea eliminar el {tipo} {nombre}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={borrarVenta}>
          Eliminar
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalBorrarVenta;
