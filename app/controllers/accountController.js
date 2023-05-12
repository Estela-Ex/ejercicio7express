const { USERS_BBDD } = require("../bbdd.js");

const controller = {}

controller.listUser = (req, res) => {
    const { guid } = req.params;
    const user = USERS_BBDD.find(user => user.guid === guid);
    if (!user) return res.status(404).send('La cuenta no existe');
    res.send(user);
};

controller.addUser = (req, res) => {
    const { guid, name } = req.body;
    if (!guid || !name) return res.status(400).send('Error en el body');
    const user = USERS_BBDD.find(user => user.guid === guid);
    if (user) return res.status(409).send('La cuenta ya existe');
    USERS_BBDD.push({
        guid, name
    });
    res.send('Cuenta creada');
};

controller.updateUser = (req, res) => {
    const { guid } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400);
    const user = USERS_BBDD.find(user => user.guid === guid);
    if (!user) return res.status(404).send('La cuenta no existe');
    user.name = name;
    res.send(user);
};

controller.deleteUser = (req, res) => {
    const { guid } = req.params;
    const userIndex = USERS_BBDD.findIndex(user => user.guid === guid);
    if (userIndex === -1) return res.status(404).send('La cuenta no existe');
    USERS_BBDD.splice(userIndex, 1);
    res.send('Cuenta eliminada');
}
module.exports =  controller;