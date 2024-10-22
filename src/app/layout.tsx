import '@/styles/main.scss'
import { Header } from '@/components/header/Header'
import { headers } from 'next/headers'
// import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const viewport = headersList.get('x-viewport')

  const ua = `${headersList.get('User-Agent')}`

  var safari = /^((?!chrome|android).)*safari/i.test(ua)

  return (
    <html lang="en">
      <head></head>
      <body style={{ overscrollBehavior: 'none' }}>
        <Header />
      </body>
    </html>
  )
}
// Transition element if required
{
  /* <div
          id="transition-element"
          style={{
            background: '#f2f2f2',
            width: '100vw',
            height: '100vh',
            zIndex: 10000000,
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          className="w-screen h-screen bg-black z-100 fixed top-0 left-0"
        >

        </div> */
}
