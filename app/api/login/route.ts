/**
 * Rota API POST: /api/login
 * Responsável por autenticar um usuário existente e gerar um token de sessão.
 */

import { UserController } from "@/server/controllers/user.controller";

const userController = new UserController();

export async function POST(req: Request) {
    return userController.login(req);
}
