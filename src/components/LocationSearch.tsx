"use client";

import React, { useMemo, useState } from "react";
import { Input } from "./ui/input";
import citiesList from "@/lib/cities-list";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export const LocationSearch = React.forwardRef<HTMLInputElement, IProps>(
  ({ onLocationSelected, ...props }, ref) => {
    const [locationSearchInput, setlocationSearchInput] = useState<string>("");

    const cities = useMemo(() => {
      if (!locationSearchInput.trim()) return [];

      const searchWords = locationSearchInput.split(" ");

      return citiesList
        .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLowerCase().includes(word.toLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [locationSearchInput]);

    return (
      <div>
        <Input
          value={locationSearchInput}
          onChange={(e) => setlocationSearchInput(e.target.value)}
          {...props}
          ref={ref}
        />
        <div>{JSON.stringify(cities)}</div>
        <div>
          input: {locationSearchInput}
          {locationSearchInput.trim() && <span>{locationSearchInput}</span>}
        </div>
      </div>
    );
  },
);
