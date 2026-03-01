export default function ParentResourcesPage() {
    return (
        <div className="mx-auto max-w-4xl p-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Ressources & Accompagnement</h1>
            <p className="mt-4 text-muted-foreground text-lg">
                Retrouvez ici des guides, des articles et des contacts utiles pour mieux comprendre et accompagner votre proche.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="font-semibold text-lg">Comprendre les troubles anxieux</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Un guide complet pour identifier les signes et savoir comment réagir face à une crise d'angoisse.</p>
                    <a href="#" className="mt-4 inline-block text-sm text-primary hover:underline">Lire l'article</a>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="font-semibold text-lg">La communication bienveillante</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Comment aborder les sujets difficiles sans braquer votre adolescent et maintenir le lien.</p>
                    <a href="#" className="mt-4 inline-block text-sm text-primary hover:underline">Lire l'article</a>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="font-semibold text-lg">Numéros d'urgence nationaux</h3>
                    <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                        <li>SAMU: 15</li>
                        <li>Police: 17</li>
                        <li>Prévention suicide: 3114</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
