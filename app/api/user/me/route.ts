import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

/**
 * Rota API GET: /api/user/me
 * Responsável por validar a sessão atual e retornar os dados logados do usuário.
 */
export async function GET() {
    // 1. Tenta recuperar o token JWT armazenado de forma segura nos cookies
    const token = (await cookies()).get("auth-token")?.value;

    if (!token) {
        // Retorna erro se o token não existir (o usuário não está logado)
        return Response.json({ error: "Não autenticado" }, { status: 401 });
    }

    try {
        // 2. Prepara a chave secreta para decodificação
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        // 3. Verifica criptograficamente a validade e assiantura do token
        const { payload } = await jwtVerify(token, secret);

        // Extrai o email que foi guardado dentro do token durante o login
        const email = payload.email as string;

        // 4. Busca os dados mais recentes do usuário no banco de dados
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

        // 5. Retorna os dados seguros do usuário para a interface
        return Response.json({ user });

    } catch (error) {
        // 6. Tratamento de erro específico para problemas criptográficos (token expirado ou fraudado)
        console.error("Erro na verificação do token:", error);
        return Response.json({ error: "Sessão inválida" }, { status: 401 });
    }
}
