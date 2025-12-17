"use client";

import { useState } from "react";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  label?: string;
  value?: Date | undefined;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export default function DatePicker({
  label,
  value,
  onChange,
  placeholder = "Pick a date",
  className = "",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {label && (
        <Label htmlFor="date" className="px-1">
          {label}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className="w-full justify-between font-normal"
          >
            <span className="flex items-center">
              <CalendarIcon className="mr-2" />
              {value ? value.toLocaleDateString() : placeholder}
            </span>
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
