/**
 * Rota API GET: /api/assets/dashboard
 * Responsável por buscar o dashboard de um usuário.
 */
import { AssetController } from "@/server/controllers/asset.controller";

const assetController = new AssetController();

export async function GET(req: Request) {
    return assetController.getDashboard(req);
}
