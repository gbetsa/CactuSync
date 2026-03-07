'use client';
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { CactusLogo } from "@/app/components/CactusLogo";

/**
 * Página de Relatórios e Análises
 * Exibe gráficos estáticos e uma lista ficcional de documentos PDF.
 * Também protegida contra acessos não autorizados.
 */
export default function Reports() {
    const user = useAuthStore((state) => state.user);
    const router = useRouter();

    // Barreira de proteção padrão
    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) {
        return null; // Evita lampejos de layout
    }

    // Dados Fictícios de Relatórios para fins de exibição (Estudos)
    const reports = [
        { title: "Análise Macroeconômica", date: "Jan 2026", type: "PDF" },
        { title: "Performance de Portfólio", date: "Dez 2025", type: "PDF" },
        { title: "Estratégia Trimestral", date: "Nov 2025", type: "XLS" },
        { title: "Audit de Custódia", date: "Out 2025", type: "PDF" },
    ];

    // Dados percentuais ficcionais (Estudos) para preencher os gráficos no Grid
    const performanceData = [40, 65, 55, 85, 70, 95];

    return (
        <main className="px-8 lg:px-20 pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-700">
            <div className="grid grid-cols-12 gap-6 lg:gap-10 items-stretch">

                {/* HERO - RELATÓRIOS */}
                <section className="col-span-12 lg:col-span-7 bg-white card-organic p-12 lg:p-20 shadow-premium border border-background-almondCream flex flex-col justify-center min-h-[400px]">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground-dustyOlive mb-6 block italic">Inteligência Privada</span>
                    <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-editorial mb-8 leading-none">
                        Relatórios<br /><span className="italic font-light opacity-50">& Análises</span>
                    </h1>
                    <p className="text-lg font-bold opacity-60 leading-relaxed max-w-md">
                        Transparência absoluta e dados granulares sobre a evolução do seu patrimônio sob nossa custódia.
                    </p>
                </section>

                {/* PERFORMANCE CHART - CSS BARS */}
                <div className="col-span-12 lg:col-span-5 bg-background-dustyOlive p-10 rounded-[60px] shadow-premium text-background-almondCream flex flex-col justify-between overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>

                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Evolução Patrimonial</span>
                        <h3 className="text-3xl font-black tracking-tighter mt-2 mb-10">Crescimento 2026</h3>
                    </div>

                    <div className="flex items-end justify-between h-40 gap-2">
                        {performanceData.map((val, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3">
                                <div
                                    className="w-full bg-background-almondCream/20 rounded-t-xl group-hover:bg-background-almondCream/40 transition-all duration-500"
                                    style={{ height: `${val}%` }}
                                ></div>
                                <span className="text-[9px] font-black opacity-40 uppercase tracking-tighter">M{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* COMPOSIÇÃO DE CARTEIRA - VISUAL BENTO */}
                <div className="col-span-12 md:col-span-4 bg-background-ashGrey/10 p-10 card-organic border border-white flex flex-col justify-between min-h-[300px]">
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-6">Risco Estratégico</h4>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border-4 border-foreground-darkOlive flex items-center justify-center">
                                    <span className="text-xs font-black">A+</span>
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase">Rating de Liquidez</p>
                                    <p className="text-[10px] font-bold opacity-50 italic">Excelente</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-[10px] font-bold leading-relaxed opacity-60">
                        Carteira reajustada para suportar volatilidade extrema de curto prazo.
                    </p>
                </div>

                {/* ARQUIVO DE RELATÓRIOS - LISTA DESIGN */}
                <div className="col-span-12 md:col-span-8 bg-white shadow-premium p-10 rounded-[40px] border border-background-almondCream">
                    <div className="flex justify-between items-center mb-10">
                        <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">Arquivo Histórico</h4>
                        <div className="w-10 h-10 rounded-full bg-background-almondCream flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                            <CactusLogo />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reports.map((report, i) => (
                            <div key={i} className="group p-6 bg-background-almondCream/30 rounded-3xl border border-transparent hover:border-foreground-darkOlive/10 hover:bg-white transition-all cursor-pointer flex justify-between items-center">
                                <div>
                                    <h5 className="text-sm font-black tracking-tighter mb-1">{report.title}</h5>
                                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{report.date}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[9px] font-black px-3 py-1 bg-background-ashGrey/20 rounded-full">{report.type}</span>
                                    <div className="w-6 h-6 rounded-full bg-foreground-darkOlive flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
                                        <span className="text-[10px]">↓</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}
