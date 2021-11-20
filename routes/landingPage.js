const landingPage = (fastify, options, done) => {
    
    fastify.get("/", async (req, res) => {

        res.header("Content-Type", "application/json");

        res.status(200).send(JSON.stringify({
            "message": 'Welcome 👋 to the Tox Mod API.',
            "error": false,
            "fatal": false,
            "status": 200
          }))
    });

    done()
  };

module.exports = landingPage;
