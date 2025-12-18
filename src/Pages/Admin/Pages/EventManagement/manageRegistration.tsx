"use client";

import { useEffect, useState } from "react";
import api from "@/Axios/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Download } from "lucide-react";

// ---------------- Types ----------------
interface Event {
  _id: string;
  name: string;
  scheduled_date: string;
}

interface Student {
  _id: string;
  name: string;
  rollNo: string;
  class: string;
  course?: string;
  profilePic?: string;
}

interface Registration {
  _id: string;
  status: string;
  attendanceMarked: boolean;
  certificateIssued: boolean;
  studentId: Student;
}

// ---------------- Component ----------------
export default function RegistrationAttendanceManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingRegs, setLoadingRegs] = useState(false);

  // -------- Fetch events --------
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoadingEvents(true);
        const res = await api.post("/event/list", {
          filter: {},
          pageNum: 1,
          pageSize: 100,
        });
        setEvents(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  // -------- Fetch registrations --------
  const fetchRegistrations = async (eventId: string) => {
    try {
      setLoadingRegs(true);
      const res = await api.post("/registration/list", {
        filter: { eventId },
        populate: {
          path: "studentId",
          select: "name rollNo class course profilePic",
        },
      });
      setRegistrations(res.data.data.registrations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRegs(false);
    }
  };

  // -------- Toggle attendance --------
  const toggleAttendance = async (studentId: string, regId: string, value: boolean) => {
    try {
      setRegistrations((prev) =>
        prev.map((r) =>
          r._id === regId ? { ...r, attendanceMarked: value } : r
        )
      );

      await api.post(`/registration/mark-attendance`, {
       eventId: selectedEvent,
       studentId:studentId
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- CSV DOWNLOAD ----------------
  const downloadCSV = () => {
    if (!registrations.length) return;

    const headers = [
      "#",
      "Name",
      "Roll No",
      "Class",
      "Course",
      "Status",
      "Attendance",
      "Certificate Issued",
    ];

    const rows: any[] = [headers];

    registrations.forEach((reg, index) => {
      rows.push([
        index + 1,
        reg.studentId?.name || "",
        reg.studentId?.rollNo || "",
        reg.studentId?.class || "",
        reg.studentId?.course || "",
        reg.status || "",
        reg.attendanceMarked ? "Present" : "Absent",
        reg.certificateIssued ? "Yes" : "No",
      ]);
    });

    const csvContent = rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "event-registrations.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto max-w-7xl px-6 py-10">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Event Registrations & Attendance
            </CardTitle>
            {selectedEvent && (
              <p className="text-sm text-muted-foreground mt-1">
                Total Registrations:{" "}
                <span className="font-semibold">
                  {registrations.length}
                </span>
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Select
              value={selectedEvent}
              onValueChange={(val) => {
                setSelectedEvent(val);
                fetchRegistrations(val);
              }}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue
                  placeholder={
                    loadingEvents ? "Loading events..." : "Select an event"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {events.map((event) => (
                  <SelectItem key={event._id} value={event._id}>
                    {event.name} –{" "}
                    {new Date(event.scheduled_date).toLocaleDateString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={downloadCSV}
              disabled={!registrations.length}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loadingRegs ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Fetching registrations...
            </div>
          ) : registrations.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              Select an event to view registered students
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Attendance</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {registrations.map((reg) => (
                  <TableRow key={reg._id}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={reg.studentId?.profilePic} />
                        <AvatarFallback>
                          {reg.studentId?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {reg.studentId?.name}
                      </span>
                    </TableCell>

                    <TableCell>{reg.studentId?.rollNo}</TableCell>
                    <TableCell>{reg.studentId?.class}</TableCell>

                    <TableCell>
                      <Badge variant="secondary">{reg.status}</Badge>
                    </TableCell>

                    <TableCell className="text-center">
                      <Checkbox
                        checked={reg.attendanceMarked}
                        className="bg-primary/30"
                        onCheckedChange={(val) =>
                          toggleAttendance(reg.studentId._id, reg._id,Boolean(val))
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
