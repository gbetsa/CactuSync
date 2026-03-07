export const Footer = () => {
    return (
        <footer className="mt-40 flex flex-col md:flex-row justify-between items-center gap-10 opacity-60 px-8 lg:px-20 pb-10">
            <div className="text-[12px] font-black uppercase tracking-[0.3em] text-center md:text-left text-foreground-darkOlive">
                CactuSync © 2026
                <div className="text-[10px] font-bold tracking-widest opacity-80 mt-2 italic text-foreground-dustyOlive">
                    desenvolvido por Guilherme Betsa.
                </div>
                <div className="text-[10px] font-medium tracking-wide text-foreground-darkOlive mt-4 normal-case leading-relaxed max-w-xs">
                    * Todos os dados apresentados são fictícios.<br />
                    * Projeto desenvolvido para fins de estudos de novas stacks.
                </div>
            </div>

            <div className="h-px bg-foreground-darkOlive w-20 hidden md:block opacity-20"></div>

            <div className="flex items-center gap-6">
                <a href="https://github.com/gbetsa" target="_blank" rel="noopener noreferrer" className="hover:text-foreground-darkOlive hover:scale-110 transition-all duration-300 pointer" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7a5.34 5.34 0 0 0-1.46-3.72 5.36 5.36 0 0 0-.14-3.67s-1.12-.35-3.68 1.3a12.5 12.5 0 0 0-6.6 0c-2.55-1.65-3.68-1.3-3.68-1.3a5.36 5.36 0 0 0-.14 3.67 5.34 5.34 0 0 0-1.46 3.72c0 5.6 3.35 6.6 6.5 7a4.8 4.8 0 0 0-1 3.03v4" /><path d="M9 18c-3.14 0-5-1.5-5-3" /></svg>
                </a>
                <a href="https://linkedin.com/in/gbetsa" target="_blank" rel="noopener noreferrer" className="hover:text-foreground-darkOlive hover:scale-110 transition-all duration-300 pointer" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a href="https://gbetsa.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-foreground-darkOlive hover:scale-110 transition-all duration-300 pointer" aria-label="Portfólio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l8.29-8.29c.94-.94.94-2.48 0-3.42L13.71 4 12 2Z" /><path d="m7 7-1 1" /></svg>
                </a>
            </div>
        </footer>
    );
};
