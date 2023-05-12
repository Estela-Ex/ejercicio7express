const { v4: uuidv4 } = require('uuid');
const { USERS_BBDD } = require("../bbdd.js");
const checkEmailPassword = require("../utils/checkEmailPassword.js");

const controller = {}
const sessions = [];

controller.authUser = (req, res) => {
    const { email, password } = req.body;
    try {
        const { guid } = checkEmailPassword(email, password);
        const sessionId = uuidv4();
        sessions.push({ sessionId, guid });
        res.cookie('sessionId', sessionId, { httpOnly: true })
        return res.send('Usuario logueado');
    } catch (err) {
        return res.sendStatus(401);
    }
}

controller.listUser = (req, res) => {
    const { cookies } = req;
    if (!cookies.sessionId) return res.sendStatus(401);
    const userSession = sessions.find((session) => session.sessionId === cookies.sessionId);
    if (!userSession) return res.sendStatus(401)
    const user = USERS_BBDD .find(user => user.guid === userSession.guid);
    if (!user) return res.sendStatus(401);
    delete user.password;
    return res.send(user);
}

module.exports = controller;