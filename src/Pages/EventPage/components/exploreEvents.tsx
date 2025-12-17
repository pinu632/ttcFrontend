"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import api from "@/Axios/axiosInstance";
import moment from "moment";
import { CalendarDays, MapPin, Clock, Users, ClipboardList } from "lucide-react";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await api.get(`/event/${id}`);
        setEvent(res.data.data);
      } catch (err) {
        console.error("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <div className="p-6 text-lg">Loading event...</div>;
  if (!event) return <div className="p-6 text-lg text-red-500">Event not found.</div>;

  const rules = JSON.parse(event.rules || "[]"); // Parse rules JSON

  return (
    <div className="max-w-4xl mx-auto px-5 py-10 space-y-10">

      {/* ---------- TITLE SECTION ---------- */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {event.name}
          </h1>
          <p className="text-muted-foreground text-lg">{event.type} Event</p>
        </div>

        <Button
          onClick={() => window.open(event.registrationLink || "#", "_blank")}
          className="bg-primary text-primary-foreground hover:opacity-90 px-6"
        >
          Register
        </Button>
      </div>

      {/* ---------- METADATA SECTION ---------- */}
      <Card className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-muted-foreground">

        {/* TYPE */}
        <div className="flex items-center gap-3">
          <ClipboardList className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">{event.type}</p>
            <p className="text-xs">Event Type</p>
          </div>
        </div>

        {/* DATE */}
        <div className="flex items-center gap-3">
          <CalendarDays className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">
              {moment(event.scheduled_date).format("MMMM DD, YYYY")}
            </p>
            <p className="text-xs">Event Date</p>
          </div>
        </div>

        {/* TIME */}
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">
              {event.start_time} - {event.end_time}
            </p>
            <p className="text-xs">Event Timing</p>
          </div>
        </div>

        {/* VENUE */}
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">{event.venue}</p>
            <p className="text-xs">Location</p>
          </div>
        </div>

        {/* COORDINATORS COUNT */}
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">{event.coordinators?.length || 0}</p>
            <p className="text-xs">Coordinators</p>
          </div>
        </div>

        {/* EVENT ID */}
        <div className="flex items-center gap-3">
          <ClipboardList className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">{event._id}</p>
            <p className="text-xs">Event ID</p>
          </div>
        </div>
      </Card>

      {/* ---------- POSTER --------
      <img
        src={event.poster_link}
        alt={event.name}
        className="w-full rounded-xl shadow-md"
      /> */}

      {/* ---------- DESCRIPTION (BLOG SECTION) ---------- */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">About the Event</h2>
        <p className="text-muted-foreground leading-relaxed">{event.description}</p>
      </section>

      {/* ---------- RULES SECTION ---------- */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">Event Rules</h2>

        {rules.map((round: any, idx: number) => (
          <div key={idx} className="bg-accent/20 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">Round {round.round}</h3>
            <pre className="whitespace-pre-wrap text-muted-foreground">
              {round.instructions}
            </pre>
          </div>
        ))}
      </section>

      {/* ---------- COORDINATORS SECTION ---------- */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">Event Coordinators</h2>

        {event.coordinators.map((c: any, idx: number) => (
          <p key={idx} className="text-muted-foreground">
            <strong>{c.name}</strong> — {c.role}
          </p>
        ))}
      </section>

      {/* ---------- WINNERS SECTION ---------- */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">Winners</h2>

        {event.winners?.length ? (
          <ul className="list-disc ml-5">
            {event.winners.map((winner: string, i: number) => (
              <li key={i}>{winner}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No winner data available.</p>
        )}
      </section>

      {/* ---------- REPORT SECTION ---------- */}
      <section className="space-y-3 pb-20">
        <h2 className="text-2xl font-semibold text-foreground">Event Report</h2>

        {event.report ? (
          <p className="text-muted-foreground">{event.report}</p>
        ) : (
          <p className="text-muted-foreground">No event report available.</p>
        )}
      </section>
    </div>
  );
}
