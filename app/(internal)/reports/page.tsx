'use client';

import { useState, useEffect } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useAssetStore } from "@/app/store/useAssetStore";
import { CactusLogo } from "@/app/components/CactusLogo";
import { AssetCard } from "@/app/components/AssetCard";
import { AddAssetModal } from "@/app/components/AddAssetModal";
import { ConfirmModal } from "@/app/components/ConfirmModal";
import { Button } from "@/app/components/Button";

/**
 * Dashboard de Investimentos Dinâmico
 * Consome dados reais do backend via useAssetStore.
 */
export default function Reports() {
    const user = useAuthStore((state) => state.user);
    const { assets, totalAssets, distribution, isLoading, fetchDashboard, deleteAsset } = useAssetStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [editingAsset, setEditingAsset] = useState<any>(null);
    const [assetToDelete, setAssetToDelete] = useState<number | null>(null);

    useEffect(() => {
        if (user) {
            fetchDashboard();
        }
    }, [user, fetchDashboard]);

    if (!user) return null;

    const handleEdit = (asset: any) => {
        setEditingAsset(asset);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setAssetToDelete(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (assetToDelete) {
            await deleteAsset(assetToDelete);
            setIsConfirmOpen(false);
            setAssetToDelete(null);
        }
    };

    const handleOpenModal = () => {
        setEditingAsset(null);
        setIsModalOpen(true);
    };

    return (
        <main className="px-8 lg:px-20 pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-700">
            <div className="grid grid-cols-12 gap-6 lg:gap-10 items-start">

                {/* HERO - PATRIMÔNIO TOTAL (SOLITÁRIO NO TOPO) */}
                <section className="col-span-12 bg-white card-organic p-12 lg:p-20 shadow-premium border border-background-almondCream flex flex-col justify-center min-h-[280px]">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground-dustyOlive mb-6 block italic text-center lg:text-left">Patrimônio sob Custódia</span>
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-editorial leading-tight text-center lg:text-left break-all">
                            R$ {totalAssets.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-6 items-center lg:items-end flex-shrink-0">
                            <p className="text-base lg:text-lg font-bold opacity-60 leading-relaxed max-w-xs text-center lg:text-right">
                                Total consolidado de todos os seus ativos integrados.
                            </p>
                            <Button
                                onClick={handleOpenModal}
                                text="+ Adicionar Ativo"
                                variant="primary"
                            />
                        </div>
                    </div>
                </section>

                {/* DISTRIBUIÇÃO - LINHA CENTRAL (ESQUERDA) */}
                <div className="col-span-12 lg:col-span-8 bg-background-dustyOlive p-10 rounded-[60px] shadow-premium text-background-almondCream flex flex-col justify-between overflow-hidden relative group min-h-[400px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>

                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Composição de Carteira</span>
                        <h3 className="text-3xl font-black tracking-tighter mt-2 mb-10">Distribuição por Categoria</h3>
                    </div>

                    <div className="flex items-end justify-between h-48 gap-4 px-4">
                        {(Object.entries(distribution) as [string, number][]).map(([key, val], i) => (
                            <div key={key} className="flex-1 flex flex-col justify-end items-center gap-3 h-full">
                                <div
                                    className="w-full bg-background-almondCream/20 rounded-t-2xl group-hover:bg-background-almondCream/40 transition-all duration-500 relative"
                                    style={{ height: `${Math.max(val, 2)}%` }} // Mínimo de 2% para visibilidade
                                    title={`${key}: ${val.toFixed(1)}%`}
                                >
                                    {val > 5 && (
                                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black opacity-30">
                                            {val.toFixed(0)}%
                                        </span>
                                    )}
                                </div>
                                <span className="text-[10px] font-black opacity-40 uppercase tracking-tighter">
                                    {key === "FIXED_INCOME" ? "REND. FIXA" : key === "REAL_ESTATE" ? "FIIs" : key === "STOCK" ? "AÇÕES" : key === "CRYPTO" ? "CRIPTO" : "OUTROS"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* STATUS DA CARTEIRA - LINHA CENTRAL (DIREITA) */}
                <div className="col-span-12 lg:col-span-4 bg-background-ashGrey/10 p-10 card-organic border border-white flex flex-col justify-between min-h-[400px]">
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-10">Status & Saúde</h4>
                        <div className="flex flex-col items-center justify-center py-6">
                            <div className="w-32 h-32 rounded-full border-8 border-foreground-darkOlive flex items-center justify-center shadow-inner mb-6">
                                <span className="text-3xl font-black text-editorial">{assets.length > 0 ? "OK" : "--"}</span>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-black uppercase tracking-widest">{assets.length} Ativos Ativos</p>
                                <p className="text-xs font-bold opacity-40 italic mt-1">Monitoramento em Tempo Real</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-[10px] font-bold leading-relaxed opacity-40 text-center uppercase tracking-tighter">
                        CactuSync Engine v1.0 • Dados Liquidados
                    </p>
                </div>

                {/* LISTA DE ATIVOS (OCUPA A LARGURA TOTAL ABAIXO) */}
                <div className="col-span-12 bg-white shadow-premium p-10 rounded-[40px] border border-background-almondCream">
                    <div className="flex justify-between items-center mb-10">
                        <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">Seus Investimentos</h4>
                        <div className="w-10 h-10 rounded-full bg-background-almondCream flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                            <CactusLogo />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center p-20 italic opacity-50">Carregando seus ativos...</div>
                    ) : assets.length === 0 ? (
                        <div className="text-center p-20 border-2 border-dashed border-background-almondCream rounded-[40px]">
                            <p className="text-sm font-bold opacity-40 mb-4">Você ainda não possui ativos registrados.</p>
                            <Button
                                onClick={handleOpenModal}
                                text="Cadastrar Primeiro Ativo"
                                variant="ghost"
                            />
                        </div>
                    ) : (
                        <div className="max-h-[520px] overflow-y-auto pr-4 custom-scrollbar pb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {assets.map((asset) => (
                                    <AssetCard
                                        key={asset.id}
                                        symbol={asset.symbol}
                                        type={asset.type}
                                        quantity={asset.quantity}
                                        averagePrice={asset.averagePrice}
                                        onEdit={() => handleEdit(asset)}
                                        onDelete={() => handleDeleteClick(asset.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <AddAssetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingAsset={editingAsset}
            />

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Excluir Ativo"
                message="Tem certeza que deseja remover este investimento da sua carteira? Esta ação não pode ser desfeita."
                isLoading={isLoading}
            />
        </main>
    );
}
