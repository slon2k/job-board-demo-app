import { FC } from "react";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import Image from "next/image";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Badge } from "./Badge";

interface IProps {
  job: Job;
}

export const JobListItem: FC<IProps> = ({
  job: { title, companyName, type, location, locationType, salary, createdAt },
}) => {
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:bg-muted/60">
      <Image
        src={companyLogoPlaceholder}
        alt={companyName}
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Banknote size={16} className="shrink-0" />
            {formatMoney(salary)}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" />
            {relativeDate(createdAt || Date.now() - 1000*3600*24  )}
          </p>          
        </div>
      </div>
      <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
        <Badge>{type}</Badge>
        <span>{relativeDate(createdAt || Date.now() - 1000*3600*24 )}</span>
      </div>
    </article>
  );
};
