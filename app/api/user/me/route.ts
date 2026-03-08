import { prisma } from "@/lib/prisma";

/**
 * Rota API GET: /api/user/me
 * Responsável por validar a sessão atual e retornar os dados logados do usuário.
 */
export async function GET(req: Request) {
    // 1. Pegamos o email diretamente do header que o proxy injetou
    const email = req.headers.get('x-user-email');

    if (!email) {
        // Retorna erro se o token não existir (o usuário não está logado)
        return Response.json({ error: "Não autenticado" }, { status: 401 });
    }

    try {
        // 2. Busca os dados mais recentes do usuário no banco de dados
        // 'select' garante que a senha (mesmo em hash) jamais será retornada para o frontend
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                name: true,
                email: true,
                updatedAt: true
            }
        });

        if (!user) {
            return Response.json({ error: "Usuário não encontrado" }, { status: 404 });
        }

        // 2. Retorna os dados seguros do usuário para a interface
        return Response.json({ user });

    } catch (error) {
        // 3. Tratamento de erro específico para problemas criptográficos (token expirado ou fraudado)
        console.error("Erro na verificação do token:", error);
        return Response.json({ error: "Sessão inválida" }, { status: 401 });
    }
}
