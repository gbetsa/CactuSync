import { NextResponse } from "next/server";
import { AssetService } from "../services/asset.service";
import { ZodError } from "zod";
import { assetSchema } from "../schemas/asset.schema";

export class AssetController {
    private assetService = new AssetService();

    // GET /api/assets
    async getDashboard(req: Request) {
        try {
            const email = req.headers.get('x-user-email');
            if (!email) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

            const dashboard = await this.assetService.getUserDashboard(email);
            return NextResponse.json(dashboard);
        } catch (error: any) {
            return NextResponse.json({ error: "Erro ao buscar dashboard" }, { status: 500 });
        }
    }

    // POST /api/assets
    async createAsset(req: Request) {
        try {
            const email = req.headers.get('x-user-email');
            if (!email) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

            const body = await req.json();
            const data = assetSchema.parse(body);

            const newAsset = await this.assetService.addAsset(email, data);
            return NextResponse.json({ message: "Ativo criado com sucesso", asset: newAsset }, { status: 201 });
        } catch (error: any) {
            if (error instanceof ZodError) {
                return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
            }
            return NextResponse.json({ error: "Erro ao criar ativo" }, { status: 400 });
        }
    }

    // DELETE /api/assets/delete
    async deleteAsset(req: Request) {
        try {
            const email = req.headers.get('x-user-email');
            if (!email) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

            const { searchParams } = new URL(req.url);
            const assetId = parseInt(searchParams.get("id") || "");

            if (!assetId) return NextResponse.json({ error: "ID do ativo é obrigatório" }, { status: 400 });

            await this.assetService.deleteAsset(email, assetId);
            return NextResponse.json({ message: "Ativo excluído com sucesso" });
        } catch (error: any) {
            if (error.message === "UNAUTHORIZED") {
                return NextResponse.json({ error: "Você não tem permissão para excluir este ativo" }, { status: 403 });
            }
            return NextResponse.json({ error: "Erro ao excluir ativo" }, { status: 500 });
        }
    }

    // PUT /api/assets/update
    async updateAsset(req: Request) {
        try {
            const email = req.headers.get('x-user-email');
            if (!email) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

            const body = await req.json();
            const { id, ...data } = body;

            if (!id) return NextResponse.json({ error: "ID do ativo é obrigatório" }, { status: 400 });

            const updatedAsset = await this.assetService.updateAsset(email, id, data);
            return NextResponse.json({ message: "Ativo atualizado com sucesso", asset: updatedAsset });
        } catch (error: any) {
            if (error.message === "UNAUTHORIZED") {
                return NextResponse.json({ error: "Você não tem permissão para editar este ativo" }, { status: 403 });
            }
            return NextResponse.json({ error: "Erro ao atualizar ativo" }, { status: 500 });
        }
    }

    // GET /api/assets/details
    async getAssetById(req: Request) {
        try {
            const email = req.headers.get('x-user-email');
            if (!email) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

            const { searchParams } = new URL(req.url);
            const assetId = parseInt(searchParams.get("id") || "");

            if (!assetId) return NextResponse.json({ error: "ID do ativo é obrigatório" }, { status: 400 });

            const asset = await this.assetService.getAssetById(email, assetId);
            return NextResponse.json(asset);
        } catch (error: any) {
            if (error.message === "UNAUTHORIZED") {
                return NextResponse.json({ error: "Você não tem permissão para visualizar este ativo" }, { status: 403 });
            }
            return NextResponse.json({ error: "Erro ao buscar detalhes do ativo" }, { status: 500 });
        }
    }
}
