const User_DB = require('../../models/users');

const getUser = async (fastify, options, done) => {

    fastify.get("/v1/users/:userID", async (req, res) => {

        res.header("Content-Type", "application/json");

        let user = await User_DB.findOne({
            userID: req.params.userID
        });

        if (user) {
            res.status(200).send(JSON.stringify({
                userID: user.userID,
                bio: user.bio || 'This user prefers to remain anonymous',
                website: user.website || 'Not Set',
                github: user.github || 'Not Set',
                twitter: user.twitter || 'Not Set',
                instagram: user.instagram || 'Not Set'
            }))

        } else res.status(400).send(JSON.stringify({
            message: '[Tox Mod API] Woah, Unable to find that User in our System. Please check the ID and Try Again!',
            error: true,
            fatal: false,
            status: 400
        }))
    });

    done()
};

module.exports = getUser;
