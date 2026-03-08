/**
 * Rota API POST: /api/assets/create
 * Responsável por criar um novo ativo para um usuário.
 */
import { AssetController } from "@/server/controllers/asset.controller";

const assetController = new AssetController();

export async function POST(req: Request) {
    return assetController.createAsset(req);
}
