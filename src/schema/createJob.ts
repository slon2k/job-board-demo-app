import { jobTypes, locationTypes } from "@/lib/job-types"
import {z} from "zod"

const requiredString = z.string().min(1, "Required")

const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number") 

const companyLogoSchema = z.custom<File | undefined>()
  .refine(
    (file) => (!file || (file instanceof File && file.type.startsWith("image/"))), "Invalid image file")
  .refine(
    (file) => (!file || file.size < 1024 * 1024 * 2), "File must be less than 2MB"
  )

const applicationSchema = z.object({
  applicationEmail: z.string().max(255).email().optional().or(z.literal("")),
  applicationUrl: z.string().max(255).url().optional().or(z.literal("")),
})
.refine(data => data.applicationEmail || data.applicationUrl, {
  message: "Email or url is required",
  path: ["applicationEmail"]
}) 

const locationSchema = z.object({
  locationType: requiredString.refine(
    value => locationTypes.includes(value),
    "Invalid location type"
  ),
  location: z.string().max(255).optional()
})
.refine(
  data => !data.locationType || data.locationType === "Remote" || data.location,
  {
    message: "Location is required for on-site jobs",
    path: ["location"]
  }
)

export const jobCreateSchema = z.object({
  title: requiredString.max(100),
  type: requiredString.refine(
    value => jobTypes.includes(value),
    "Invalid job type"
  ),
  companyName: requiredString.max(100),
  companyLogo: companyLogoSchema,
  description: z.string().max(5000).optional(),
  salary: numericRequiredString.max(9, "Number can't be longer than 9 digits"),  
})
.and(applicationSchema)
.and(locationSchema)

export type JobCreateValues = z.infer<typeof jobCreateSchema>