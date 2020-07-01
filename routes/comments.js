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
    const {commentTitle, commentDesc} = req.body;
    const siteID = req.params.site;
    const userID = req.user.user_id;
    console.log(commentTitle);
    console.log(commentDesc);

    const response = await pool.query(
      "INSERT INTO comments (comment_title, comment_description, owner_id, site_id, created_on) VALUES($1,$2,$3,$4,current_timestamp) RETURNING*;",
      [commentTitle, commentDesc, userID, siteID]
    );
    res.status(200)
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
