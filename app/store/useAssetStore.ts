import { create } from 'zustand';
import { AssetType } from '@/app/generated/prisma';

interface Transaction {
    id: number;
    type: string;
    quantity: number;
    price: number;
    createdAt: string;
}

interface Asset {
    id: number;
    symbol: string;
    name?: string;
    type: AssetType;
    quantity: number;
    averagePrice: number;
    transactions?: Transaction[];
}

interface AssetDashboard {
    assets: Asset[];
    totalAssets: number;
}

interface AssetState {
    assets: Asset[];
    totalAssets: number;
    distribution: Record<string, number>;
    isLoading: boolean;
    error: string | null;

    fetchDashboard: () => Promise<void>;
    addAsset: (data: {
        symbol: string;
        name?: string;
        type: AssetType;
        quantity: number;
        averagePrice: number;
    }) => Promise<boolean>;
    updateAsset: (id: number, data: { quantity?: number; averagePrice?: number }) => Promise<boolean>;
    deleteAsset: (id: number) => Promise<boolean>;
    fetchAssetDetails: (id: number) => Promise<Asset | null>;
}

export const useAssetStore = create<AssetState>((set, get) => ({
    assets: [],
    totalAssets: 0,
    distribution: { STOCK: 0, CRYPTO: 0, FIXED_INCOME: 0, REAL_ESTATE: 0, OTHER: 0 },
    isLoading: false,
    error: null,

    fetchDashboard: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/assets/dashboard');
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Erro ao carregar dashboard');
            set({
                assets: data.assets,
                totalAssets: data.totalAssets,
                distribution: data.distribution,
                isLoading: false
            });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },

    addAsset: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/assets/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Erro ao criar ativo');

            await get().fetchDashboard();
            set({ isLoading: false });
            return true;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return false;
        }
    },

    updateAsset: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/assets/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...data }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Erro ao atualizar ativo');

            await get().fetchDashboard();
            set({ isLoading: false });
            return true;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return false;
        }
    },

    deleteAsset: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`/api/assets/delete?id=${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Erro ao excluir ativo');

            await get().fetchDashboard();
            set({ isLoading: false });
            return true;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return false;
        }
    },

    fetchAssetDetails: async (id) => {
        try {
            const response = await fetch(`/api/assets/details?id=${id}`);
            const data = await response.json();
            if (!response.ok) return null;
            return data;
        } catch (error) {
            return null;
        }
    }
}));
