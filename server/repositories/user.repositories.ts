import { prisma } from "@/lib/prisma";

export class UserRepository {
    // Criar um novo usuario
    async create(data: { name: string; email: string; password: string }) {
        return prisma.user.create({
            data
        });
    }

    // Busca um usuário pelo email
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    // Atualiza os dados do usuário (nome, novo email ou senha)
    async update(email: string, data: { name?: string; email?: string; password?: string }) {
        return prisma.user.update({
            where: { email },
            data
        });
    }
    // Deleta o usuário permanentemente
    async delete(email: string) {
        return prisma.user.delete({
            where: { email }
        });
    }
}

