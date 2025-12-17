"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import api from "@/Axios/axiosInstance";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";

interface EventType {
  _id: string;
  name: string;
  type: string;
  scheduled_date: string;
  start_time: string;
  end_time?: string;
  rules?:string,
  venue: string;
  poster_link?: string;
  status: "Upcoming" | "Ongoing" | "Completed" | "Active";
  coordinators: {
    student: any;
    role: "Lead" | "Support" | "Volunteer";
  }[];
  created_at: string;
}

export default function EventTable() {
  const [events, setEvents] = useState<EventType[]>([
    {
      "_id": "674fc91e8d11a001a2b79902",
      "name": "Cultural Singing Competition",
      "type": "Non Tech",
      "scheduled_date": "2024-12-05T00:00:00.000Z",
      "start_time": "14:30",
      "end_time": "17:00",
      "poster_link": "https://example.com/posters/singing-comp.jpg",
      "rules": "Solo only. No vulgar or offensive content.",
    
      "coordinators": [
        {
          "student": {
            "_id": "67311057c771ab3b2bf90c11",
            "name": "Rohan Singh",
            "rollno": "22411012"
          },
          "role": "Lead"
        },
        {
          "student": {
            "_id": "67311057c771ab3b2bf90c12",
            "name": "Simran Kaur",
            "rollno": "22411088"
          },
          "role": "Volunteer"
        }
      ],

      "venue": "Open Auditorium",
      "status": "Completed",
      "created_at": "2024-11-20T09:30:00.000Z",
    }

  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.post("/event/list",{
          filter:{}
        });
        setEvents(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const deleteEvent = async (id: string) => {
    try {
      const res = await api.delete(`/event/${id}`);
      if (res.data.success) {
        toast.success("Event deleted");
        setEvents(events.filter((e) => e._id !== id));
      }
    } catch {
      toast.error("Failed to delete event");
    }
  };

  const getStatusBadge = (status: EventType["status"]) => {
    switch (status) {
      case "Upcoming":
        return <Badge variant="secondary">Upcoming</Badge>;
      case "Ongoing":
        return <Badge variant="default">Ongoing</Badge>;
      case "Completed":
        return (
          <Badge className="bg-green-600 text-white">Completed</Badge>
        );
      case "Active":
        return (
          <Badge className="bg-primary text-primary-foreground">Active</Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading)
    return <p className="p-4 text-muted-foreground text-sm">Loading events...</p>;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/40">
            
              <TableHead>Event Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Coordinators</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {events.map((ev) => (
              <TableRow key={ev._id} className="border-b border-border">
                {/* Poster */}
                {/* <TableCell> */}
                  {/* <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                    {ev.poster_link ? (
                      <img
                        src={ev.poster_link}
                        alt="poster"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
                        N/A
                      </div>
                    )}
                  </div>
                </TableCell> */}

                {/* Name */}
                <TableCell className="font-medium text-foreground">
                  {ev.name}
                </TableCell>

                {/* Type */}
                <TableCell className="text-muted-foreground">
                  {ev.type}
                </TableCell>

                {/* Date */}
                <TableCell>
                  {new Date(ev.scheduled_date).toLocaleDateString()}
                </TableCell>

                {/* Time */}
                <TableCell>
                  {ev.start_time}
                  {ev.end_time ? ` - ${ev.end_time}` : ""}
                </TableCell>

                {/* Venue */}
                <TableCell>{ev.venue || "—"}</TableCell>

                {/* Status */}
                <TableCell>{getStatusBadge(ev.status)}</TableCell>

                {/* Coordinators count */}
                <TableCell>{ev.coordinators?.length || 0}</TableCell>

                {/* Created_at */}
                <TableCell>
                  {new Date(ev.created_at).toLocaleDateString()}
                </TableCell>

                {/* Action */}
                <TableCell className="text-right flex gap-2 justify-end">
                  {/* Edit */}
                  <button
                    onClick={() =>
                      (window.location.href = `/event/edit/${ev._id}`)
                    }
                    className="h-9 w-9 rounded-full flex items-center justify-center border border-border hover:bg-muted transition"
                  >
                   <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.127 19.586a4.5 4.5 0 01-1.591 1.045l-3.386 1.268 1.268-3.386a4.5 4.5 0 011.045-1.591L16.862 3.487z"
                      />
                    </svg>
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteEvent(ev._id)}
                    className="h-9 w-9 rounded-full flex items-center justify-center border border-red-400 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 7h12M9 7V4h6v3m1 0v12a2 2 0 01-2 2H9a2 2 0 01-2-2V7h10z"
                      />
                    </svg>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
