import '@/global.css'

import { CounterStoreProvider } from '@/providers/counter-store-provider'

export const metadata = {
  title: 'Daily English Voca',
  description: '매일 매일 외우는 영어단어장',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <CounterStoreProvider>{children}</CounterStoreProvider></body>
    </html>
  )
}
