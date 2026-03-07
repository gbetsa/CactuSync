import Link from "next/link";
import { CactusLogo } from "@/app/components/CactusLogo";
import { Button } from "@/app/components/Button";

/**
 * Página 404 Personalizada do Next.js (App Router)
 * É renderizada automaticamente quando uma rota não existe.
 */
export default function NotFound() {
    return (
        <main className="flex w-screen h-screen overflow-hidden font-sans bg-background-dustyOlive relative flex-col items-center justify-center p-6 text-center">

            {/* Elementos Decorativos de Fundo (Abraçando o tema Oásis do Deserto) */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-background-almondCream/5 rounded-full blur-3xl mix-blend-overlay"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-foreground-darkOlive/20 rounded-full blur-3xl mix-blend-overlay"></div>

            <div className="z-10 flex flex-col items-center max-w-lg">
                {/* Ícone ou Logo Central */}
                <div className="w-24 h-24 mb-6 card-organic bg-foreground-darkOlive flex items-center justify-center shadow-premium text-background-almondCream animate-float">
                    <CactusLogo />
                </div>

                {/* Mensagem principal impactante (Editorial/Chique) */}
                <h1 className="text-8xl md:text-9xl font-black text-background-almondCream tracking-tighter drop-shadow-md mb-2">
                    404
                </h1>

                <div className="flex items-center gap-3 mb-6 justify-center">
                    <div className="h-px w-12 bg-background-almondCream/30"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-background-almondCream/70">OÁSIS NÃO ENCONTRADO</span>
                    <div className="h-px w-12 bg-background-almondCream/30"></div>
                </div>

                {/* Texto descritivo refinado */}
                <p className="text-lg md:text-xl text-background-almondCream/80 leading-relaxed font-medium mb-10">
                    Parece que você navegou para uma área inexplorada do deserto. A página que você procura secou ou nunca existiu.
                </p>

                {/* Botão de resgate estilizado */}
                <Link href="/" className="w-full sm:w-auto">
                    <button className="whitespace-nowrap px-8 py-4 bg-background-almondCream text-foreground-darkOlive rounded-full text-[12px] font-black uppercase tracking-widest hover:bg-background-ashGrey transition-all border border-transparent shadow-premium flex items-center justify-center gap-3">
                        <span>←</span> Retornar ao Mapa Principal
                    </button>
                </Link>
            </div>

            {/* Ilustração minimalista de Dunas no rodapé apenas para não ficar um verde liso */}
            <div className="absolute bottom-0 w-full h-[20vh] pointer-events-none opacity-10 flex items-end overflow-hidden">
                <div className="w-[120%] h-[15vh] bg-background-almondCream rounded-[50%] -mb-10 -ml-10"></div>
                <div className="w-[120%] h-[25vh] bg-background-almondCream rounded-[40%] absolute -mb-16 -mr-20 right-0"></div>
            </div>

        </main>
    );
}
