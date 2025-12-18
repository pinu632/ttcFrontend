"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import api from "@/Axios/axiosInstance";
import moment from "moment";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useAppSelector } from "@/store/hook";

export default function EventDetailsPage() {
  const { id: eventId } = useParams();
  const user = useAppSelector((state) => state.auth.user);

  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [checkingRegistration, setCheckingRegistration] = useState(true);
  //@ts-ignore
  const [loginOpen, setLoginOpen] = useState(false); // hook to login modal

  /* ---------------- FETCH EVENT ---------------- */
  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        const res = await api.get(`/event/${eventId}`);
        setEvent(res.data.data);
      } catch (err) {
        console.error("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  /* ---------------- CHECK REGISTRATION ---------------- */
  useEffect(() => {
    if (!user || !eventId) {
      setCheckingRegistration(false);
      return;
    }

    const checkRegistration = async () => {
      try {
        const res = await api.post("/registration/check", {
          studentId: user.id,
          eventId,
        });

        setIsRegistered(res.data.data?.isRegistered === true);
      } catch (error) {
        console.error("Failed to check registration");
      } finally {
        setCheckingRegistration(false);
      }
    };

    checkRegistration();
  }, [user, eventId]);

  /* ---------------- REGISTER ---------------- */
  const handleRegistration = async () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }

    if (!eventId || registeringId) return;

    try {
      setRegisteringId(eventId);

      await api.post("/registration", {
        eventId,
        studentId: user.id,
      });

      toast.success("🎉 Successfully registered!");
      setIsRegistered(true);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setRegisteringId(null);
    }
  };

  /* ---------------- STATES ---------------- */
  if (loading || checkingRegistration) {
    return <div className="p-6 text-lg">Loading event...</div>;
  }

  if (!event) {
    return (
      <div className="p-6 text-lg text-red-500">Event not found.</div>
    );
  }

  const rules = JSON.parse(event.rules || "[]");

  return (
    <div className="max-w-4xl mx-auto px-5 py-10 space-y-12">
      {/* ---------- TITLE SECTION ---------- */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">{event.name}</h1>
          <p className="text-muted-foreground text-lg">
            {event.type} Event
          </p>
        </div>

        <Button
          disabled={isRegistered || registeringId === eventId}
          onClick={handleRegistration}
          className="px-6"
        >
          {isRegistered ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Registered
            </>
          ) : registeringId === eventId ? (
            "Registering..."
          ) : (
            "Register"
          )}
        </Button>
      </div>

      {/* ---------- METADATA ---------- */}
      <Card className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-muted-foreground">
        <Meta icon={ClipboardList} title={event.type} label="Event Type" />
        <Meta
          icon={CalendarDays}
          title={moment(event.scheduled_date).format("MMMM DD, YYYY")}
          label="Event Date"
        />
        <Meta
          icon={Clock}
          title={`${event.start_time} - ${event.end_time}`}
          label="Event Timing"
        />
        <Meta icon={MapPin} title={event.venue} label="Location" />
        <Meta
          icon={Users}
          title={event.coordinators?.length || 0}
          label="Coordinators"
        />
        <Meta icon={ClipboardList} title={event._id} label="Event ID" />
      </Card>

      {/* ---------- DESCRIPTION ---------- */}
      <Section title="About the Event">
        <p className="text-muted-foreground leading-relaxed">
          {event.description}
        </p>
      </Section>

      {/* ---------- RULES ---------- */}
      <Section title="Event Rules">
        {rules.map((round: any, idx: number) => (
          <div key={idx} className="bg-accent/20 p-4 rounded-lg">
            <h3 className="font-semibold">Round {round.round}</h3>
            <pre className="whitespace-pre-wrap text-muted-foreground">
              {round.instructions}
            </pre>
          </div>
        ))}
      </Section>

      {/* ---------- COORDINATORS ---------- */}
      <Section title="Event Coordinators">
        {event.coordinators.map((c: any, idx: number) => (
          <p key={idx} className="text-muted-foreground">
            <strong>{c.name}</strong> — {c.role}
          </p>
        ))}
      </Section>

      {/* ---------- WINNERS ---------- */}
      <Section title="Winners">
        {event.winners?.length ? (
          <ul className="list-disc ml-5">
            {event.winners.map((winner: string, i: number) => (
              <li key={i}>{winner}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">
            No winner data available.
          </p>
        )}
      </Section>

      {/* ---------- REPORT ---------- */}
      <Section title="Event Report">
        <p className="text-muted-foreground">
          {event.report || "No event report available."}
        </p>
      </Section>

      {/* ---------- CTA / END SECTION ---------- */}
      <Card className="p-6 text-center bg-muted/30">
        {isRegistered ? (
          <>
            <CheckCircle2 className="w-10 h-10 mx-auto text-green-500 mb-3" />
            <h3 className="text-xl font-semibold">
              You’re registered 
            </h3>
            <p className="text-muted-foreground">
              We’ll notify you about updates and announcements.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-2">
              Interested in this event?
            </h3>
            <p className="text-muted-foreground mb-4">
              Register now to secure your participation.
            </p>
            <Button onClick={handleRegistration}>Register Now</Button>
          </>
        )}
      </Card>
    </div>
  );
}

/* ---------- REUSABLE SECTION ---------- */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

/* ---------- META ITEM ---------- */
function Meta({
  icon: Icon,
  title,
  label,
}: {
  icon: any;
  title: string | number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-primary" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-xs">{label}</p>
      </div>
    </div>
  );
}
