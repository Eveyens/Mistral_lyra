export default function ParentSettingsPage() {
    return (
        <div className="mx-auto max-w-2xl p-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Paramètres du compte Parent</h1>
            <p className="mt-2 text-muted-foreground">Gérez vos préférences de notification et vos informations personnelles.</p>

            <div className="mt-8 space-y-6">
                <div className="rounded-xl border bg-card p-6">
                    <h3 className="font-semibold text-lg mb-4">Notifications</h3>
                    <div className="space-y-4">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary" defaultChecked />
                            <span className="text-sm">Recevoir une alerte en cas d'utilisation du bouton SOS</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary" defaultChecked />
                            <span className="text-sm">Résumé hebdomadaire de l'activité</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
