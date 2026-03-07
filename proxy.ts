import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value;

    // Se o usuário está na Home e NÃO tem token, manda pro Login
    if (!token && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Se o usuário já está logado e tenta ir pro Login, manda pra Home
    if (token && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Configuração para o proxy não rodar em arquivos estáticos (imagens, etc)
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
