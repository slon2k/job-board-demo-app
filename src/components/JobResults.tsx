import { FC } from 'react'
import { JobListItem } from './JobListItem'
import { JobFilterValues } from '@/schema/jobFilter';
import { getFilteredJobs } from '@/lib/jobs';

interface IProps {
  jobFilter: JobFilterValues
}

export const JobResults : FC<IProps> = ({jobFilter}) => {
  const jobs = getFilteredJobs(jobFilter);
  
  return (
    <div className="space-y-4 grow">
    {jobs.map((job) => (
      <JobListItem job={job} key={job.slug} />
    ))}
    {jobs.length === 0 && (
      <p className='m-auto text-center'>
        No jobs found
      </p>
    )}
  </div>
  )
}
