'use client';
import Link from 'next/link';
import { useAuthStore } from '@/app/store/useAuthStore';
import { usePathname } from 'next/navigation';
import { CactusLogo } from './CactusLogo';
import { useState } from 'react';

/**
 * Componente de Cabeçalho Global (Header)
 * Renderizado em todas as rotas da aplicação interna. Gerecnia navegação, 
 * indicação de rota ativa e logout.
 */
export const Header = () => {
    // 1. Acesso ao Zustand para pegar os dados do usuário e a função de logout
    const { user, logout } = useAuthStore();

    // 2. Extrai a URL atual para detectar qual aba do menu deve ficar sublinhada (ativa)
    const pathname = usePathname();

    // 3. Controle de Estado local para o "Menu Hambúrguer" (exibido apenas em telas pequenas/celulares)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Funções auxiliares para manipular o menu de forma legível
    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="flex justify-between items-end px-8 lg:px-20 py-10 z-50 relative">
            {/* --- ÁREA DO LOGOTIPO --- */}
            <Link href="/" onClick={closeMenu} className="flex flex-col group hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 card-organic bg-background-dustyOlive flex items-center justify-center shadow-premium overflow-hidden">
                        <CactusLogo />
                    </div>
                    <h2 className="text-2xl font-black tracking-tighter text-foreground-darkOlive">CactuSync</h2>
                </div>
            </Link>

            {/* --- MENU DE NAVEGAÇÃO DESKTOP --- */}
            {/* hidden lg:flex garante que só aparece em telas grandes */}
            <nav className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                <Link href="/" className="hover:opacity-100 transition-opacity border-b-2 border-transparent hover:border-foreground-darkOlive pb-1">Portfólio</Link>
                <Link href="/reports" className="hover:opacity-100 transition-opacity border-b-2 border-transparent hover:border-foreground-darkOlive pb-1">Relatórios</Link>
                <Link href="/profile" className="hover:opacity-100 transition-opacity border-b-2 border-transparent hover:border-foreground-darkOlive pb-1">Configurações</Link>
            </nav>

            {/* --- CONTROLES DA DIREITA (Logout e Ícone Hambúrguer) --- */}
            <div className="flex items-center gap-4 lg:gap-6">
                {/* Botão de Encerrar Sessão: Dispara a ação de limpar o Cookie via API */}
                <button
                    onClick={logout}
                    className="p-2 text-foreground-darkOlive hover:text-red-600 transition-colors cursor-pointer rounded-full hover:bg-red-100"
                    aria-label="Encerrar Sessão"
                    title="Encerrar Sessão"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                </button>

                {/* Botão de Expandir o Menu Mobile (só aparece lg:hidden) */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden p-2 text-foreground-darkOlive hover:bg-black/5 rounded-full transition-colors cursor-pointer"
                    aria-label="Menu Mobile"
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    )}
                </button>
            </div>

            {/* --- PAINEL DO MENU MOBILE --- */}
            {/* Rederizado condicionalmente caso isMobileMenuOpen seja true.
                Quando um dos Links é clicado, closeMenu é chamado simultaneamente. */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-8 right-8 mt-2 p-6 bg-background-almondCream border border-foreground-darkOlive/10 rounded-2xl shadow-premium flex flex-col gap-6 lg:hidden z-50 transition-all duration-300">
                    <nav className="flex flex-col gap-4 text-[12px] font-black uppercase tracking-[0.2em] text-foreground-darkOlive/80">
                        <Link href="/" onClick={closeMenu} className={`hover:text-foreground-darkOlive transition-colors ${pathname === '/' ? 'text-foreground-darkOlive' : ''}`}>Portfólio</Link>
                        <Link href="/reports" onClick={closeMenu} className={`hover:text-foreground-darkOlive transition-colors ${pathname === '/reports' ? 'text-foreground-darkOlive' : ''}`}>Relatórios</Link>
                        <Link href="/profile" onClick={closeMenu} className={`hover:text-foreground-darkOlive transition-colors ${pathname === '/profile' ? 'text-foreground-darkOlive' : ''}`}>Configurações</Link>
                    </nav>
                </div>
            )}
        </header>
    );
};
