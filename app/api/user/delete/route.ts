import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

/**
 * Rota API DELETE: /api/user/delete
 * Responsável por remover a conta permanentemente e invalidar a sessão atual.
 */
export async function DELETE(req: Request) {
    // 1. Pegamos o email diretamente do header que o proxy injetou
    const email = req.headers.get('x-user-email');

    if (!email) {
        return Response.json({ error: "Não autenticado" }, { status: 401 });
    }

    try {
        // 2. Executa a deleção no banco de dados via Prisma ORM
        // A exclusão garante que todos os dados relacionados ao email sejam perdidos.
        await prisma.user.delete({
            where: { email },
        });

        // 2. Invalida a sessão forçando a expiração do cookie (como na rota de logout)
        (await cookies()).delete("auth-token");

        // 3. Responde que tudo ocorreu bem para que o frontend redirecione o usuário à tela final
        return Response.json({ success: true });

    } catch (error) {
        console.error("Erro ao deletar conta:", error);
        return Response.json({ error: "Erro ao tentar remover conta" }, { status: 500 });
    }
}
