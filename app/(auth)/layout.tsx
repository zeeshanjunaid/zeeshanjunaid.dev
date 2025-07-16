import { Header } from '@/components/header'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="pt-[100px]">
        {children}
      </main>
    </>
  )
}