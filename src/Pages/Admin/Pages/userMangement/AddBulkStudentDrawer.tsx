import React, { useState } from "react";
import Papa from "papaparse";

import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import api from "@/Axios/axiosInstance";
import { toast } from "react-toastify";

export default function BulkStudentUploadSheet() {
    const [students, setStudents] = useState<any[]>([]);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);

    const getCourse = (c: string) => {
        if (!c) return;

        if (c.includes("C")) return "B. Tech CSE";
        if (c.includes("A")) return "B. Tech AI & ML";
        if (c.includes("I")) return "B. Tech IT";
        

        return "Unknown Course";
    };


    const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results: any) {
                const formatted = results.data.map((row: any) => ({
                    name: row.name || row.Name || "",
                    rollNo: row.rollno || row.RollNo || row.roll || "",
                    class: row.class || row.Class || row.section || "",
                    course: getCourse(row.class)
                }));

                setStudents(formatted);
            },
        });
    };

    const uploadBulk = async () => {
        try {
            setLoading(true);

            const res = await api.post("/student/bulk", {
                students: students,
            });

            toast.success("Students uploaded successfully!");

            // Reset state
            setStudents([]);
            setFileName("");

        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to upload students"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="default">Add Bulk Students</Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[420px] sm:w-[480px] p-4">
                <SheetHeader>
                    <SheetTitle>Bulk Student Upload</SheetTitle>
                    <SheetDescription>
                        Upload a CSV file to add multiple students
                    </SheetDescription>
                </SheetHeader>

                {/* Upload Input */}
                <div className="my-4">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleCSVUpload}
                        className="block text-sm"
                    />

                    {fileName && (
                        <p className="text-sm mt-1 text-muted-foreground">
                            File: {fileName}
                        </p>
                    )}
                </div>

                {/* Preview Table */}
                {students.length > 0 && (
                    <div className="border rounded-md max-h-72 overflow-y-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Roll No</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Course</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {students.map((s, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{s.name}</TableCell>
                                        <TableCell>{s.rollNo}</TableCell>
                                        <TableCell>{s.class}</TableCell>
                                        <TableCell>{s.course}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                <SheetFooter className="mt-4 flex gap-2">
                    <Button
                        onClick={uploadBulk}
                        disabled={students.length === 0 || loading}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full"></span>
                                Uploading...
                            </div>
                        ) : (
                            "Submit Students"
                        )}
                    </Button>

                    <SheetClose asChild>
                        <Button
                            onClick={() => setStudents([])}
                            variant="outline"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
