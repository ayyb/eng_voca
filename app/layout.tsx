import '@/global.css'

export const metadata = {
  title: 'Daily English Voca',
  description: '매일 매잉 외우는 영어단어장',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
