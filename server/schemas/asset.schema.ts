import { z } from "zod";
import { AssetType } from "@/app/generated/prisma";

export const assetSchema = z.object({
    symbol: z.string().min(1, "O símbolo é obrigatório").toUpperCase(),
    name: z.string().optional(),
    type: z.nativeEnum(AssetType, {
        error: () => ({ message: "Tipo de ativo inválido" })
    }),
    quantity: z.number().positive("A quantidade deve ser maior que zero"),
    averagePrice: z.number().nonnegative("O preço não pode ser negativo"),
});
