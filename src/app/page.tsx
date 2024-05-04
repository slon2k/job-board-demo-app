import { JobFilter } from "@/components/JobFilter";
import { JobResults } from "@/components/JobResults";
import { H1 } from "@/components/ui/h1";
import { JobFilterValues } from "@/schema/jobFilter";
import { Metadata } from "next/types";
import { FC } from "react";

interface IProps {
  searchParams: {
    q?: string,
    type?: string,
    location?: string,
    remote?: string 
  }
}

function getTitle({q, type, location, remote}: JobFilterValues) {
  const titlePrefix = q
    ? `${q} developer jobs`
      : type
    ? `${type} developer jobs`
      : remote
    ? "Remote developer jobs"
      : "Developer jobs"

  const titleSuffix = location ? ` in ${location}` : ""
  
  return `${titlePrefix}${titleSuffix}`
}

export function generateMetadata({ searchParams: {q, type, location, remote} }: IProps) : Metadata {
  const title = getTitle({
    q,
    type,
    location,
    remote: remote === 'true'
  }) + " | Flow Jobs"
  
  return { title }
}

const HomePage: FC<IProps> = ({searchParams: {q, type, location, remote}}) => {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === 'true'
  }

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilter defaultValues={filterValues}/>
        <JobResults jobFilter={filterValues} />
      </section>
    </main>
  );
}

export default HomePage