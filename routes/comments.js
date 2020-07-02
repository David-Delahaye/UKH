const router = require("express").Router();
const pool = require("../config/db");
const { isAuth, isSiteOwner } = require("../lib/authUtils");

//get comments by site
router.get("/api/sites/:site/comments", async (req,res) => {
    try {
        const siteID = req.params.site;
        const response = await pool.query(
            "SELECT * FROM comments WHERE site_id = $1", [siteID]
        )
        res.send(response.rows)
    } catch (err) {
        console.log(err.message);
    }
})

//post a comment
router.post("/api/sites/:site/comments", async (req, res) => {
  try {
    //get username
    const {commentTitle, commentDesc, commentScore} = req.body;
    const siteID = req.params.site;
    const userID = req.user.user_id;
    const owner = await pool.query(
      "SELECT username FROM users WHERE user_id = $1",
      [userID]
    )
    const username = owner.rows[0].username;

    //insert comment
    if (commentScore){
    const response = await pool.query(
      "INSERT INTO comments (comment_title, comment_description, owner_id, owner_name, site_id, comment_score, created_on) VALUES($1,$2,$3,$4,$5,$6,current_timestamp) RETURNING*;",
      [commentTitle, commentDesc, userID, username, siteID, commentScore]
    );
    }else{
      const response = await pool.query(
        "INSERT INTO comments (comment_title, comment_description, owner_id, owner_name, site_id, created_on) VALUES($1,$2,$3,$4,$5,current_timestamp) RETURNING*;",
        [commentTitle, commentDesc, userID, username, siteID]
      );
    }

    await updateScore(siteID);
    res.status(200).json({ message: {type: 'success', content:'Comment Added'} });
    // .json({ message: {type: 'success', content:'Comment Added'}});
  }catch(err){
    console.error(err.message);
  }
});



const updateScore = async (siteID) => {
  //get all scores
  const scoresResponse = await pool.query(
    "SELECT comment_score FROM comments WHERE site_id = $1 AND comment_score IS NOT NULL", 
    [siteID]
  )

  let scores = 0;
  for (let i = 0; i < scoresResponse.rows.length; i++) {
    if(scoresResponse.rows[i].comment_score){
    scores += scoresResponse.rows[i].comment_score;
  }
}

  //find and update average
  scores = Math.round(scores/scoresResponse.rows.length);
  const averageResponse = await pool.query(
    "UPDATE site SET average_score =$2 WHERE site_id = $1 RETURNING*",
    [siteID, scores]
  )
}

module.exports = router;
