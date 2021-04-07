const esAdminRole = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin antes validar el token",
        });
    }
    const { rol, nombre } = req.usuario;
    if (rol !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `Accion bloqueada - ${nombre} no es administrador`,
        });
    }

    next();
};

const tieneRol = (...roles) => {
    // Función que devuelve un middleware (otra función)
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Se quiere verificar el rol sin antes validar el token",
            });
        }
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `Esta acción solo esta permitida para los siguientes roles: ${roles}`,
            });
        }
        next();
    };
};

module.exports = {
    esAdminRole,
    tieneRol,
};