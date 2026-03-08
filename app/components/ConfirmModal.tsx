'use client';

import { Button } from "./Button";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isLoading?: boolean;

}

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, isLoading }: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-[40px] shadow-premium p-10 border border-background-almondCream animate-in zoom-in-95 duration-200 text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                    ⚠️
                </div>

                <h3 className="text-2xl font-black tracking-tighter text-editorial mb-4">
                    {title}
                </h3>

                <p className="text-sm font-bold opacity-60 leading-relaxed mb-8">
                    {message}
                </p>

                <div className="flex flex-col gap-3">
                    <Button
                        text="Sim, Excluir Ativo"
                        onClick={onConfirm}
                        isLoading={isLoading}
                        variant="primary"
                    />
                    <button
                        onClick={onClose}
                        className="text-xs font-black uppercase tracking-widest text-foreground-dustyOlive hover:opacity-50 transition-opacity py-2"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};
