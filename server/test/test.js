import fetch from 'node-fetch';
import mongoose from 'mongoose';
import User from '../models/user.js';
import {expect} from 'chai'
// eslint-disable-next-line no-undef
describe('testing the authentication routes', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    const CONNECTION_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/project';
    try {
        await mongoose.connect(CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
    });
    // eslint-disable-next-line no-undef
    after(async () => {
      const deletion_status = await deleteUser(test_emails[0])
      console.log('deletion_status: ', deletion_status);
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    });
    // eslint-disable-next-line no-undef
    it('should return 200 signaling a successful user creation', async () => {
      //Arrange 
      const url = 'http://localhost:5000/auth/signup';

      const payload = {
        email : test_emails[1],
        password : demo_password
      }

      const headers = {
        'Content-Type': 'application/json',
      };
      //Act
      const res = await fetch(url, {
        method : 'POST',
        headers : headers,
        body : JSON.stringify(payload)
      })

      const body = await res.json();
      //Assert
      expect(res.status).equals(201);
      expect(body).to.have.property('message').that.equals('User Created')

      //Cleanup
      deleteUser(test_emails[1])
    })
    // eslint-disable-next-line no-undef
    it('should return 200 and return a jwt token on signin', async () => {
      // Arrange
      const url = 'http://localhost:5000/auth/login';
      const user_status = await createUser(test_emails[0])
      console.log('user_status: ', user_status);

      const payload = {
        email : test_emails[0],
        password : demo_password
      }
      const headers = {
        'Content-Type': 'application/json',
      };
      //Act
      const res = await fetch(url, {
        method : 'POST',
        headers : headers,
        body : JSON.stringify(payload)
      })
      const body = await res.json();
      console.log('body: ', body.message);
      // Assert
      expect(res.status).equals(200);
      expect(body).to.have.property('jwt')
    });
    // eslint-disable-next-line no-undef
    it('should return 400 when fed a bad password', async () => {
        // Arrange
        const url = 'http://localhost:5000/auth/login';
        const user_status = await createUser(test_emails[0])
        console.log('user_status: ', user_status);
      
        const payload = {
          email : test_emails[0],
          password : "wseftghjlk"
        }
        const headers = {
          'Content-Type': 'application/json',
        };
        //Act
        const res = await fetch(url, {
          method : 'POST',
          headers : headers,
          body : JSON.stringify(payload)
          })
        const body = await res.json();
        console.log('body: ', body.message);
        // Assert
        expect(res.status).equals(400);
        expect(body).to.have.property('message').that.equals('Incorrect Password')
    })

  });
  
  
  const deleteUser = async (inputEmail) => {
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
  
  const createUser = async (inputEmail) => {
    const url = 'http://localhost:5000/auth/signup';

      const payload = {
        email : inputEmail,
        password : demo_password
      }

      const headers = {
        'Content-Type': 'application/json',
      };

      await fetch(url, {
        method : 'POST',
        headers : headers,
        body : JSON.stringify(payload)
      })
  }

  const demo_password = "1234567890"
  const test_emails = ["int_tester@test.com", "int_tester2@test.com", "int_tester3@test.com"]