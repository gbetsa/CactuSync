/**
 * Rota API PUT: /api/assets/update
 * Responsável por atualizar um ativo existente.
 */
import { AssetController } from "@/server/controllers/asset.controller";

const assetController = new AssetController();

export async function PUT(req: Request) {
    return assetController.updateAsset(req);
}
