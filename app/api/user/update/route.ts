import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * Rota API POST: /api/user/update
 * Responsável por atualizar o perfil do usuário logado (nome, e-mail e/ou senha).
 */
export async function POST(req: Request) {
    // 1. Pegamos o email diretamente do header que o proxy injetou
    const email = req.headers.get('x-user-email');

    if (!email) {
        return Response.json({ error: "Não autenticado" }, { status: 401 });
    }

    try {
        // 2. Extrai os dados enviados pelo formulário
        const { name, email, password, currentPassword } = await req.json();

        // 3. Fluxo de Segurança Opcional: Se o usuário estiver tentando trocar a senha
        if (password) {
            // Exige a senha atual como medida de segurança
            if (!currentPassword) {
                return Response.json({ error: "Informe sua senha atual para alterá-la" }, { status: 400 });
            }

            // Busca o hash atual no banco e compara com a senha atual informada
            const dbUser = await prisma.user.findUnique({ where: { email }, select: { password: true } });
            const isValid = dbUser && await bcrypt.compare(currentPassword, dbUser.password);

            if (!isValid) {
                return Response.json({ error: "Senha atual incorreta" }, { status: 401 });
            }
        }

        // 4. Verificação de Conflito: Se o e-mail novo for solicitado, verifica se pertence a outro usuário
        if (email && email !== email) {
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return Response.json({ error: "Este e-mail já está em uso" }, { status: 400 });
            }
        }

        // 6. Preparações Finais: Constrói o objeto apenas com os campos que vieram preenchidos
        const updateData: any = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) {
            // Importante: garante um novo hash seguro caso a senha vá mudar
            updateData.password = await bcrypt.hash(password, 10);
        }

        // 7. Atualização do banco de dados (Prisma) limitando o objeto modificado pelo email validado do token
        const updatedUser = await prisma.user.update({
            where: { email },
            data: updateData,
            select: { name: true, email: true, updatedAt: true } // Novamente omitindo a senha do retorno
        });

        // 8. Retorna a confirmação de sucesso
        return Response.json({ message: "Perfil atualizado com sucesso", user: updatedUser });

    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        return Response.json({ error: "Erro ao atualizar dados" }, { status: 500 });
    }
}
