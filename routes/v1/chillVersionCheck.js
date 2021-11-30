
const versionCheck = (fastify, options, done) => {
    
    fastify.get("/v1/versions/chillcord/check", async (req, res) => {

        res.header("Content-Type", "application/json");

        let current_version = '2.0.0'
        let previous_version = '1.9.9'
        let newest_version = '2.0.0'
        let stable_version = '2.0.0'

        res.status(200).send(JSON.stringify({
            current: current_version,
            previous: previous_version,
            newest: newest_version,
            stable: stable_version
          }))
    });

    done()
  };

module.exports = versionCheck;
