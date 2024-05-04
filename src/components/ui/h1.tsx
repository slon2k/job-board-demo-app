import * as React from "react"

import { cn } from "@/lib/utils"

interface IProps extends React.HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode
}

export const H1: React.FC<IProps> = ({children, className, ...props}, ) => {
  return (
    <h1 className={cn("text-4xl font-extrabold tracking-tighter lg:text-5xl", className)} {...props}>
      {children}
    </h1>
  )
}
