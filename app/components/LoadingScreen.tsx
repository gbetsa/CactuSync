'use client';

import { CactusLogo } from "./CactusLogo";
import { useState, useEffect } from "react";

/**
 * Interface da Tela de Carregamento
 */
interface LoadingScreenProps {
    isLoading: boolean; // Controla se o loading deve iniciar o processo de encerramento
}

/**
 * Componente de Tela de Carregamento (Loading Screen) Fullscreen
 * Engloba a tela inteira quando a aplicação está buscando a sessão inicial do usuário
 */
export const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
    // 1. Controla indiretamente a montagem do componente no DOM (evita sumir subitamente)
    const [visible, setVisible] = useState(true);
    // 2. Controla a opacidade (opacity do CSS) para gerar o efeito de transição "Fade Out" suave
    const [fadeOut, setFadeOut] = useState(false);

    // Efeito colateral que escuta as mudanças de carregamento global
    useEffect(() => {
        if (isLoading) {
            // Se voltou a carregar, resetamos os estados para impedir a animação de sumir
            setFadeOut(false);
            setVisible(true);
        } else {
            // Quando a aplicação finaliza a carga (ex: dados voltaram da API de 'me')
            const timer = setTimeout(() => {
                // Inicia o Fade Out css (opacidade 0)
                setFadeOut(true);
                // Aguarda meio segundo para finalmente remover o HTML da tela
                setTimeout(() => setVisible(false), 500);
            }, 300); // 300ms mínimos obrigatórios para que animação não pareça um "piscar" feio se a rede for ultrarrápida

            return () => clearTimeout(timer); // Limpeza de memória do timer de segurança
        }
    }, [isLoading]);

    // Oculta completamente do processador React quando invisible
    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 bg-background-almondCream flex items-center justify-center z-50 transition-opacity duration-500"
            // Atrela a opacidade geral do painel fullscreen à variável fadeOut
            style={{ opacity: fadeOut ? 0 : 1 }}
        >
            {/* --- EFEITO BLOOM DE FUNDO --- */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className="w-64 h-64 rounded-full"
                    style={{
                        // Degrada uma luz verde suave do centro para as bordas
                        background: 'radial-gradient(circle, rgba(107,112,92,0.18) 0%, rgba(253,240,230,0) 70%)',
                        animation: 'bloom-pulse 2s ease-in-out infinite'
                    }}
                />
            </div>

            {/* --- CONTEÚDO CENTRALIZADO (Logo + Barra de Progresso) --- */}
            <div className="relative flex flex-col items-center gap-8">
                {/* Logo pulsando lentamente (Scale in/out) */}
                <div
                    className="text-foreground-darkOlive"
                    style={{ animation: 'bloom-pulse 2s ease-in-out infinite' }}
                >
                    <div className="scale-[3]">
                        <CactusLogo />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-[10px] font-black tracking-[0.4em] text-foreground-dustyOlive opacity-60">
                        CactuSync
                    </p>

                    {/* Barra de Loading visual infinita deslizando */}
                    <div className="w-24 h-[2px] bg-foreground-dustyOlive/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-foreground-dustyOlive/40 rounded-full"
                            style={{ animation: 'loading-bar 1.5s ease-in-out infinite' }}
                        />
                    </div>
                </div>
            </div>

            {/* Injeta os Keyframes puramente dinâmicos locais para as animações rodarem limpas */}
            <style>{`
                @keyframes bloom-pulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.08); }
                }
                @keyframes loading-bar {
                    0% { width: 0%; margin-left: 0%; }
                    50% { width: 100%; margin-left: 0%; }
                    100% { width: 0%; margin-left: 100%; }
                }
            `}</style>
        </div>
    );
};
