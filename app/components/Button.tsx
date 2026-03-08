import Link from "next/link";

/**
 * Interface que define as propriedades aceitas pelo componente Button
 */
interface ButtonProps {
    text: string; // Texto principal exibido no botão
    type?: "submit" | "reset" | "button"; // Comportamento HTML padrão do botão (opcional)
    onClick?: (e: React.FormEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>) => void; // Função opcional disparada no clique
    isLoading?: boolean; // Flag que, se true, desabilita o botão e mostra um spinner
    variant?: "primary" | "secondary" | "danger" | "ghost"; // Variante de estilo do botão
    className?: string; // Classes adicionais para layout
    href?: string; // Se fornecido, renderiza como um Link do Next.js
}

/**
 * Componente Button genérico e reutilizável
 * Possui suporte embutido para estado de "carregamento" (Loading)
 * Agora com design premium "pill" e tipografia padronizada.
 * Suporta renderização como Link se a prop 'href' for passada.
 */
export const Button = ({ text, type = "button", onClick, isLoading, variant = "secondary", className = "", href }: ButtonProps) => {
    // Mapeamento de estilos baseados na variante
    const variantStyles = {
        primary: "bg-foreground-darkOlive text-white shadow-xl shadow-foreground-darkOlive/10 hover:bg-foreground-dustyOlive",
        secondary: "bg-foreground-dustyOlive text-white shadow-lg shadow-foreground-dustyOlive/10 hover:bg-background-ashGrey hover:text-foreground-dustyOlive",
        danger: "bg-red-600 text-white shadow-xl shadow-red-200 hover:bg-red-700",
        ghost: "bg-transparent text-foreground-dustyOlive hover:bg-background-almondCream border border-foreground-darkOlive/10"
    };

    const commonClasses = `
        flex justify-center items-center 
        rounded-full px-8 py-4 
        font-black text-[10px] uppercase tracking-[0.2em]
        transition-all duration-300 ease-in-out 
        hover:cursor-pointer hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
        ${variantStyles[variant]} 
        ${className}
    `;

    if (href) {
        return (
            <Link href={href} className={commonClasses}>
                {text}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading}
            className={commonClasses}
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Carregando...</span>
                </div>
            ) : text}
        </button>
    )
}
