import React, { ReactNode } from 'react'
import Header from './Header'
import './Page.css'

type Props = {
  children: ReactNode
  title: string
}

const Page = ({ children, title }: Props) => (
  <div className="FastlaneUI-Page">
    <Header />
    <div className="FastlaneUI-Page__Body">
      <h1 className="FastlaneUI-Page__Body__Title">{title}</h1>
      <div className="FastlaneUI-Page__Body__Content">{children}</div>
    </div>
  </div>
)

export default Page
