import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export default async function proxy(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value;
    const { pathname } = request.nextUrl;

    // 1. REGRA PARA QUALQUER ROTA DE API
    if (pathname.startsWith('/api/')) {
        // Se for uma rota que precisa de login (user ou logout)
        if (pathname.startsWith('/api/user') || pathname === '/api/logout') {
            if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

            // Apenas para rotas de /api/user nós injetamos o email via JWT
            if (pathname.startsWith('/api/user')) {
                try {
                    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
                    const { payload } = await jwtVerify(token, secret);
                    const requestheaders = new Headers(request.headers);
                    requestheaders.set('x-user-email', payload.email as string);
                    return NextResponse.next({ request: { headers: requestheaders } });
                } catch (e) {
                    return NextResponse.json({ error: 'Sessão inválida' }, { status: 401 });
                }
            }
        }

        // Se for login/register ou logout com token, continua normal
        return NextResponse.next();
    }

    // 2. REGRA PARA PÁGINAS (Navegação no browser)
    if (!token && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
