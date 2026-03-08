'use client';
import { useAuthStore } from "@/app/store/useAuthStore";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Página de Configurações do Perfil do Usuário
 * Permite editar nome, email, senha e excluir completamente a conta.
 */
export default function Profile() {
    // 1. Instância do estado global para interagir com a API
    const { user, updateUser, deleteAccount, isLoading, error } = useAuthStore();
    const router = useRouter();

    // 2. Estados Locais do Formulário
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState(""); // Nova senha desejada

    // Status de feedback visual
    const [success, setSuccess] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // 3. Efeito de Hidratação Inicial / Proteção de Rota
    useEffect(() => {
        if (user) {
            // Se o usuário está logado, preenchemos o form com os dados já conhecidos
            setName(user.name || "");
            setEmail(user.email);
        }
    }, [user]); // Só roda dnv se o user mudar

    if (!user) return null; // Previne renderizações mortas antes do redirecionamento

    /**
     * Lida com a tentativa de salvar as alterações do form
     */
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(false); // Reseta o banner de sucesso

        // Dispara a mutação na API passando a senha apenas se o usuário digitou uma nova
        const result = await updateUser({
            name,
            email,
            ...(password ? { password, currentPassword } : {})
        });

        if (result) {
            // Se deu certo, mostra feedback positivo e limpa os campos sensíveis
            setSuccess(true);
            setPassword("");
            setCurrentPassword("");
            setTimeout(() => setSuccess(false), 3000); // Some após 3s
        }
    };

    /**
     * Lida com a exclusão irreversível da conta
     */
    const handleDelete = async () => {
        // O deleteAccount já cuida de invalidar o cookie através da API de backend
        const result = await deleteAccount();
        if (result) {
            router.push("/login"); // Joga pra tela inicial
        }
    };

    return (
        <main className="px-5 sm:px-8 lg:px-20 pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* TÍTULO DA PÁGINA */}
                <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
                    <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-editorial mb-6 leading-none">
                        Configurações<br /><span className="italic font-light opacity-50 tracking-tight text-foreground-dustyOlive">de Conta</span>
                    </h1>
                    <p className="text-lg font-bold opacity-60 leading-relaxed max-w-xs mb-10">
                        Gerencie suas informações de acesso e segurança patrimonial com total privacidade.
                    </p>
                </div>

                {/* FORMULÁRIO DE EDIÇÃO */}
                <div className="lg:col-span-8 space-y-12">
                    <div className="bg-white shadow-premium p-6 sm:p-10 lg:p-16 rounded-[40px] lg:rounded-[60px] border border-background-almondCream relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-background-almondCream rounded-full -mr-32 -mt-32 opacity-20 group-hover:scale-110 transition-transform duration-1000"></div>

                        <form onSubmit={handleUpdate} className="relative z-10 space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-8 italic">Dados Pessoais</h3>
                                    <Input
                                        label="Nome Completo"
                                        name="name"
                                        type="text"
                                        placeholder="Ex: Gabriel Sampaio"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <Input
                                        label="Endereço de E-mail"
                                        name="email"
                                        type="email"
                                        placeholder="seu@exemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-8 italic">Segurança</h3>
                                    <Input
                                        label="Nova Senha"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required={false}
                                    />
                                    {password && (
                                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                            <Input
                                                label="Senha Atual (necessária para confirmar)"
                                                name="currentPassword"
                                                type="password"
                                                placeholder="Sua senha atual"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                required={true}
                                            />
                                        </div>
                                    )}
                                    <p className="text-[9px] font-bold opacity-40 leading-relaxed">
                                        Deixe em branco caso deseje manter sua senha atual. <br />
                                        Recomendamos o uso de pelo menos 12 caracteres.
                                    </p>
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 animate-in shake duration-300">
                                    {String(error)}
                                </div>
                            )}

                            {success && (
                                <div className="p-4 bg-green-50 text-green-700 rounded-2xl text-xs font-bold border border-green-100 animate-in fade-in slide-in-from-top-4">
                                    ✓ Dados atualizados com sucesso no ecossistema CactuSync.
                                </div>
                            )}

                            <div className="flex items-center gap-8 pt-8 border-t border-background-almondCream">
                                <Button
                                    type="submit"
                                    isLoading={isLoading}
                                    text={isLoading ? "Sincronizando..." : "Salvar Alterações"}
                                />

                                <div className="hidden md:block">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Última sincronização</p>
                                    <p className="text-[9px] font-mono opacity-40">
                                        {user?.updatedAt
                                            ? new Date(user.updatedAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                                            : '—'}
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* DANGER ZONE - APAGAR CONTA */}
                    <div className="bg-red-50/30 p-6 sm:p-10 lg:p-16 rounded-[40px] lg:rounded-[60px] border border-red-100/50 group">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="max-w-md">
                                <h3 className="text-2xl font-black tracking-tighter text-red-700 mb-2 uppercase">Liquidação de Conta</h3>
                                <p className="text-xs font-bold text-red-600/70 leading-relaxed tracking-widest uppercase">
                                    O encerramento da custódia é permanente. Todos os ativos e históricos serão evaporados.
                                </p>
                            </div>

                            {!showDeleteConfirm ? (
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="w-full sm:w-auto px-6 lg:px-8 py-4 lg:py-5 bg-red-600 text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-xl shadow-red-200 cursor-pointer"
                                >
                                    Apagar Identidade
                                </button>
                            ) : (
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-in zoom-in-95 duration-300 w-full sm:w-auto">
                                    <button
                                        onClick={handleDelete}
                                        className="w-full sm:w-auto px-6 lg:px-8 py-4 lg:py-5 bg-red-900 text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer"
                                    >
                                        Tenho Certeza
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="w-full sm:w-auto px-6 lg:px-8 py-4 lg:py-5 bg-white text-red-600 font-black text-[10px] uppercase tracking-[0.2em] border border-red-200 rounded-full cursor-pointer"
                                    >
                                        Abortar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
