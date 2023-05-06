import Head from 'next/head'
import { Header } from 'ui-local'

export interface PageLayoutProps {
  title?: string
  children: React.ReactNode
}
export function PageLayout(props: PageLayoutProps) {
  return (
    <>
      <Head>
        <title>{props.title ?? 'location'}</title>
      </Head>
      <div className="min-h-screen">
        {props.children}
        {/* <Header />
        <main className="pt-24 px-2">{props.children}</main> */}
      </div>
    </>
  )
}
