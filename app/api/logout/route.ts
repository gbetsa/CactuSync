import { cookies } from "next/headers";

/**
 * Rota API POST: /api/logout
 * Responsável por encerrar a sessão do usuário de forma segura.
 */
export async function POST() {
    // Para efetuar o logout, simplesmente deletamos o cookie HTTP-only 
    // que guarda o JWT, impossibilitando novas chamadas autenticadas pelo navegador.
    (await cookies()).delete("auth-token");

    return Response.json({ message: "Logout realizado com sucesso" });
}
