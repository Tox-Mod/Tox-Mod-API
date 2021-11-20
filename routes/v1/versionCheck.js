const landingPage = (fastify, options, done) => {
    
    fastify.get("/v1/versions/check", async (req, res) => {

        res.header("Content-Type", "application/json");

        let current_version = '2.1.2'
        let previous_version = '2.1.1'
        let newest_version = '2.1.2'
        let stable_version = '2.1.2'

        res.status(200).send(JSON.stringify({
            current: current_version,
            previous: previous_version,
            newest: newest_version,
            stable: stable_version
          }))
    });

    done()
  };

module.exports = landingPage;
