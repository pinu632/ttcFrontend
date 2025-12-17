"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandInput } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/Axios/axiosInstance";

const ROLE_OPTIONS = ["Lead", "Support", "Volunteer"];

export function CoordinatorSelector({ onChange }: { onChange: (data: any[]) => void }) {
    // List of all students fetched from backend
    const [students, setStudents] = useState<any[]>([]);

    // Selected coordinators: { studentId, name, role }
    const [selected, setSelected] = useState<
        { student: string; name: string; role: string }[]
    >([]);

    // For opening popover
    const [open, setOpen] = useState(false);

    // Fetch students from backend
    useEffect(() => {
        const getCoordinatorList = async () => {
            const res = await api.post('/student/list', {
                filter: {
                    role: { $in: ["Member"] }
                },
                selectFrom: "name _id rollNo class"
            })
            if (res.data.success && res.data.data.students.length > 0) {
                setStudents(res.data.data.students)
            }
        }
        getCoordinatorList()
    }, []);

    // Add student as coordinator with default role
    const addCoordinator = (s: any) => {
        if (selected.find((x) => x.student === s._id)) return;

        const newList = [
            ...selected,
            { student: s._id, name: s.name, role: "Support" },
        ];

        setSelected(newList);
        onChange(newList); // send to parent form
        setOpen(false);
    };

    // Remove coordinator
    const removeCoordinator = (id: string) => {
        const newList = selected.filter((c) => c.student !== id);
        setSelected(newList);
        onChange(newList);
    };

    // Change role for a coordinator
    const updateRole = (studentId: string, role: string) => {
        const newList = selected.map((c) =>
            c.student === studentId ? { ...c, role } : c
        );
        setSelected(newList);
        onChange(newList);
    };

    return (
        <div className="space-y-2">
            {/* Selected Coordinators */}
            <div className="flex flex-wrap gap-2">
                {selected.map((c) => (
                    <Badge
                        key={c.student}
                        variant="secondary"
                        className="flex items-center gap-2 bg-green-200 dark:bg-violet-400 text-black"
                    >
                        {/* Single Popover only for changing role */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <span className="cursor-pointer flex items-center gap-1">
                                    {c.name} — {c.role}
                                </span>
                            </PopoverTrigger>

                            <PopoverContent className="w-40 p-1">
                                {ROLE_OPTIONS.map((role) => (
                                    <div
                                        key={role}
                                        className={cn(
                                            "cursor-pointer px-2 py-1 rounded-md hover:bg-accent",
                                            c.role === role && "bg-accent font-medium"
                                        )}
                                        onClick={() => updateRole(c.student, role)}
                                    >
                                        {role}
                                    </div>
                                ))}
                            </PopoverContent>
                        </Popover>

                        {/* DELETE BUTTON (Now works) */}
                        <button onClick={(e) => {
                            console.log('clicking...')
                            e.stopPropagation()
                            removeCoordinator(c.student)
                        }}>
                            <X
                                className="h-3 w-3 cursor-pointer hover:text-red-600"

                            />
                        </button>
                    </Badge>
                ))}
            </div>


            {/* Add Coordinator Button */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline">Add Coordinator</Button>
                </PopoverTrigger>

                <PopoverContent className="w-72 p-0">
                    <Command>
                        <CommandInput placeholder="Search student..." />
                        <CommandGroup>
                            {students.map((s) => (
                                <CommandItem
                                    key={s._id}
                                    onSelect={() => addCoordinator(s)}
                                >
                                    {s.name} ({s.rollNo})
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
