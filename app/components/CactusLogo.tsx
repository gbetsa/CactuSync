'use client';

/**
 * Componente puramente visual que renderiza a logo minimalista de cacto
 * Construída apenas utilizando manipulação de divs e bordas do Tailwind CSS
 */
export const CactusLogo = () => {
    return (
        <div className="relative flex items-center justify-center scale-90">
            {/* Corpo central cilíndrico do cacto */}
            <div className="w-3 h-8 bg-current rounded-full relative shadow-sm">
                {/* Braço direito característico criado com bordas arredondadas e vazadas */}
                <div className="absolute -right-2 top-3 w-4 h-4 border-r-4 border-b-4 border-current rounded-br-lg"></div>
            </div>
        </div>
    );
};
