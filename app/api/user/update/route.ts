/**
 * Rota API POST: /api/user/update
 * Responsável por atualizar o perfil do usuário logado (nome, e-mail e/ou senha).
 */
import { UserController } from "@/server/controllers/user.controller";

const userController = new UserController();

export async function PUT(req: Request) {
    return userController.updateMe(req);
}
