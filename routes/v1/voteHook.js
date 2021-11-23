const voteHook = (fastify, options, done) => {
    
    fastify.post("/hooks/vote", async (req, res) => {

        res.header("authorization", "ToxicIsBae123");

        console.log(vote.user)
       
    });

    done()
  };

module.exports = voteHook;
