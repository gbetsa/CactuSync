'use client'; // Indica ao Next.js que este componente precisa do navegador (React no cliente)

import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { CactusLogo } from "@/app/components/CactusLogo";

/**
 * Página Unificada de Login e Cadastro
 * Alterna dinamicamente entre o formulário de entrada e de criação de conta
 */
export default function Login() {
    // --- GERENCIAMENTO DE ESTADO LOCAL DA PÁGINA ---
    const [isLogin, setIsLogin] = useState(true); // Controla se a view atual é Login ou Registro
    const [mostrarSenha, setMostrarSenha] = useState(false); // Alterna o type do input password

    // Estados que guardam o que o usuário digita nos inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    // --- ACESSO AO ESTADO GLOBAL (Zustand) ---
    const loginAction = useAuthStore((state) => state.login);
    const registerAction = useAuthStore((state) => state.register);
    const isLoading = useAuthStore((state) => state.isLoading);
    const authError = useAuthStore((state) => state.error);
    const setError = useAuthStore((state) => state.setError);

    // Utilitário do Next.js para redirecionamento de páginas
    const router = useRouter();

    /**
     * Intercepta o envio do formulário HTML (quando o usuário clica no botão ou dá Enter)
     */
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // Evita recarregar a página (comportamento padrão do form HTML)

        if (isLogin) {
            // Fluxo de Autenticação Existente
            const success = await loginAction(email, password);
            if (success) {
                router.push("/"); // Se deu certo, joga para o Dashboard (Home interna)
            }
        } else {
            // Fluxo de Novo Usuário (Auto-Login embutido via API)
            const success = await registerAction(name, email, password);
            if (success) {
                router.push("/");
            }
        }
    }

    /**
     * Limpa erros e alterna os textos do painel da direita (Login <-> Cadastro)
     */
    function trocaLogin() {
        setIsLogin(!isLogin);
        setError(null);
    }

    return (
        <div className="flex w-screen h-screen overflow-hidden font-sans">
            {/* LADO ESQUERDO: Branding, Ilustração e Identidade Visual */}
            <div className="hidden lg:flex flex-col justify-between w-[60vw] bg-background-almondCream p-16 relative bg-dot-pattern">
                {/* Sol no topo, com opacidade alta para visibilidade */}
                <div className="absolute top-20 right-20 w-32 h-32 minimalist-sun opacity-90"></div>

                {/* Pássaros com animação de flutuação e delay para naturalidade */}
                <div className="absolute top-[28vh] left-[35%] bird -rotate-12 animate-float"></div>
                <div className="absolute top-[32vh] left-[38%] bird rotate-6 animate-float" style={{ animationDelay: '1.5s' }}></div>

                <div className="z-10 mt-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 card-organic bg-foreground-darkOlive flex items-center justify-center shadow-premium text-background-almondCream overflow-hidden">
                            <CactusLogo />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-black text-foreground-darkOlive tracking-tighter drop-shadow-sm">
                            CactuSync
                        </h1>
                    </div>
                    {/* Selo exclusivo para passar credibilidade boutique */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-12 bg-foreground-darkOlive/30"></div>
                        <span className="text-xs font-bold uppercase tracking-widest text-foreground-darkOlive/60">GESTÃO DE PATRIMÔNIO PRIVADO</span>
                    </div>
                    <p className="text-xl text-foreground-dustyOlive max-w-md leading-relaxed">
                        Assessoria exclusiva para o seu capital. <br />
                        Gestão profissional para investidores de alta renda.
                    </p>
                </div>

                {/* Ilustração Minimalista feita 100% com CSS (Dunas e Cactos) */}
                <div className="absolute bottom-0 left-0 w-full h-[40vh] pointer-events-none overflow-hidden select-none">
                    {/* Dunas sobrepostas com diferentes rotações e opacidades para dar profundidade */}
                    <div className="desert-dune w-[130%] h-[35vh] -left-[15%] -bottom-[5vh] rotate-3 opacity-60"></div>
                    <div className="desert-dune w-[120%] h-[28vh] -right-[10%] -bottom-[6vh] -rotate-2 opacity-80 shadow-inner"></div>
                    <div className="desert-dune w-[110%] h-[20vh] left-[20%] -bottom-[4vh] rotate-1 opacity-90"></div>

                    {/* Cacto Principal: Usa animação de balanço suave */}
                    <div className="absolute bottom-[12vh] left-[18%] drop-shadow-lg animate-sway">
                        <div className="cactus-body w-10 h-40">
                            {/* Os braços do cacto são criados com bordas arredondadas e pequenos ajustes de posição */}
                            <div className="cactus-arm left w-14 h-8 -left-10 top-16 flex items-end justify-center">
                                <div className="w-6 h-12 bg-inherit rounded-t-full -mt-10"></div>
                            </div>
                            <div className="cactus-arm right w-10 h-7 -right-8 top-10 flex items-end justify-center">
                                <div className="w-5 h-10 bg-inherit rounded-t-full -mt-8"></div>
                            </div>

                            {/* Pequenos traços representando espinhos/detalhes */}
                            <div className="cactus-detail top-6 left-1/2 -translate-x-1/2"></div>
                            <div className="cactus-detail top-16 left-3"></div>
                            <div className="cactus-detail top-24 right-4"></div>
                            <div className="cactus-detail top-32 left-1/2"></div>
                        </div>
                    </div>

                    {/* Cacto Estilo 'Bola': Outra variação visual para diversidade na cena */}
                    <div className="absolute bottom-[8vh] left-[45%] drop-shadow-md animate-sway" style={{ animationDelay: '0.5s' }}>
                        <div className="cactus-body w-12 h-20 !rounded-[50%_50%_10%_10%]">
                            <div className="cactus-detail top-4 left-4"></div>
                            <div className="cactus-detail top-10 right-4"></div>
                        </div>
                    </div>

                    {/* Grupo de Cactos Pequenos: Cria um ponto focal diferente na direita */}
                    <div className="absolute bottom-[13vh] right-[25%] drop-shadow-md scale-110 animate-sway" style={{ animationDelay: '1.2s' }}>
                        <div className="flex items-end gap-1">
                            <div className="cactus-body w-5 h-12"></div>
                            <div className="cactus-body w-7 h-20">
                                <div className="cactus-detail top-6 left-1/2"></div>
                            </div>
                            <div className="cactus-body w-4 h-10"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LADO DIREITO: Card do Formulário de Login/Cadastro */}
            <div className="flex flex-col justify-between items-center w-full lg:w-[40vw] min-h-screen bg-background-dustyOlive p-4 sm:p-6 lg:p-8 relative overflow-y-auto">
                {/* Viewport Spacer Top */}
                <div className="flex-1 w-full min-h-8"></div>

                <div className="w-full max-w-md bg-background-almondCream p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/20 z-10 my-4 shrink-0">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="mb-2">
                            <h2 className="text-2xl font-bold text-foreground-darkOlive">
                                {isLogin ? "Bem-vindo" : "Crie sua conta"}
                            </h2>
                            <p className="text-foreground-dustyOlive mt-1">
                                {isLogin ? "Acesse seu oásis financeiro" : "Inicie sua jornada patrimonial hoje"}
                            </p>
                        </div>
                        {/* Renderização condicional: Mostra o campo Nome apenas no cadastro */}
                        {!isLogin && (
                            <Input
                                label="Nome Completo"
                                name="name"
                                type="text"
                                placeholder="Como devemos te chamar?"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        )}

                        <Input
                            label="E-mail de Acesso"
                            name="email"
                            type="email"
                            placeholder="exemplo@oasis.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className="flex flex-col gap-1">
                            <Input
                                label="Senha"
                                name="password"
                                type={mostrarSenha ? "text" : "password"}
                                placeholder="Sua senha secreta"
                                isPassword={true}
                                onTogglePassword={() => setMostrarSenha(!mostrarSenha)}
                                showPassword={mostrarSenha}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {isLogin && (
                                <button type="button" className="text-sm text-foreground-dustyOlive text-right hover:underline">
                                    Esqueceu a senha?
                                </button>
                            )}
                        </div>

                        {/* Mensagens de erro de autenticação */}
                        {authError && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600 font-medium">{authError}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            text={isLogin ? "Entrar na Plataforma" : "Finalizar Cadastro"}
                            isLoading={isLoading}
                        />

                        {/* Link para alternar entre Login e Cadastro */}
                        <p className="text-center text-foreground-dustyOlive text-sm mt-4">
                            {isLogin ? "Ainda não faz parte? " : "Já possui acesso? "}
                            <button
                                type="button"
                                onClick={() => trocaLogin()}
                                className="font-bold text-foreground-darkOlive hover:underline cursor-pointer"
                            >
                                {isLogin ? "Solicitar acesso" : "Fazer login"}
                            </button>
                        </p>
                    </form>
                </div>

                {/* LOGIN FOOTER - Desenvolvedor & Aviso Fictício */}
                <div className="flex-1 flex flex-col justify-end w-full px-4 text-center items-center gap-3 pb-4 min-h-[160px] shrink-0">
                    <p className="text-[10px] font-bold tracking-widest text-background-almondCream/80 uppercase">
                        Desenvolvido por <span className="text-white font-black">Guilherme Betsa</span>
                    </p>
                    <div className="flex items-center gap-5">
                        <a href="https://github.com/gbetsa" target="_blank" rel="noopener noreferrer" className="text-background-almondCream/80 hover:text-white hover:-translate-y-1 transition-all" aria-label="GitHub">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7a5.34 5.34 0 0 0-1.46-3.72 5.36 5.36 0 0 0-.14-3.67s-1.12-.35-3.68 1.3a12.5 12.5 0 0 0-6.6 0c-2.55-1.65-3.68-1.3-3.68-1.3a5.36 5.36 0 0 0-.14 3.67 5.34 5.34 0 0 0-1.46 3.72c0 5.6 3.35 6.6 6.5 7a4.8 4.8 0 0 0-1 3.03v4" /><path d="M9 18c-3.14 0-5-1.5-5-3" /></svg>
                        </a>
                        <a href="https://linkedin.com/in/gbetsa" target="_blank" rel="noopener noreferrer" className="text-background-almondCream/80 hover:text-white hover:-translate-y-1 transition-all" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                        </a>
                        <a href="https://gbetsa.vercel.app" target="_blank" rel="noopener noreferrer" className="text-background-almondCream/80 hover:text-white hover:-translate-y-1 transition-all" aria-label="Portfólio">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l8.29-8.29c.94-.94.94-2.48 0-3.42L13.71 4 12 2Z" /><path d="m7 7-1 1" /></svg>
                        </a>
                    </div>
                    <div className="h-px w-20 bg-background-almondCream/20 my-1"></div>
                    <p className="text-[9px] text-background-almondCream/60 max-w-[280px] leading-relaxed font-medium">
                        * Todos os dados apresentados são fictícios.<br />
                        * Projeto desenvolvido para fins de estudos de novas stacks.
                    </p>
                </div>
            </div>
        </div >
    );
}