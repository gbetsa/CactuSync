/**
 * Interface que define as propriedades aceitas pelo componente Button
 */
interface ButtonProps {
    text: string; // Texto principal exibido no botão
    type: "submit" | "reset" | "button"; // Comportamento HTML padrão do botão
    onClick?: (e: React.FormEvent<HTMLButtonElement>) => void; // Função opcional disparada no clique
    isLoading?: boolean; // Flag que, se true, desabilita o botão e mostra um spinner
}

/**
 * Componente Button genérico e reutilizável
 * Possui suporte embutido para estado de "carregamento" (Loading)
 */
export const Button = ({ text, type, onClick, isLoading }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading} // Trava o botão para evitar múltiplos cliques acidentais
            className="flex justify-center items-center bg-foreground-dustyOlive text-foreground-white rounded-lg p-2 hover:bg-background-ashGrey hover:text-foreground-dustyOlive transition-colors duration-200 ease-in-out hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {/* Renderização Condicional: Mostra o spinner se estiver carregando, senão mostra o texto */}
            {isLoading ? (
                <div className="flex items-center gap-2">
                    {/* Ícone de loading animado padronizado do Tailwind */}
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Carregando...</span>
                </div>
            ) : text}
        </button>
    )
}