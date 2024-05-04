import { JobFilterValues } from "@/schema/jobFilter"
import { placeholderJobs } from "./placeholder-data"

export const getJobs = () => {
  const jobs = placeholderJobs as [Job]
  return jobs
}

export const getFilteredJobs = (filter: JobFilterValues) => {
  const {q, type, location, remote} = filter
  let jobs = placeholderJobs as Job[]

  if (remote) {
    jobs = jobs.filter(job => job.locationType === "Remote")
  }

  if (location) {
    jobs = jobs.filter(job => job.location === location)
  }

  if (type) {
    jobs = jobs.filter(job => job.type === type)
  }

  if (q) {
    jobs = jobs.filter(job => job.title.toLowerCase().includes(q.toLowerCase()) || job.description.toLowerCase().includes(q.toLowerCase()))
  }

  return jobs
}
