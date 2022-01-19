// import { Request, Response, NextFunction, RequestHandler } from "express"
// import { getConnection } from "typeorm";
// import { TypeormStore } from "typeorm-store";
// import { Session } from "../models/entity/Session"
// import * as session from 'express-session'
// import * as express from "express"




// export const sessionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const repository = await getConnection().getRepository(Session);

//     // session({
//     //   secret: 'alminatolgasutay',
//     //   resave: false,
//     //   saveUninitialized: false,
//     //   cookie: {
//     //     maxAge: 60000,
//     //   },
//     //   store: new TypeormStore({ repository })
//     // }))
//     console.log(req.session)
//   } catch (err) {
//     res.send(err)
//   }

//   next()
// }

