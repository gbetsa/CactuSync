import { NextResponse } from "next/server";
import { UserService } from "../services/user.service";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export class UserController {
    private userService = new UserService();

    // Método Privado Auxiliar: Gera o JWT e configura o Cookie
    private async generateTokenAndSetCookie(email: string) {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        // Assinatura Token
        const token = await new SignJWT({ email })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(secret);

        // Salvar Token nos Cookies
        (await cookies()).set("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60,
            path: "/",
        });
    }

    // POST /api/login
    async login(req: Request) {
        try {
            const { email, password } = await req.json();
            const user = await this.userService.login(email, password);

            // Chamada para gerar Token e salvar
            await this.generateTokenAndSetCookie(user.email);

            return NextResponse.json({ message: "Login realizado com sucesso" });
        } catch (error: any) {
            return NextResponse.json({ error: "Email ou senha inválidos" }, { status: 401 });
        }
    }

    // POST /api/register
    async register(req: Request) {
        try {
            const { name, email, password } = await req.json();
            const user = await this.userService.register(name, email, password);

            // Chamada para gerar Token e salvar
            await this.generateTokenAndSetCookie(user.email);

            return NextResponse.json({
                message: "Usuário criado com sucesso",
                user: { email: user.email, name: user.name }
            }, { status: 201 });
        } catch (error: any) {
            const msg = error.message === "EMAIL_ALREADY_IN_USE"
                ? "Este e-mail já está cadastrado"
                : "Erro ao cadastrar";
            return NextResponse.json({ error: msg }, { status: 400 });
        }
    }

    // GET /api/user/me
    async getMe(req: Request) {
        try {
            const email = req.headers.get('x-user-email');
            if (!email) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

            const user = await this.userService.getProfile(email);
            return NextResponse.json({ user });
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    }

    // POST /api/user/update
    async updateMe(req: Request) {
        try {
            const email = req.headers.get('x-user-email');
            if (!email) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

            const data = await req.json();
            const updatedUser = await this.userService.updateProfile(email, data);
            return NextResponse.json({ message: "Perfil atualizado", user: updatedUser });
        } catch (error: any) {
            // Tratamento de erros amigáveis vindo do Service
            const messages: any = {
                "INVALID_PASSWORD": "Senha atual incorreta",
                "EMAIL_ALREADY_IN_USE": "Este e-mail já está em uso",
                "USER_NOT_FOUND": "Usuário não encontrado"
            };
            return NextResponse.json({ error: messages[error.message] || "Erro ao atualizar" }, { status: 400 });
        }
    }

    // POST /api/user/delete
    async deleteMe(req: Request) {
        try {
            const email = req.headers.get('x-user-email');
            if (!email) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

            await this.userService.deleteAccount(email);
            return NextResponse.json({ message: "Conta excluída permanentemente" });
        } catch (error: any) {
            const messages: any = {
                "USER_NOT_FOUND": "Usuário não encontrado"
            };
            return NextResponse.json({ error: messages[error.message] || "Erro ao excluir conta" }, { status: 400 });
        }
    }
}