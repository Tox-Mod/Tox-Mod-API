const Case_DB = require('../models/cases');

const getCase = async (fastify, options, done) => {

    fastify.get("/v1/case/:userID/:caseID", async (req, res) => {

        res.header("Content-Type", "application/json");

        let cases = await Case_DB.findOne({
            userID: req.params.userID,
            case: req.params.caseID
        });

        if (cases) {
            res.status(200).send(JSON.stringify({
                userID: cases.userID,
                bio: cases.reason || 'No reason provided',
                action: cases.action,
                serverID: cases.serverID,
                moderator: cases.Moderator,
                case: cases.case,
                time: cases.time,
                duration: cases.duration || 'No duration for this Action'
            }))

        } else res.status(400).send(JSON.stringify({
            message: '[Tox Mod API] Woah, Unable to find that Case in our System. Please check the ID`s and Try Again!',
            error: true,
            fatal: false,
            status: 400
        }))
    });

    done()
};

module.exports = getCase;
