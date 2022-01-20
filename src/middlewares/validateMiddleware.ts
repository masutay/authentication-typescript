import { RequestHandler } from 'express';
import { check, validationResult } from 'express-validator';


export const registerValidator = [
        
        check("firstName", 'First name is required.').trim().notEmpty(),
        check("lastName", "Last name is required").trim().notEmpty(),
        check("userName", "User name must be at least 3 characters long.").notEmpty().isLength({ min: 3 }),
        check("password", "Password must be at least 3 characters long.").notEmpty().isLength({ min: 3 }),
        check("email", "Email must be at least 3 characters long.").notEmpty().isLength({ min: 3 }),
    ]
    

export const checkRegister: RequestHandler = (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.locals.errors = errors.array();
        const errorMessages = errors.array().map((error) => {
           return {
               message:error.msg
           }
        })
        res.send(errorMessages)
        return
    }
    next()
};


export const loginValidator = [
    check("userName", 'First name is required.').trim().notEmpty(),
    check("password", "Last name is required").trim().notEmpty(),
]

