/**
 * Rota API GET: /api/user/me
 * Responsável por validar a sessão atual e retornar os dados logados do usuário.
 */
import { UserController } from "@/server/controllers/user.controller";

const userController = new UserController();

export async function GET(req: Request) {
    return userController.getMe(req);
}
