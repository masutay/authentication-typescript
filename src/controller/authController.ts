import { RequestHandler } from "express";
import { IRegisterUser } from "../models/Interfaces/register.interface";
import { User } from "../models/entity/User";
import { getRepository } from "typeorm";
import { hash, compare } from "bcryptjs";
import * as session from 'express-session'
import { validate } from "class-validator";



/*

 TODO
 -registerUser
 -loginUser (create session and jwt)
 -logoutUser
 


*/

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { userName, email, firstName, lastName, password }: IRegisterUser =
      req.body;

    //change passwordHash on model ???
    const passwordHash = await hash(password, 10);
    // password = Object.assign(passwordHash)
    const userRepository = getRepository(User);
    const user = await userRepository.create({
      firstName,
      lastName,
      password: passwordHash,
      email,
      userName,
    });

    validate(user).then(errors => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        const errMessages = errors.map((errors) => {

          const errorMessages = Object.values(errors.constraints);
          errorMessages.forEach(element => {
            console.log(element)

          });
          console.log(errors)
          return errMessages

        })

      } else {
        console.log('validation succeed');
      }
    });

    await userRepository.save(user);
    res.status(201).json(user);
  } catch (error) {

    res.send({ result: "Error", error: error });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  const { userName, password } = req.body as IRegisterUser;

  try {
    const user = await getRepository(User).findOne({ userName })

    if (!user) throw "User is not registered";

    const isOkey = await compare(password, user.password)

    if (!isOkey) throw "Password is not correct";

    req.session.userName = user.userName;
    req.session.browserInfo = req.headers['user-agent']

    console.log(req.session)
    console.log(user)
    res.status(201).json(user);
  } catch (error) {
    console.log(error)
    res.status(400).send({ result: "Error", error: error });
  }
};


export const logoutUser: RequestHandler = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(400).send({ result: "Error", error: error })
    } else {
      res.status(201).send('Logged out')
    }

  })
}