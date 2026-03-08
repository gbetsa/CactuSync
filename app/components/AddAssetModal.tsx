'use client';

import { useState, useEffect } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { useAssetStore } from "../store/useAssetStore";
import { AssetType } from "@/app/generated/prisma";

interface AddAssetModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingAsset?: any;
}

export const AddAssetModal = ({ isOpen, onClose, editingAsset }: AddAssetModalProps) => {
    const { addAsset, updateAsset, isLoading, error } = useAssetStore();

    const [formData, setFormData] = useState({
        symbol: "",
        name: "",
        type: "STOCK" as AssetType,
        quantity: "",
        averagePrice: ""
    });

    useEffect(() => {
        if (editingAsset) {
            setFormData({
                symbol: editingAsset.symbol,
                name: editingAsset.name || "",
                type: editingAsset.type,
                quantity: editingAsset.quantity.toString(),
                averagePrice: editingAsset.averagePrice.toString()
            });
        } else {
            setFormData({
                symbol: "",
                name: "",
                type: "STOCK",
                quantity: "",
                averagePrice: ""
            });
        }
    }, [editingAsset, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            ...formData,
            quantity: Number(formData.quantity),
            averagePrice: Number(formData.averagePrice)
        };

        let success;
        if (editingAsset) {
            success = await updateAsset(editingAsset.id, {
                quantity: data.quantity,
                averagePrice: data.averagePrice
            });
        } else {
            success = await addAsset(data);
        }

        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-[40px] shadow-premium p-10 border border-background-almondCream animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-black tracking-tighter text-editorial">
                        {editingAsset ? "Editar" : "Novo"} <span className="italic font-light opacity-50">Ativo</span>
                    </h2>
                    <button onClick={onClose} className="text-foreground-dustyOlive hover:opacity-50 text-2xl font-light">×</button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {!editingAsset && (
                        <>
                            <Input
                                label="Símbolo (Ticker)"
                                name="symbol"
                                type="text"
                                placeholder="EX: PETR4, BTC, AAPL"
                                value={formData.symbol}
                                onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                            />

                            <div className="flex flex-col gap-2">
                                <label className="text-foreground-dustyOlive">Tipo de Ativo</label>
                                <select
                                    className="w-full rounded-lg p-2 border border-foreground-dustyOlive focus:outline-none text-foreground-dustyOlive bg-transparent"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value as AssetType })}
                                >
                                    <option value="STOCK">Ação</option>
                                    <option value="CRYPTO">Criptomoeda</option>
                                    <option value="FIXED_INCOME">Renda Fixa</option>
                                    <option value="REAL_ESTATE">Fundo Imobiliário</option>
                                    <option value="OTHER">Outros</option>
                                </select>
                            </div>
                        </>
                    )}

                    <Input
                        label="Quantidade"
                        name="quantity"
                        type="number"
                        placeholder="0.00"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />

                    <Input
                        label="Preço Médio (R$)"
                        name="averagePrice"
                        type="number"
                        placeholder="0.00"
                        value={formData.averagePrice}
                        onChange={(e) => setFormData({ ...formData, averagePrice: e.target.value })}
                    />

                    {error && (
                        <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl italic">
                            ⚠️ {error}
                        </p>
                    )}

                    <div className="flex gap-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 text-foreground-dustyOlive font-bold hover:opacity-50 transition-opacity"
                        >
                            Cancelar
                        </button>
                        <div className="flex-1">
                            <Button
                                text={editingAsset ? "Salvar Alterações" : "Adicionar Ativo"}
                                type="submit"
                                isLoading={isLoading}
                                variant="primary"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
