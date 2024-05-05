"use client"

import { H1 } from "@/components/ui/h1"
import { JobCreateValues, jobCreateSchema } from "@/schema/createJob"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { jobTypes, locationTypes } from "@/lib/job-types"
import { LocationSearch } from "@/components/LocationSearch"

export const JobCreateForm = () => {
  const form = useForm<JobCreateValues>({
    resolver: zodResolver(jobCreateSchema)
  })

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting }
  } = form

  const onSubmit = (values: JobCreateValues) => {
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <main className="max-w-3xl m-auto my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>Find your perfect developer</H1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers:
        </p>
      </div>
      <div className="space-y-6 border rounded-lg p-4">
        <div>
          <h2 className="font-semibold">Job details</h2>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormField 
              control={control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Job title
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Frontend Developer" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={control}
              name="type"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Job type
                  </FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" hidden>Select an option</option>
                      {jobTypes.map(jobType => (
                        <option value={jobType} key={jobType}>{jobType}</option>
                      ))}
                    </Select>                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={control}
              name="companyName"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Company
                  </FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={control}
              name="companyLogo"
              render={({field: {value, ...fieldValues}}) => (
                <FormItem>
                  <FormLabel>
                    Company logo
                  </FormLabel>
                  <FormControl>
                    <Input {...fieldValues}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        fieldValues.onChange(file)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={control}
              name="locationType"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Location type
                  </FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" hidden>Select an option</option>
                      {locationTypes.map(locationType => (
                        <option value={locationType} key={locationType}>{locationType}</option>
                      ))}
                    </Select>                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={control}
              name="location"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Office location
                  </FormLabel>
                  <FormControl>
                    <LocationSearch  {...field}
                      placeholder="Office"
                      onLocationSelected={field.onChange}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </main>
  )
}
