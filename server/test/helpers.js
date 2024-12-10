import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

import User from '../models/user.js';

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
export const demo_password = "1234567890"
export const deleteUser = async (inputEmail) => {
    try{
        const user = await User.findOne({email : inputEmail});
        if (!user){
            return {success : false, message : "User not found"}
        }
        await User.deleteOne({email : inputEmail})
        return {success : true, message : "Successful deletion"}

    } catch {
        return {success : false, message : "Error in deleting user"}
    }
}

export const createUser = async (inputEmail) => {
    try{
        const user = await User.findOne({email : inputEmail});
        if (user){
            return {success : false, message : "User already in db"}
        }
        const newUser = new User({email: inputEmail,password: demo_password})
        await newUser.save()
        return {success : true, message : "User created"}

    } catch {
        return {success : false, message : "Error in creating user"}
    }
}

export const test_emails = ["int_tester@test.com", "int_tester2@test.com", "int_tester3@test.com"]