import './globals.css'

export const metadata = {
  title: 'App',
  description: 'qbatch',
  generator: 'qbatch.com',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">{children}</body>
    </html>
  )
}
