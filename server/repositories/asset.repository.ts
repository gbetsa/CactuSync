import { prisma } from "@/lib/prisma";
import { AssetType } from "@/app/generated/prisma";

export class AssetRepository {
    // Lista todos os ativos de um usuário específico
    async findByUserId(userId: number) {
        return prisma.asset.findMany({
            where: { userId },
            include: {
                transactions: true // Já traz as compras/vendas junto
            },
            orderBy: { symbol: 'asc' }
        });
    }

    // Cria um novo ativo (ex: quando o usuário compra a primeira ação de Petrobras)
    async create(data: {
        symbol: string;
        name?: string;
        type: AssetType;
        quantity: number;
        averagePrice: number;
        userId: number;
    }) {
        return prisma.asset.create({
            data
        });
    }

    // Exclui um ativo
    async delete(id: number) {
        return prisma.asset.delete({
            where: { id }
        });
    }

    // Busca um ativo por ID para verificar dono
    async findById(id: number) {
        return prisma.asset.findUnique({
            where: { id }
        });
    }

    // Atualiza um ativo existente (ex: mudar preço médio ou quantidade total)
    async update(id: number, data: { quantity?: number; averagePrice?: number }) {
        return prisma.asset.update({
            where: { id },
            data
        });
    }
}