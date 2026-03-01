export default function MedecinSettingsPage() {
    return (
        <div className="mx-auto max-w-2xl p-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Paramètres Médecin</h1>
            <p className="mt-2 text-muted-foreground">Configurez vos préférences pour l'espace praticien.</p>

            <div className="mt-8 space-y-6">
                <div className="rounded-xl border bg-card p-6">
                    <h3 className="font-semibold text-lg mb-4">Préférences Cliniques</h3>
                    <div className="space-y-4">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary" defaultChecked />
                            <span className="text-sm">Activer les résumés générés par l'IA des sessions de discussion des patients</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary" />
                            <span className="text-sm">Tri automatique des patients par niveau d'alerte sur le tableau de bord</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
