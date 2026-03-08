'use client'; // Indica ser um Client Component no novo App Router

import { useAuthStore } from "@/app/store/useAuthStore";
import Link from "next/link";
import { Button } from "@/app/components/Button";

/**
 * Página Principal (Dashboard Interno / Portfólio)
 * O usuário só consegue visualizar esta página se 'user' existir na store global.
 */
export default function Home() {
  // Puxa o objeto do usuário logado diretamente da memória (Zustand persiste isso do localStorage)
  const user = useAuthStore((state) => state.user);

  // Trava de renderização: Evita "piscar" a dashboard vazia/quebrada antes de redirecionar 
  // caso o usuário consiga acessar a rota limpa e o useEffect ainda esteja rodando
  if (!user) {
    return null;
  }

  return (
    <main className="px-8 lg:px-20 pb-20 max-w-[1600px] mx-auto">
      {/* GRID ASSIMÉTRICO (BENTO LAYOUT) */}
      <div className="grid grid-cols-12 gap-6 lg:gap-10 items-stretch">

        {/* HERO SECTION - GRANDE E IMPACTANTE */}
        <section className="col-span-12 lg:col-span-8 bg-background-dustyOlive card-organic p-12 lg:px-40 lg:py-24 text-background-almondCream shadow-premium relative overflow-hidden flex flex-col justify-center min-h-[500px]">
          <div className="absolute top-10 right-10 w-40 h-40 minimalist-sun opacity-20"></div>

          <div className="relative z-10 max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-editorial mb-8 animate-in fade-in slide-in-from-left-10 duration-1000 leading-none">
              Olá,<br />{user?.name || user?.email.split('@')[0]}
            </h1>
            <div className="h-1 w-20 bg-background-almondCream mb-8 opacity-30"></div>
            <p className="text-xl lg:text-3xl font-light opacity-80 leading-snug">
              Seu <span className="font-bold underline italic tracking-tight text-white">Patrimônio sob Gestão</span> está operando com rentabilidade de 12.8% a.a. em custódia protegida.
            </p>
          </div>
        </section>

        {/* CARD LATERAL - STATUS VERTICAL */}
        <div className="col-span-12 lg:col-span-4 bg-white shadow-premium p-10 rounded-[40px] flex flex-col justify-between border border-background-almondCream group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700 opacity-50"></div>
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Liquidez Imediata</span>
            <div className="flex items-baseline gap-2 mt-2 mb-1">
              <h3 className="text-3xl font-black tracking-tighter text-editorial">Conta de Liquidez</h3>
              <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">+1.02% mês</span>
            </div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black font-mono tracking-tighter text-green-800/60 transition-all">STATUS: DISPONÍVEL PARA RESGATE</span>
            </div>

            <div className="space-y-4 border-l-2 border-background-almondCream pl-6 my-8">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Saldo Disponível</p>
                <p className="text-2xl font-black tracking-tighter">R$ 240.000,00</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Último Aporte</p>
                <p className="text-xs font-bold italic">R$ 15.000,00 <span className="opacity-40 not-italic">• 4 dias atrás</span></p>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-6">
            <Button
              text="Resgatar para Conta Corrente"
              variant="primary"
              className="w-full"
            />
            <p className="text-[9px] font-bold leading-relaxed opacity-50 text-center px-4">
              Saldo garantido por mecanismo de proteção de ativos.
            </p>
          </div>
        </div>

        {/* MÉTRICA 1 - PATRIMÔNIO TOTAL */}
        <div className="col-span-12 md:col-span-3 bg-background-ashGrey/20 p-10 card-organic shadow-premium border border-white/40 group flex flex-col justify-center">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Patrimônio Total</span>
          <div className="text-4xl font-black tracking-tighter my-4 group-hover:scale-110 transition-transform duration-500">R$ 2.4M</div>
          <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest leading-loose">Ativos de alta <br /> convicção</p>
        </div>

        {/* ALOCAÇÃO ESTRATÉGICA - NOVO CARD DE DADOS */}
        <div className="col-span-12 md:col-span-4 bg-white shadow-premium p-10 rounded-[50px] border border-background-almondCream overflow-hidden relative">
          <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-6">Alocação Estratégica</h4>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic">
                <span>Ações Globais</span>
                <span>65%</span>
              </div>
              <div className="h-1 w-full bg-background-almondCream rounded-full overflow-hidden">
                <div className="h-full bg-foreground-darkOlive w-[65%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic text-foreground-dustyOlive">
                <span>Renda Fixa</span>
                <span>25%</span>
              </div>
              <div className="h-1 w-full bg-background-almondCream rounded-full overflow-hidden">
                <div className="h-full bg-background-dustyOlive w-[25%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic opacity-40">
                <span>Liquidez</span>
                <span>10%</span>
              </div>
              <div className="h-1 w-full bg-background-almondCream rounded-full overflow-hidden">
                <div className="h-full bg-background-ashGrey w-[10%]" />
              </div>
            </div>
          </div>
        </div>

        {/* HISTÓRICO DE PERFORMANCE - LISTA DETALHADA */}
        <div className="col-span-12 md:col-span-5 bg-background-dustyOlive/5 p-10 rounded-[40px] border border-white">
          <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-6">Últimas Movimentações</h4>
          <div className="space-y-4">
            {[
              { label: 'Dividendos Recebidos', value: '+ R$ 12.402', date: 'Hoje' },
              { label: 'Rendimento CDB Pós-Fixado', value: '+ R$ 8.120', date: 'Ontem' },
              { label: 'Rebalanceamento de Carteira', value: '- R$ 3.000', date: '01 Mar' }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center bg-white/50 p-4 rounded-2xl hover:bg-white transition-colors duration-300">
                <div>
                  <p className="text-xs font-black uppercase tracking-tighter">{item.label}</p>
                  <span className="text-[9px] font-bold opacity-40">{item.date}</span>
                </div>
                <span className={`text-[10px] font-black ${item.value.startsWith('+') ? 'text-green-700' : 'text-red-700'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* INSIGHTS ESTRATÉGICOS - TEXTO EDITORIAL */}
        <div className="col-span-12 md:col-span-7 bg-white shadow-premium p-6 sm:p-8 md:p-12 rounded-[40px] md:rounded-[60px] relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-background-almondCream rounded-full opacity-20 group-hover:scale-125 transition-transform duration-1000 z-0"></div>
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground-dustyOlive mb-4 md:mb-6 block italic">Análise do Estrategista</span>
            <h4 className="text-xl md:text-2xl font-black text-editorial leading-tight mb-6">
              A preservação de capital em cenários de volatilidade é a prioridade deste trimestre.
            </h4>

            {/* NOVO LAYOUT MAIS SEGURO: Stacks verticalmente em mobile, linha em desktop */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full sm:flex-1">
                <p className="text-sm sm:text-xs font-bold leading-relaxed opacity-60">
                  Nossa tese de <span className="underline italic">Gestão Conservadora</span> recomenda a manutenção de ativos de alta liquidez frente à incerteza global.
                </p>
              </div>
              <div className="w-full sm:w-auto">
                <Button
                  href="/reports"
                  text="Acessar Relatório"
                  variant="ghost"
                  className="w-full sm:w-auto"
                />
              </div>
            </div>

          </div>
        </div>

        {/* SEÇÃO DE DADOS - CONFIGURAÇÃO */}
        <div className="col-span-12 md:col-span-5 bg-background-ashGrey/10 p-10 card-organic border border-white">
          <h4 className="text-sm font-black uppercase tracking-widest opacity-40 mb-6 text-center md:text-left">Gestão & Custódia</h4>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-foreground-darkOlive/5 pb-2">
              <span className="text-xs font-bold opacity-50">Custódia Principal</span>
              <span className="text-xs font-black font-mono">BOUTIQUE-DIRECT-01</span>
            </div>
            <div className="flex justify-between border-b border-foreground-darkOlive/5 pb-2">
              <span className="text-xs font-bold opacity-50">Selo de Auditoria</span>
              <span className="text-xs font-black">Elite Finance #904</span>
            </div>
            <div className="pt-4 flex justify-center md:justify-start">
              <Link href="/profile" className="text-[10px] font-black uppercase tracking-widest text-foreground-darkOlive hover:underline">
                Gestão de Ativos & Segurança →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
