const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const router = express.Router();

let refreshTokens = [];

//generate accesstoken and refreash token
router.post('/login', (req, res) => {
    const username = req.body.username;
    const user = {name:username}
    const accessToken = jwt.sign(user,process.env.TOKEN_SECRET,
        {expiresIn: '10s'}
     );
     const refreshToken = jwt.sign(user,process.env.RE_TOKEN_SECRET,
        {expiresIn: '10m'}
     );
     refreshTokens.push(refreshToken)
    res.send({accessToken, refreshToken});
})

// receive refreash token and generate access token
 router.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken
    if(refreshToken==null) res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) res.sendStatus(403);
    jwt.verify(refreshToken, process.env.RE_TOKEN_SECRET, (err, user)=>{
        if(err) res.sendStatus(403);
        const accessToken = jwt.sign({name:user.name},process.env.TOKEN_SECRET,
            {expiresIn: '10s'}
         );
         res.send({accessToken});
    } )
 })

 //delete refreash token when user logged out
 router.delete('/logout', (req, res) =>{
    const refreshToken = req.body.refreshToken;
    refreshTokens = refreshTokens.filter(t=> t !== refreshToken);
    res.sendStatus(204);
 })



module.exports = router