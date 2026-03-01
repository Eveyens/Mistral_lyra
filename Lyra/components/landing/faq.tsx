import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "Lyra peut-elle remplacer mon medecin ou psychologue ?",
    a: "Non, absolument pas. Lyra est un outil de soutien entre les seances. Elle ne pose aucun diagnostic et ne remplace jamais l'avis d'un professionnel de sante. En cas d'urgence, appelez le 15 ou le 3114.",
  },
  {
    q: "Mes donnees sont-elles securisees ?",
    a: "Oui. Toutes les donnees sont chiffrees au repos et en transit. Vous pouvez exporter ou supprimer votre compte a tout moment. Nous minimisons la collecte de logs et ne partageons jamais vos donnees a des tiers.",
  },
  {
    q: "Mon parent peut-il lire mon journal ?",
    a: "Non, par defaut. Le parent ne voit qu'un score global de bien-etre et des alertes critiques (si vous l'autorisez). Il n'a jamais acces au contenu de votre journal ni aux transcriptions vocales, sauf si vous activez explicitement un partage detaille.",
  },
  {
    q: "L'IA est-elle fiable ?",
    a: "L'IA de Lyra utilise l'ecoute active et la reformulation. Elle propose des exercices simples (respiration, ancrage). Elle ne donne jamais de diagnostic, de prescription ou de promesse de guerison. Tous les contenus generes sont informatifs.",
  },
  {
    q: "Je peux arreter le partage avec mon medecin ?",
    a: "Oui, a tout moment, en un clic dans les parametres. Vous gardez toujours la main sur ce qui est partage et avec qui.",
  },
  {
    q: "C'est gratuit ?",
    a: "La version de base est gratuite. Des fonctionnalites avancees pourront etre proposees dans une version premium a l'avenir.",
  },
]

export function LandingFaq() {
  return (
    <section id="faq" className="bg-secondary/50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Questions frequentes</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            On repond a vos questions.
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="overflow-hidden rounded-xl border border-border bg-card px-6">
              <AccordionTrigger className="text-left text-base font-medium text-card-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
