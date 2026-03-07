import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

/**
 * Rota API DELETE: /api/user/delete
 * Responsável por remover a conta permanentemente e invalidar a sessão atual.
 */
export async function DELETE() {
    // 1. Garante que só quem está logado tenha acesso a esta rota destrutiva
    const token = (await cookies()).get("auth-token")?.value;

    if (!token) {
        return Response.json({ error: "Não autenticado" }, { status: 401 });
    }

    try {
        // 2. Resolve o JWT para determinar qual conta deve ser excluída (usando a assinatura confiável do servidor)
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        const email = payload.email as string;

        // 3. Executa a deleção no banco de dados via Prisma ORM
        // A exclusão garante que todos os dados relacionados ao email sejam perdidos.
        await prisma.user.delete({
            where: { email },
        });

        // 4. Invalida a sessão forçando a expiração do cookie (como na rota de logout)
        (await cookies()).delete("auth-token");

        // 5. Responde que tudo ocorreu bem para que o frontend redirecione o usuário à tela final
        return Response.json({ success: true });

    } catch (error) {
        console.error("Erro ao deletar conta:", error);
        return Response.json({ error: "Erro ao tentar remover conta" }, { status: 500 });
    }
}
