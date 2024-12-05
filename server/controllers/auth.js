import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

import User from '../models/user.js';

import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

const router = express.Router();


export const loginUser = async (req, res) => { 
    const body = req.body
    if (!body.password){
        res.status(400).json({message: "No Password Provided"})
        return
    }
    if (!body.email){
        res.status(400).json({message: "No Email Provided"})
        return
    }
    const inputEmail = req.body.email
    const password = req.body.password
    const user = await User.findOne({email : inputEmail});
    if (!user){
        res.status(404).json({message : "User not found"})
        return
    }

    const good_password = await bcrypt.compare(password, user.password);

    if (good_password){
        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET,             
            { expiresIn: '1h' }                 
        );
        res.status(200).json({jwt: token})
        return
    } else {
        res.status(400).json({message : "Incorrect Password"})
        return
    }
}

export const createUser = async (req, res) => {
    const body = req.body;
    if (!body.password){
        res.status(400).json({message: "No Password Provided"})
        return
    }

    if (!body.email){
        res.status(400).json({message: "No Email Provided"})
        return
    }
    const email = body.email
    try{
        const existingUser = await User.findOne({ email: body.email });
        if(existingUser){
            res.status(400).json({message: "Email In Use"})
            return
        }
    } catch(error){
        console.log(error)
        res.status(500).json({message : "Something went wrong with the server"})
        return
    }
    

    const salt = 10
    const hashedPassword = await bcrypt.hash(body.password, salt)
    

    const newUser = new User({email: body.email,password: hashedPassword})

    try {
        await newUser.save()

        res.status(201).json({message : "User Created"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to create user" });
    }
}

export const validate = async (req, res) =>{
    const token = req.body.token;
    if(!token){
        res.status(400).json({message : "No token provided"})
        return
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({message : "Token Verified"})
        return
    } catch {
        res.status(401).json({message : "Token is invalid"})
        return
    }
}



export default router;