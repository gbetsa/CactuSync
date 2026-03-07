'use client';

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { usePathname } from "next/navigation";

/**
 * Layout Interno (Restrito a Sessões Autenticadas)
 * Intercepta todas as rotas dentro do diretório `(internal)`.
 */
export default function InternalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const fetchUser = useAuthStore((state) => state.fetchUser);

    // Status visual da tela cheia de "carregando"
    const [loading, setLoading] = useState(true);

    // Acompanhamos a rota atual para disparar o loading ao trocar de tela
    const pathname = usePathname();
    const [prevPath, setPrevPath] = useState(pathname);

    // Se o usuário clica em outro link (mudou o pathname), subimos a cortina de loading imediatamente
    if (pathname !== prevPath) {
        setPrevPath(pathname);
        setLoading(true);
    }

    // 1. Hidratação Inicial: Quando a aplicação acabar de abrir (F5)
    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        // Usa a sessão guardada no Zustand para ir bater na API e ver se o Cookie ainda existe/é válido
        fetchUser().finally(() => {
            if (!cancelled) setLoading(false);
        });
        return () => { cancelled = true; }; // Cleanup padrão do useEffect
    }, [fetchUser]);

    // 2. Troca de Página Interna: Controla o tempo de "cortina" pós-navegação
    useEffect(() => {
        if (loading) {
            // Se ativou o loading por navegação, damos um pequeno atraso estético de 800ms antes de liberar a tela
            const timer = setTimeout(() => setLoading(false), 800);
            return () => clearTimeout(timer);
        }
    }, [pathname, loading]);

    return (
        <div className="min-h-screen bg-background-almondCream font-sans text-foreground-darkOlive texture-grainy overflow-x-hidden relative">
            <LoadingScreen isLoading={loading} />

            <div
                className="transition-opacity duration-300"
                style={{
                    opacity: loading ? 0 : 1,
                    pointerEvents: loading ? 'none' : 'auto',
                    visibility: loading ? 'hidden' : 'visible'
                }}
            >
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    );
}
