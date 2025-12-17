"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateTimeRangePickerProps {
  date?: Date | undefined;
  onDateChange?: (date: Date | undefined) => void;

  startTime?: string;
  endTime?: string;

  onStartTimeChange?: (time: string) => void;
  onEndTimeChange?: (time: string) => void;

  label?: string;
  className?: string;
}

export default function DateTimeRangePicker({
  date,
  onDateChange,

  startTime = "",
  endTime = "",
  onStartTimeChange,
  onEndTimeChange,

  label = "Event Date & Time",
  className = "",
}: DateTimeRangePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Date */}
      <div className="flex w-full flex-col gap-3">
        <Label htmlFor="date" className="px-1">
          {label}
        </Label>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" id="date" className="w-full justify-between font-normal">
              {date ? date.toLocaleDateString() : "Pick a date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                onDateChange?.(d);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Range */}
      <div className="flex gap-4">
        {/* Start Time */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-from" className="px-1">
            From
          </Label>
          <Input
            type="time"
            id="time-from"
            value={startTime}
            onChange={(e) => onStartTimeChange?.(e.target.value)}
            className="bg-background appearance-none 
              [&::-webkit-calendar-picker-indicator]:hidden 
              [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>

        {/* End Time */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-to" className="px-1">
            To
          </Label>
          <Input
            type="time"
            id="time-to"
            value={endTime}
            onChange={(e) => onEndTimeChange?.(e.target.value)}
            className="bg-background appearance-none 
              [&::-webkit-calendar-picker-indicator]:hidden 
              [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}
