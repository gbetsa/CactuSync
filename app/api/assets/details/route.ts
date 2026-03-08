/**
 * Rota API GET: /api/assets/details
 * Responsável por buscar os detalhes de um ativo específico.
 */
import { AssetController } from "@/server/controllers/asset.controller";

const assetController = new AssetController();

export async function GET(req: Request) {
    return assetController.getAssetById(req);
}
