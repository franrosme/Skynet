use minticshop;

INSERT INTO `minticshop`.`rol`
(`descripcion`)
VALUES
('ADMINISTRADOR');
INSERT INTO `minticshop`.`rol`
(`descripcion`)
VALUES
('VENDEDOR');

SELECT * FROM minticshop.ROL;

INSERT INTO `minticshop`.`estado_aut`
(`descripcion`)
VALUES
('PENDIENTE');
INSERT INTO `minticshop`.`estado_aut`
(`descripcion`)
VALUES
('AUTORIZADO');
INSERT INTO `minticshop`.`estado_aut`
(`descripcion`)
VALUES
('NO AUTORIZADO');

/*PENDIENTE/AUTORIZADO/NO_AUTORIZADO*/
SELECT * FROM MINTICSHOP.ESTADO_AUT;

INSERT INTO `minticshop`.`usuario`
(`Id_rol`,
`id_estado_aut`,
`nombre`,
`apellido`)
VALUES
(1,
1,
'Diego',
'Vidales');

SELECT usuario.nombre "Nombre",
    usuario.apellido "Apellido",
    rol.descripcion "Rol",
    estado_aut.descripcion "Estado"
FROM minticshop.usuario, minticshop.rol, minticshop.estado_aut
WHERE minticshop.usuario.id_rol = minticshop.rol.id_rol
and minticshop.usuario.id_estado_aut = minticshop.estado_aut.id_estado_aut;




