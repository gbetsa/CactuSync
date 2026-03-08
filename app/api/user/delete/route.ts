/**
 * Rota API DELETE: /api/user/delete
 * Responsável por remover a conta permanentemente e invalidar a sessão atual.
 */
import { UserController } from "@/server/controllers/user.controller";
import { cookies } from "next/headers";

const userController = new UserController();

export async function DELETE(req: Request) {
    const response = await userController.deleteMe(req);

    // Se a deleção no banco deu certo, limpamos o cookie
    if (response.ok) {
        (await cookies()).delete("auth-token");
    }

    return response
}

