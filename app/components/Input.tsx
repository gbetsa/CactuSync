import { HTMLInputTypeAttribute } from "react";

/**
 * Interface de tipagem das propriedades do Input
 */
interface InputProps {
    label: string; // O texto que aparece logo acima do campo
    name: string; // Atributo 'name' e 'id' do HTML para acessibilidade e forms
    type: HTMLInputTypeAttribute; // O tipo HTML do input (text, email, password)
    placeholder: string; // Texto fantasma que aparece quando o campo está vazio

    // --- Propriedades específicas para campos de "Senha" ---
    isPassword?: boolean; // Flag que, se verdadeira, renderiza o botão do "olhinho"
    onTogglePassword?: () => void; // Função que inverte a visibilidade da senha no estado do componente pai
    showPassword?: boolean; // Determina qual ícone do olhinho renderizar (aberto/fechado)

    // --- Controle de Estado ---
    value?: string; // Valor atual do input (Controlled Component)
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Disparado a cada tecla digitada
    required?: boolean; // Se o preenchimento é obrigatório nativamente pelo HTML
}

/**
 * Componente Input genérico e padronizado visualmente
 * Possui suporte avançado nativo para alternar a visibilidade de senhas.
 */
export const Input = ({ label, name, type, placeholder, isPassword, onTogglePassword, showPassword, value, onChange, required = true }: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            {/* Label de acessibilidade alinhada com o id do input */}
            <label htmlFor={name} className="text-foreground-dustyOlive">{label}</label>

            <div className="relative">
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    id={name}
                    className="w-full rounded-lg p-2 border border-foreground-dustyOlive focus:border-foreground-dustyOlive focus:outline-none text-foreground-dustyOlive pr-10"
                    value={value}
                    onChange={onChange}
                    required={required}
                />

                {/* Renderização Condicional do botão do "olhinho" apenas se isPassword for verdadeiro */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        // Posicionamento absoluto centraliza o ícone perfeitamente ao fim direito do input
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-dustyOlive hover:text-foreground-ashGrey transition-colors cursor-pointer flex items-center justify-center"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                        {/* Desenha o ícone Olho Aberto ou Olho Riscado dependendo da prop externa showPassword */}
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88 3.59 3.59" /><path d="m21 21-6.41-6.41" /><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><path d="M12 17c-2.76 0-5-2.24-5-5 0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.76-2.24 5-5 5Z" /><path d="m9 9 6 6" /></svg>
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}