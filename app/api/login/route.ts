import { SignJWT } from "jose";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

/**
 * Rota API POST: /api/login
 * Responsável por autenticar um usuário existente e gerar um token de sessão.
 */
export async function POST(req: Request) {
    // 1. Extrai email e senha do corpo da requisição
    const { email, password } = await req.json();

    // 2. Busca o usuário no banco de dados usando o email fornecido
    const user = await prisma.user.findUnique({
        where: { email }
    });

    // 3. Verifica se o usuário existe e se a senha está correta
    // Utiliza o bcrypt para comparar a senha em texto plano com o hash salvo no banco
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return Response.json({ error: "Email ou senha inválidos" }, { status: 401 });
    }

    // --- GERANDO O TOKEN DE AUTENTICAÇÃO (JWT) ---
    // 4. Pega a chave secreta definida nas variáveis de ambiente e a codifica para Uint8Array
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // 5. Cria e assina digitalmente o token JWT contendo o email do usuário no payload
    const token = await new SignJWT({ email })
        .setProtectedHeader({ alg: "HS256" }) // Define o algoritmo de criptografia
        .setIssuedAt() // Marca a hora de emissão do token
        .setExpirationTime("1h") // Define a validade do token para 1 hora
        .sign(secret); // Assina efetivamente com a nossa chave secreta

    // --- GERENCIAMENTO DE SESSÃO COM COOKIE ---
    // 6. Salva o token gerado em um cookie de segurança do navegador
    (await cookies()).set("auth-token", token, {
        httpOnly: true, // Segurança vital: Impede que scripts do lado do cliente (como XSS) leiam o token
        secure: process.env.NODE_ENV === "production", // Força o envio do cookie apenas via HTTPS em produção
        maxAge: 60 * 60, // O cookie é expirado mecanicamente no navegador em 1 hora, acompanhando o JWT
        path: "/", // O cookie será válido para toda a aplicação
    });

    // 7. Retorna sucesso para o frontend
    return Response.json({ message: "Login realizado com sucesso" }, { status: 200 });
}