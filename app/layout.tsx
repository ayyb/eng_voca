import '@/global.css'

import { CounterStoreProvider } from '@/providers/counter-store-provider'

export const metadata = {
  title: 'Daily English Voca',
  description: '매일 매일 외우는 영어단어장',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Daily English Voca',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="">
        <div className="">
          <CounterStoreProvider>{children}</CounterStoreProvider>
        </div>
      </body>
    </html>
  )
}
