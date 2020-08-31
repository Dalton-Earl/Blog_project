var express = require('express')
var router = express.Router()
var database = require("./db")
const { PayloadTooLarge } = require('http-errors')

router.get('/api/get/allposts', (req, res, next) =>{
   database.query("SELECT * FROM posts ORDER BY date_create DESC", (q_err, q_res) => {
        res.json(q_res.rows)  
   }) 
})

router.get('/api/get/post', (req,res, next) => {
    const post_id = req.query.post_id

    database.query(`SELECT * FROM posts WHERE pid=$1`, [ post_id ],
    (q_err, q_res) => {
        res.json(q_res.rows)
    })
} )

router.put('/api/put/post', (req, res, next) => {
    const values = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username]
    database.query(`UPDATE posts SET title= $1, body=$2, user_id=$3, author=$5, date_created=NOW()
    WHERE pid =$4`, values,
    (q_err, q_res) => {
        console.log(q_res)
        console.log(q_err)
    })
})

router.delete('/api/delete/post', (req, res, next) => {
    const post_id = req.body.post_id
    database.query(`DELETE FROM posts WHERE pid =$1`, [ post_id ],
    (q_err, q_res) =>{
        res.json(q_res.rows)
        console.log(q_err)
    })
})

router.post('/api/post/commenttodb', (req,res, next) => {
    const values = [ req.body.comment, req.body.user_id, req.body.username, req.body.post_id]

    database.query(`INSERT INTO comments(comment, user_id, author, post_id, date_created)
    VALUES($1, $2, $3, $4, NOW())`, values,
    (q_err, q_res ) => {
        res.json(q_res.rows)
        console.log(q_err)
    })

})
router.put('/api/put/commenttodb', (req, res, next) => {
    const values = [ req.body.comment, req.body.user_id, req.body.post_id, req.body.username, req.body.cid]
  
    pool.query(`UPDATE comments SET
                comment = $1, user_id = $2, post_id = $3, author = $4, date_created=NOW()
                WHERE cid=$5`, values,
                (q_err, q_res ) => {
                    res.json(q_res.rows)
                    console.log(q_err)
        })
  })
  
  
  router.delete('/api/delete/comment', (req, res, next) => {
    const cid = req.body.comment_id
    console.log(cid)
    pool.query(`DELETE FROM comments
                WHERE cid=$1`, [ cid ],
                (q_err, q_res ) => {
                    res.json(q_res)
                    console.log(q_err)
        })
  })
  
  
  router.get('/api/get/allpostcomments', (req, res, next) => {
    const post_id = String(req.query.post_id)
    pool.query(`SELECT * FROM comments
                WHERE post_id=$1`, [ post_id ],
                (q_err, q_res ) => {
                    res.json(q_res.rows)
        })
  })

module.exports = router