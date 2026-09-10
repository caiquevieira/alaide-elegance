import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Car, Clock3, Instagram, MapPin, Menu, Phone, Scissors, Sparkles, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ruivo from "@/assets/ruivo-iluminado.jpg.asset.json";
import logo from "@/assets/Logo_v2.png.asset.json";
import hero from "@/assets/SaveClip.App_625051777_18106963369702980_5614616476454664082_n.jpg.asset.json";
import curls from "@/assets/SaveClip.App_649187853_17978342495987408_8135828874252907407_n.jpg.asset.json";
import updo from "@/assets/SaveClip.App_658415795_18576542131034719_4029903392223549857_n.jpg.asset.json";
import golden from "@/assets/SaveClip.App_487807186_18494342554005411_7778256990997231559_n.jpg.asset.json";
import pearl from "@/assets/SaveClip.App_487403074_18494733571005411_8003880074698691185_n.jpg.asset.json";
import bob from "@/assets/SaveClip.App_623355922_18553045489005411_6592863624183023849_n.jpg.asset.json";
import brunette from "@/assets/SaveClip.App_626005324_18554029363005411_1358879818042656821_n.jpg.asset.json";
import medium from "@/assets/SaveClip.App_760343526_18608786239005411_2428763478422453332_n.jpg.asset.json";
import facade from "@/assets/Local.jpeg.asset.json";

const whatsapp = "https://wa.me/5511981340680?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20atendimento%20no%20Studio%20Alaide.";
const maps = "https://www.google.com/maps/search/?api=1&query=Av.%20General%20Mac%20Arthur%2C%201392%20Jaguar%C3%A9%20S%C3%A3o%20Paulo";
const trinks = "https://www.trinks.com/alaide-hair-estetica-e-beleza";
const navLinks = [["Início","inicio"],["Especialidades","especialidades"],["Galeria Real","galeria"],["Serviços","servicos"],["Horários & Local","local"]] as const;

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Studio Alaide | Salão de Beleza no Jaguaré" },
    { name: "description", content: "Mechas, loiros, cortes, penteados e estética por Alaíde Lopes no Jaguaré, São Paulo. Agende pelo WhatsApp." },
    { property: "og:title", content: "Studio Alaide | Sua Beleza, Nossa Realeza" },
    { property: "og:description", content: "Transformações capilares com técnica, saúde e brilho no Jaguaré." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: StudioAlaide,
});

const specialties = [
  [Sparkles, "Loiros de Alta Precisão", "Do perolado ao platinado com preservação rigorosa da fibra capilar."],
  [Star, "Morena Iluminada", "Tons amendoados, doces e quentes para quem busca elegância com baixa manutenção."],
  [Scissors, "Penteados & Produções", "Penteados refinados para festas, formaturas e eventos com acabamento impecável."],
] as const;

const gallery = [
  [curls.url, "Cachos Definidos & Mechas Iluminadas"], [updo.url, "Penteado Semipreso Romântico"],
  [golden.url, "Loiro Dourado em Cachos Marcados"], [pearl.url, "Loiro Platinado & Perolado Suave"],
  [bob.url, "Corte Bob em Camadas & Mechas"], [brunette.url, "Morena Iluminada em Fios Longos"],
  [medium.url, "Corte Médio com Pontas Modeladas"], [ruivo.url, "Ruivo Iluminado & Corte em Camadas"],
] as const;

const services = [
  ["01", "Mechas & Loiros", "Loiro perolado, morena iluminada, retoque de raiz e correção de cor."],
  ["02", "Cortes & Visagismo", "Cortes femininos curtos, médios e longos que acompanham o caimento natural."],
  ["03", "Tratamento & Saúde Capilar", "Cronograma capilar, reposição de massa e nutrição profunda para fios pós-química."],
  ["04", "Penteados & Eventos", "Penteados clássicos, despojados e semipresos com alta durabilidade."],
] as const;

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return <div className="mb-12 max-w-2xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">{eyebrow}</p><h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">{children}</h2><div className="mt-6 h-px w-20 bg-primary" /></div>;
}

function StudioAlaide() {
  const [open, setOpen] = useState(false);
  return <main className="overflow-hidden bg-background">
    <header className="sticky top-0 z-50 border-b border-border/70 bg-onyx/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#inicio" aria-label="Studio Alaide - Início"><img src={logo.url} alt="Studio Alaide" className="h-16 w-auto object-contain" /></a>
        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">{navLinks.map(([label,id]) => <a key={id} href={`#${id}`} className="text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-primary">{label}</a>)}</nav>
        <Button asChild variant="luxury" size="lg" className="hidden lg:inline-flex"><a href={trinks} target="_blank" rel="noreferrer">Agendar Horário</a></Button>
        <Button variant="luxuryOutline" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar navegação" : "Abrir navegação"}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav id="menu-mobile" className="flex flex-col gap-1 border-t border-border/50 bg-onyx px-5 py-4 lg:hidden">{navLinks.map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="border-b border-border/30 py-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</a>)}<Button asChild variant="luxury" size="lg" className="mt-4"><a href={whatsapp} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Agendar pelo WhatsApp</a></Button></nav>}
    </header>

    <section id="inicio" className="relative border-b border-border/50 bg-onyx">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 lg:min-h-[760px] lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-16">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 border border-primary/40 bg-primary/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-soft"><Sparkles className="size-4" /> Sua Beleza, Nossa Realeza</div>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.12] text-foreground sm:text-5xl lg:text-6xl">A sofisticação do <span className="gold-text">loiro perfeito</span> e a assinatura do seu estilo.</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground lg:text-lg">Técnicas consagradas de colorimetria, mechas de alta precisão e visagismo criados por Alaíde Lopes para transformar sua beleza com saúde e brilho duradouro.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild variant="luxury" size="lg"><a href={trinks} target="_blank" rel="noreferrer">Garantir Meu Horário <ArrowRight /></a></Button><Button asChild variant="luxuryOutline" size="lg"><a href={whatsapp} target="_blank" rel="noreferrer">Consultar Disponibilidade no WhatsApp</a></Button></div>
          <div className="mt-10 grid gap-3 border-t border-border/60 pt-7 text-xs text-muted-foreground sm:grid-cols-3"><span className="flex gap-2"><Star className="size-4 shrink-0 text-primary" />Atendimento com hora marcada e diagnóstico capilar</span><span className="flex gap-2"><Car className="size-4 shrink-0 text-primary" />Estacionamento próprio na porta</span><span className="flex gap-2"><MapPin className="size-4 shrink-0 text-primary" />Av. General Mac Arthur, 1392 - Jaguaré</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-lg lg:mr-0"><div className="absolute -left-5 top-8 h-full w-full border border-primary/30" /><img src={hero.url} alt="Loiro de alta precisão com ondas longas realizado no Studio Alaide" className="luxe-glow relative aspect-[4/5] w-full object-cover object-center" /><div className="absolute -bottom-5 right-4 border border-primary/50 bg-onyx px-5 py-3 text-xs uppercase tracking-[0.18em] text-gold-soft">Colorimetria • Visagismo</div></div>
      </div>
    </section>

    <section id="especialidades" className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionTitle eyebrow="Excelência em cada detalhe">Especialista em transformações</SectionTitle><div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{specialties.map(([Icon,title,text],i) => <article key={title} className={`group bg-card p-7 transition-colors hover:bg-secondary ${i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}><span className="mb-10 flex size-11 items-center justify-center border border-primary/40 text-primary"><Icon className="size-5" /></span><p className="mb-4 text-[10px] font-bold tracking-[.25em] text-primary">0{i+1}</p><h3 className="font-display text-xl text-foreground">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p></article>)}</div><div className="mt-12 flex flex-col gap-3 sm:flex-row"><Button asChild variant="luxury" size="lg"><a href={trinks} target="_blank" rel="noreferrer">Agendar Minha Transformação <ArrowRight /></a></Button><Button asChild variant="luxuryOutline" size="lg"><a href={whatsapp} target="_blank" rel="noreferrer">Tirar Dúvidas com a Especialista</a></Button></div></section>

    <section id="galeria" className="border-y border-border/50 bg-onyx py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Portfólio autêntico">Resultados reais, beleza singular</SectionTitle><div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">{gallery.map(([src,label],i) => <figure key={label} className={`group relative overflow-hidden bg-card ${i === 0 ? "lg:row-span-2" : ""}`}><img src={src} alt={`${label}, trabalho real do Studio Alaide`} loading={i > 2 ? "lazy" : "eager"} className={`w-full object-cover transition duration-700 group-hover:scale-[1.03] ${i === 0 ? "h-full min-h-72 lg:min-h-[616px]" : "aspect-[4/5] lg:h-[300px]"}`} /><figcaption className="absolute inset-x-0 bottom-0 bg-onyx/90 p-3 text-[10px] font-semibold uppercase leading-4 tracking-[0.08em] text-gold-soft lg:p-4">{label}</figcaption></figure>)}</div><div className="mt-12 text-center"><Button asChild variant="luxury" size="lg"><a href={whatsapp} target="_blank" rel="noreferrer">Quero agendar meu horário <ArrowRight /></a></Button></div></div></section>

    <section id="servicos" className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionTitle eyebrow="Cuidado completo">Serviços do Studio</SectionTitle><div className="grid gap-4 md:grid-cols-2">{services.map(([number,title,text]) => <article key={title} className="border border-border bg-card p-7"><span className="text-xs font-bold tracking-[.2em] text-primary">{number}</span><h3 className="mt-8 font-display text-2xl text-foreground">{title}</h3><div className="my-5 h-px w-10 bg-primary/60" /><p className="text-sm leading-7 text-muted-foreground">{text}</p></article>)}</div><div className="mt-12"><Button asChild variant="luxury" size="lg"><a href={trinks} target="_blank" rel="noreferrer">Reservar Meu Atendimento Online <ArrowRight /></a></Button></div></section>

    <section id="local" className="border-t border-border/50 bg-card"><div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-2 lg:items-center lg:px-8"><div><SectionTitle eyebrow="Venha viver essa experiência">Horários & Local</SectionTitle><div className="space-y-6 text-sm text-muted-foreground"><div className="flex gap-4"><MapPin className="mt-1 size-5 shrink-0 text-primary"/><div><strong className="block text-foreground">Studio Alaide</strong><span>Av. General Mac Arthur, 1392 – Jaguaré / Vila Lageado, São Paulo - SP (CEP: 05338-001).</span></div></div><div className="flex gap-4"><Clock3 className="mt-1 size-5 shrink-0 text-primary"/><dl className="grid w-full grid-cols-[1fr_auto] gap-x-6 gap-y-2"><dt>Terça e Quarta</dt><dd className="text-foreground">10:00 às 19:00</dd><dt>Quinta</dt><dd className="text-foreground">09:00 às 19:00</dd><dt>Sexta e Sábado</dt><dd className="text-foreground">09:00 às 18:00</dd><dt>Domingo e Segunda</dt><dd className="text-foreground">Fechado</dd></dl></div><div className="flex gap-4"><Phone className="mt-1 size-5 shrink-0 text-primary"/><p><a href={whatsapp} target="_blank" rel="noreferrer" className="text-foreground hover:text-primary">WhatsApp: (11) 98134-0680</a><br/>Fixo: (11) 3791-8158</p></div><div className="flex gap-4"><Instagram className="size-5 shrink-0 text-primary"/><a href="https://instagram.com/studio_alaide" target="_blank" rel="noreferrer" className="text-foreground hover:text-primary">@studio_alaide</a></div></div><Button asChild variant="luxury" size="lg" className="mt-9"><a href={maps} target="_blank" rel="noreferrer"><MapPin /> Abrir Rota no Google Maps</a></Button></div><figure className="relative"><img src={facade.url} alt="Fachada do Studio Alaide na Avenida General Mac Arthur, Jaguaré" loading="lazy" className="luxe-glow aspect-[4/3] w-full object-cover"/><figcaption className="absolute bottom-4 left-4 right-4 flex items-center gap-2 border border-primary/50 bg-onyx/95 px-4 py-3 text-xs font-semibold uppercase tracking-[.1em] text-gold-soft"><Car className="size-4"/> Estacionamento privativo na porta</figcaption></figure></div></section>

    <footer className="border-t border-border bg-onyx"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-10 text-center sm:flex-row sm:text-left lg:px-8"><div><p className="font-display text-lg text-primary">Studio Alaide</p><p className="mt-1 text-xs text-muted-foreground">Sua Beleza, Nossa Realeza</p></div><p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Studio Alaide. Todos os direitos reservados.</p></div></footer>

    <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="Agendar pelo WhatsApp" title="Agendar pelo WhatsApp" className="whatsapp-pulse fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground shadow-luxury transition-transform hover:scale-105"><Phone className="size-6"/></a>
  </main>;
}