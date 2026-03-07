import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

/**
 * Rota API POST: /api/register
 * Responsável por cadastrar um novo usuário, fazer o hash da senha e logá-lo automaticamente.
 */
export async function POST(req: Request) {
    try {
        // 1. Extrai os dados enviados no corpo da requisição
        const { name, email, password } = await req.json();

        // 2. Validação: Verifica se o usuário já existe usando o email
        // O banco de dados (Prisma) é consultado para garantir que não haja duplicidade
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            // Retorna erro 400 (Bad Request) caso o email já esteja em uso
            return Response.json({ error: "Este e-mail já está cadastrado" }, { status: 400 });
        }

        // 3. Segurança: Faz o "hash" (criptografia unidirecional) da senha
        // O custo '10' define a complexidade computacional para dificultar ataques de força bruta
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Cria o novo usuário no banco de dados com a senha já protegida
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });

        // --- AUTO-LOGIN: GERANDO O TOKEN JWT LOGO APÓS O CADASTRO ---
        // 5. Prepara a chave secreta do servidor
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        // 6. Cria um token de sessão válido por 1 hora, vinculando-o ao email recém-cadastrado
        const token = await new SignJWT({ email: newUser.email })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(secret);

        // --- SALVANDO A SESSÃO NO NAVEGADOR ---
        // 7. Define o cookie seguro no cliente para manter o usuário logado
        (await cookies()).set("auth-token", token, {
            httpOnly: true, // Bloqueia acesso via JavaScript do lado do cliente
            secure: process.env.NODE_ENV === "production", // Somente HTTPS em produção
            maxAge: 60 * 60, // Duração de 1 hora
            path: "/",
        });

        // 8. Retorna sucesso e os dados básicos do usuário (sem a senha) 
        // para a interface atualizar o estado global (Zustand)
        return Response.json({ message: "Usuário criado com sucesso", user: { email: newUser.email, name: newUser.name } }, { status: 201 });

    } catch (error) {
        // 9. Tratamento genérico de erros inesperados (ex: falhas de banco de dados)
        console.error("Erro no registro:", error);
        return Response.json({ error: "Erro interno no servidor ao cadastrar" }, { status: 500 });
    }
}
