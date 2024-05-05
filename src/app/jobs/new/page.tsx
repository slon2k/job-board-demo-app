import { Metadata } from 'next'
import { JobCreateForm } from './JobCreateFormTest'

export const metadata: Metadata = {
  title: "Post a new job"
}

export const JobCreatePage = () => {
  return (
    <JobCreateForm />
  )
}

export default JobCreatePage
