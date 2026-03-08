/**
 * Rota API DELETE: /api/assets/delete
 * Responsável por excluir um ativo de um usuário.
 */
import { AssetController } from "@/server/controllers/asset.controller";

const assetController = new AssetController();

export async function DELETE(req: Request) {
    return assetController.deleteAsset(req);
}
