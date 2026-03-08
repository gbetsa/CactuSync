import { AssetType } from "@/app/generated/prisma";

interface AssetCardProps {
    symbol: string;
    quantity: number;
    averagePrice: number;
    type: AssetType;
    onDelete: () => void;
    onEdit: () => void;
}

export const AssetCard = ({ symbol, quantity, averagePrice, type, onDelete, onEdit }: AssetCardProps) => {
    const totalValue = quantity * averagePrice;

    const getTypeLabel = (type: AssetType) => {
        const labels: Record<AssetType, string> = {
            STOCK: "Ação",
            CRYPTO: "Cripto",
            FIXED_INCOME: "Renda Fixa",
            REAL_ESTATE: "Fundo Imob.",
            OTHER: "Outros"
        };
        return labels[type];
    };

    return (
        <div className="group p-6 bg-background-almondCream/30 rounded-3xl border border-transparent hover:border-foreground-darkOlive/10 hover:bg-white transition-all flex justify-between items-center shadow-sm hover:shadow-md">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <h5 className="text-sm font-black tracking-tighter">{symbol}</h5>
                    <span className="text-[9px] font-black px-2 py-0.5 bg-background-ashGrey/20 rounded-full opacity-60 uppercase">{getTypeLabel(type)}</span>
                </div>
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{quantity} un. • Avg: R$ {averagePrice.toFixed(2)}</p>
            </div>

            <div className="flex flex-col items-end gap-2 text-right">
                <p className="text-sm font-black text-foreground-darkOlive">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={onEdit}
                        className="text-[9px] font-bold text-foreground-dustyOlive hover:underline"
                    >
                        Editar
                    </button>
                    <button
                        onClick={onDelete}
                        className="text-[9px] font-bold text-red-500 hover:underline"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
};
