import { Header } from '@/components/header'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-[100px]">
        {children}
      </div>
    </div>
  )
}