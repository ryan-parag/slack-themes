import { Layout } from '@/components/Layout'

export default function About() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-6 py-10 lg:px-8">
        <h1 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">About Slack Themes</h1>
        <p className="text-sm text-neutral-500 mb-8">A community toolkit for customizing Slack's sidebar.</p>

        <section className="space-y-6 text-sm text-neutral-700 dark:text-neutral-300">
          <div>
            <h2 className="font-semibold text-neutral-900 dark:text-white mb-2">How the 4-color system works</h2>
            <p className="leading-relaxed">
              Modern Slack uses 4 "seed" colors to describe a theme. Every other color in the sidebar —
              hover states, text contrast, borders — is derived from these 4 anchors automatically.
            </p>
            <ul className="mt-3 space-y-1.5 list-none">
              {[
                ['Sidebar background', 'The main background of the sidebar and navigation'],
                ['Selected item', 'Highlight color for the active channel or item'],
                ['Presence indicator', 'Green dot for online status'],
                ['Notification badge', 'Unread count and mention badge'],
              ].map(([name, desc]) => (
                <li key={name} className="flex gap-2">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5" />
                  <span><strong className="text-neutral-900 dark:text-white">{name}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-neutral-900 dark:text-white mb-2">How to apply a theme in Slack</h2>
            <ol className="space-y-1.5 list-decimal list-inside">
              {[
                'Open Slack → Preferences → Themes',
                'Scroll to "Custom theme" and click it',
                'Paste the JSON string from the Copy button',
                'Slack applies the theme instantly',
              ].map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="font-semibold text-neutral-900 dark:text-white mb-2">Legacy theme import</h2>
            <p className="leading-relaxed">
              If you have an old 8–10 value comma-separated theme string, use the "Import legacy theme"
              panel in the Playground. It maps the dominant colors to the 4 new anchors.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-neutral-900 dark:text-white mb-2">Open source</h2>
            <p className="leading-relaxed">
              Slack Themes is open source. Contributions welcome.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
