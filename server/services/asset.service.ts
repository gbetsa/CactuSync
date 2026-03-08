import { AssetRepository } from "../repositories/asset.repository";
import { UserRepository } from "../repositories/user.repositories";
import { AssetType } from "@/app/generated/prisma";

export class AssetService {
    private assetRepository = new AssetRepository();
    private userRepository = new UserRepository();

    // Adiciona um novo ativo para um usuário baseado no email (que vem do token)
    async addAsset(email: string, data: {
        symbol: string;
        name?: string;
        type: AssetType;
        quantity: number;
        averagePrice: number;
    }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("USER_NOT_FOUND");

        return this.assetRepository.create({
            ...data,
            userId: user.id
        });
    }

    // Busca todos os ativos do usuário para montar o Dashboard
    async getUserDashboard(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("USER_NOT_FOUND");

        const assets = await this.assetRepository.findByUserId(user.id);
        const totalValue = assets.reduce((sum, asset) => sum + (asset.quantity * asset.averagePrice), 0);

        // Calcula Distribuição por Tipo
        const distribution: Record<string, number> = {
            STOCK: 0,
            CRYPTO: 0,
            FIXED_INCOME: 0,
            REAL_ESTATE: 0,
            OTHER: 0
        };

        if (totalValue > 0) {
            assets.forEach(asset => {
                const assetValue = asset.quantity * asset.averagePrice;
                distribution[asset.type] += (assetValue / totalValue) * 100;
            });
        }

        return {
            assets,
            totalAssets: totalValue,
            distribution
        };
    }

    // Exclui um ativo verificando se o usuário é o dono
    async deleteAsset(email: string, assetId: number) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("USER_NOT_FOUND");

        const asset = await this.assetRepository.findById(assetId);
        if (!asset || asset.userId !== user.id) throw new Error("UNAUTHORIZED");

        return this.assetRepository.delete(assetId);
    }

    // Atualiza um ativo verificando se o usuário é o dono
    async updateAsset(email: string, assetId: number, data: { quantity?: number; averagePrice?: number }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("USER_NOT_FOUND");

        const asset = await this.assetRepository.findById(assetId);
        if (!asset || asset.userId !== user.id) throw new Error("UNAUTHORIZED");

        return this.assetRepository.update(assetId, data);
    }

    // Busca um ativo específico verificando se o usuário é o dono
    async getAssetById(email: string, assetId: number) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("USER_NOT_FOUND");

        const asset = await this.assetRepository.findById(assetId);
        if (!asset || asset.userId !== user.id) throw new Error("UNAUTHORIZED");

        return asset;
    }
}