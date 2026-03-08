/**
 * Rota API POST: /api/register
 * Responsável por cadastrar um novo usuário, fazer o hash da senha e logá-lo automaticamente.
 */

import { UserController } from "@/server/controllers/user.controller";

const userController = new UserController();

export async function POST(req: Request) {
    return userController.register(req);
}

