import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Interface de Tipagem (TypeScript)
// Define exata e estritamente o formato global do nosso estado de autenticação
interface AuthState {
    // Dados do usuário atual (nulo se não logado)
    user: { name: string | null, email: string, updatedAt?: string | null } | null;
    isLoggedIn: boolean; // Flag utilitária para checar rapidamente o status da sessão
    error: any; // Guarda strings de erro para exibir em toasts/formulários
    isLoading: boolean; // Controla estados de "carregando" nos botões de formulário

    // Assinaturas de métodos (ações do Zustand)
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;

    // Funções de Gerenciamento de Perfil
    fetchUser: () => Promise<void>; // Puxa os dados mais atualizados do backend
    updateUser: (data: { name?: string, email?: string }) => Promise<boolean>;
    deleteAccount: () => Promise<boolean>;

    // Utilitário para limpar/obter erros manualmente
    setError: (error: any) => void;
}

// 2. Construção da Store Zustand global combinada com o Middleware 'persist'
// O 'persist' garante que os dados do usuário (email/nome) não sumam se dermos F5
export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // Estado Inicial Padrão
            user: null,
            isLoggedIn: false,
            error: null,
            isLoading: false,

            /**
             * FUNÇÃO DE LOGIN
             * Chama a API de login. Se der certo, preenche o estado e salva no localStorage (via persist)
             */
            login: async (email, password) => {
                set({ isLoading: true, error: null }); // Inicia o loading
                try {
                    // Dispara a requisição para a nossa rota de API Next.js interna
                    const response = await fetch("/api/login", {
                        method: "POST",
                        body: JSON.stringify({ email, password }),
                    });
                    const data = await response.json();

                    // Se o status HTTP não for 2xx, dispara o bloco catch
                    if (!response.ok) throw new Error(data.error || "Erro ao logar");

                    // Login bem-sucedido (o cookie seguro já foi configurado pela API neste momento)
                    // Agora buscamos o perfil mais completo (nome, data de atualização) via /api/user/me
                    const meResponse = await fetch("/api/user/me");
                    const meData = await meResponse.json();

                    // Atualiza a store inteira indicando que o usuário finalmente logou
                    set({
                        user: meData.user || { email, name: null },
                        isLoggedIn: true,
                        isLoading: false
                    });
                    return true;
                } catch (err: any) {
                    set({ error: err.message, isLoading: false }); // Exibe erro na tela
                    return false;
                }
            },
            /**
             * FUNÇÃO DE REGISTRO
             * Cadastra um novo usuário no banco e realiza o auto-login em seguida (gerenciado na API)
             */
            register: async (name, email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await fetch("/api/register", {
                        method: "POST",
                        body: JSON.stringify({ name, email, password }),
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error || "Erro ao cadastrar");

                    // Com o cadastro + auto-login bem-sucedido na API, populamos logo a variável `user`
                    set({ user: { email, name }, isLoggedIn: true, isLoading: false });
                    return true;
                } catch (err: any) {
                    set({ error: err.message, isLoading: false });
                    return false;
                }
            },
            /**
             * FUNÇÃO DE LOGOUT
             * Pede para a porta de saída da API limpar os cookies e então limpa a cache local
             */
            logout: async () => {
                await fetch("/api/logout", { method: "POST" });
                set({ user: null, isLoggedIn: false }); // Esvazia o localStorage instantaneamente
            },

            /**
             * CARREGAR DADOS DO USUÁRIO
             * Usado ao iniciar a página para verificar se existe uma sessão persistida no banco
             */
            fetchUser: async () => {
                try {
                    const response = await fetch("/api/user/me");
                    const data = await response.json();
                    if (response.ok && data.user) {
                        set({ user: data.user, isLoggedIn: true });
                    } else {
                        // Se a API diz que a sessão morreu (cookie expirou), garantimos que o state zere.
                        set({ user: null, isLoggedIn: false });
                    }
                } catch (error) {
                    set({ user: null, isLoggedIn: false });
                }
            },

            /**
             * ATUALIZAR ARQUIVO DE PERFIL
             */
            updateUser: async (data) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await fetch("/api/user/update", {
                        method: "PUT",
                        body: JSON.stringify(data),
                    });
                    const result = await response.json();

                    if (!response.ok) throw new Error(result.error || "Erro ao atualizar perfil");

                    // Mergeia suavemente os dados retornados no contexto global da UI
                    set({
                        user: result.user,
                        isLoading: false
                    });
                    return true;
                } catch (err: any) {
                    set({ error: err.message, isLoading: false });
                    return false;
                }
            },

            /**
             * APAGAR CONTA E SEUS DADOS DEFINITIVAMENTE
             */
            deleteAccount: async () => {
                set({ isLoading: true, error: null });
                try {
                    const response = await fetch("/api/user/delete", {
                        method: "DELETE" // Comunica ao Express/Next a intenção hostil
                    });
                    const result = await response.json();

                    if (!response.ok) throw new Error(result.error || "Erro ao deletar a conta");

                    // Apaga as memórias físicas
                    set({ user: null, isLoggedIn: false, isLoading: false });
                    return true;
                } catch (err: any) {
                    set({ error: err.message, isLoading: false });
                    return false;
                }
            },

            setError: (error) => set({ error })
        }),
        {
            name: "auth-storage", // Nome da chave no localStorage,
        }
    )
)