import { JobFilter } from "@/components/JobFilter";
import { JobListItem } from "@/components/JobListItem";
import { getJobs } from "@/lib/jobs";

export default function Home() {
  const jobs = getJobs();

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tighter lg:text-5xl">Developer Jobs</h1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilter />
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobListItem job={job} key={job.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
