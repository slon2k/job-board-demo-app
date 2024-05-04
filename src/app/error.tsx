"use client"

import { H1 } from "@/components/ui/h1"

const ErrorPage = () => {
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>Error</H1>
        <p>An unexpected error occured</p>
      </div>
    </main>
  )
}

export default ErrorPage