import { Router } from "express";

import LetterController from "./app/controllers/LetterController";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";


import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

// PUBLIC ROUTES

routes.post("/login", SessionController.store);
routes.post("/user", UserController.store);

//Para usar a rota privada ativar o middleware de autenticação e enviar o jwt
routes.use(authMiddleware);

// PRIVATE ROUTES
routes.post("/letter", LetterController.store);
routes.get("/letter", LetterController.index);
routes.put("/letter/:id", LetterController.update);
routes.delete("/letter/:id", LetterController.delete);

routes.get("/user", UserController.index);
routes.put("/user/:id", UserController.update);
routes.delete("/user/:id", UserController.delete);

export default routes;
