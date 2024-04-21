import { getJobs } from "@/lib/jobs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { jobTypes } from "@/lib/job-types";
import { Button } from "./ui/button";
import { jobFilterSchema } from "@/schema/jobFilter";
import { redirect } from "next/navigation";

const filterJobs = async (formData: FormData) => {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const { q, location, remote, type } = jobFilterSchema.parse(values);
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(location && { location }),
    ...(type && { type }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`)
};

export const JobFilter = () => {
  const jobs = getJobs();
  const locations = jobs
    .map(({ location }) => location)
    .filter((location) => location !== undefined) as string[];
  const distinctLocations = Array.from(new Set(locations));

  const types = jobTypes;

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs}>
        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="Title, company, etc." />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue="">
              <option value="">All types</option>
              {types.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue="">
              <option value="">All location</option>
              {distinctLocations.map((location) => (
                <option value={location} key={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <Button className="w-full">Filter jobs</Button>
        </div>
      </form>
    </aside>
  );
};
