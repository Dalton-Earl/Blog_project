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


module.exports = router