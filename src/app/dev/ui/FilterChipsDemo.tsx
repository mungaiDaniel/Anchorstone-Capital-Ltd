"use client";

import { useState } from "react";
import { FilterChips } from "@/components/ui/FilterChips";

export function FilterChipsDemo() {
  const [value, setValue] = useState("All");
  return <FilterChips label="Demo filter" options={["All", "Personal", "Vehicle", "Business"]} value={value} onChange={setValue} />;
}
