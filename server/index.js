    const express = require('express');
    const app = express();
    const cors = require('cors');
    const corsOptions = {
        origin: ['http://localhost:5173'],
        methods: ['POST', 'GET'],
        credentials: true
    }
    const mysql = require('mysql2');
    const db = require('./db');
    const bcrypt = require('bcrypt');
    // const jwt = require('jsonwebtoken');
    const crypto = require('crypto')

    app.use(cors(corsOptions));
    app.use(express.json())
    // require('dotenv').config();


    app.post('/login', async (req, res) => {
    const {email: loginEmail, password: loginPassword, rememberMe: rememberLogin} = req.body;

    if(!loginEmail || !loginPassword){
        return res.status(400).json({success: false, message: 'missing credentials'});
    }

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [loginEmail]);
        if(rows.length > 0){
            const user = rows[0]
            const isMatch = await bcrypt.compare(loginPassword, user.password)
            if(isMatch){

                let token = null;

                if(rememberLogin){
                token = crypto.randomBytes(32).toString('hex');

                await db.query('UPDATE users SET token = ? WHERE email = ?', [token, loginEmail]) 
            }

                return res.json({success: true, message: 'login successful', token})
            }else{
                return res.json({success: false, message: 'incorrect password'})
            }
           
    }else{
                return res.status(400).json({success: false, message: 'login failed'})

    }
    } catch (error) {
        console.log(`login error ${error}`)
        res.status(500).json({success: false, message: 'unable to access server'})
    }
    })

    // //////////////////////////////////////////////////////////////////////////////

    app.post('/signup', async (req, res)=>{
        const {email, tel, password} = req.body

        if(!email || !tel || !password){
            return res.status(400).json({success: false, message: 'missing credentials'});
        }
        try {

            const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            if(existingUser.length > 0){return res.json({success: false, message: 'user already exists'})}

            const hashedPassword = await bcrypt.hash(password, 10)
            const [insert] = await db.query('INSERT INTO users (email, tel, password) VALUES (?,?,?)', [email, tel, hashedPassword])
            if(insert.affectedRows > 0){
                return res.json({success: true, message: 'user registration successful'})
            }else{
                return res.json({success: false, message: 'registration failed'})
            }
        } catch (error) {
           return res.status(500).json({success: false, message: 'server error'});
        }
    })

    app.post('/verifyToken', async(req, res)=>{

       try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token){
          return  res.status(401).json({success: false, message: 'no token found'})
        }

            const [rows] = await db.query('SELECT * FROM users WHERE token = ?', [token]);
            const user = rows[0]

            if(!user){
                return res.status(404).json({success: false, message: 'user mismatched'})
            }

            return res.json({
                success: true,
                message: 'valid token',
                user: {
                    email: user.email,
                    tel: user.tel
                }
            })

       } catch (error) {
             console.error(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ success: false, message: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    return res.status(500).json({ success: false, message: 'Server error' });
  }
    })

    const PORT = 8080;
    app.listen(PORT, ()=>{
        console.log(`server running on port ${PORT}`);
        
    })
