"use client";
import moment from "moment";

import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, ArrowRight, Clock, Recycle, Loader2, CheckCircle } from "lucide-react";
import api from "@/Axios/axiosInstance";
import { useAppSelector } from "@/store/hook";
import LoginDialog from "../LogInModal/login";
import { toast } from 'react-toastify'

const formatTime = (time: string) => {

  const [hours, minutes] = time.split(":")
  const date = new Date(); // Creates a Date object for the current date
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));
  return moment(date).format("h:mm A")
}
export interface EventData {
  _id: string;
  name: string;
  poster_link: string;
  description: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  type?: string;
}

// export interface EventRule {
//   round: number;
//   instructions: string;
// }


// export interface EventData {
//   _id: string;
//   name: string;
//   type: string; // e.g., "Tech", "Non Tech"
//   scheduled_date: string; // ISO date string from backend
//   start_time: string; // "13:30"
//   end_time: string;   // "15:30"
//   poster_link: string;

//   rules: EventRule[]; // parsed version of your JSON string

//   coordinators: string[]; // if coordinator objects exist, I can update this

//   venue: string;
//   description: string;
//   status: string; // e.g., "Upcoming", "Completed"

//   created_at: string;
//   updated_at: string;
// }


export default function EventsPage() {
  const [tab, setTab] = useState("upcoming");
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeringId, setRegisteringId] = useState<string | null>(null);

  const user = useAppSelector(s => s.auth.user)
  // const [isRegistered, setIsRegistered] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registeredEvent, setRegisteredEvent] = useState<any>(null)

  useEffect(() => {
    console.log(registeredEvent)
  }, [registeredEvent])


  useEffect(() => {
    fetchEvents();
    getRegisteredEvents()
  }, []);

  const handleKnowMore = (id: string) => {

    if (!id) return;
    window.location.href = `/event/${id}`
  }

  const isRegistered = (eventId: string) => {
    return registeredEvent?.includes(eventId);
  };


  const handleRegistration = async (eventId: string) => {
    if (!user) {
      setLoginOpen(true);
      return;
    }

    if (registeringId) return;

    try {
      setRegisteringId(eventId);

      await api.post("/registration", {
        eventId,
        studentId: user.id,
      });

      toast.success("🎉 Successfully registered!");

      // ✅ update local state instantly
      //@ts-ignore
      setRegisteredEvent(prev => [...prev, eventId]);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setRegisteringId(null);
    }
  };


  const getRegisteredEvents = async () => {
    if (!user?.id) return;

    try {


      const res = await api.post("/registration/list", {
        filter: {
          studentId: user.id,
        },
        select: "_id eventId",
      });


      const registrations = res?.data?.data?.registrations || [];

      // extract event ids (or registration ids if backend returns those)
      const eventIds = registrations.map((item: any) => item.eventId);

      setRegisteredEvent(eventIds);

    } catch (error) {
      console.error("Failed to fetch registered events", error);
      setRegisteredEvent([]);
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/event/list', {
        filter: {},
        select: "name poster_link description scheduled_date start_time end_time venue type -coordinators"
      });

      // Assuming backend response structure:
      // { data: [ ...events ] }
      const events: EventData[] = res.data?.data || [];

      setEventData(events);

    } catch (error: any) {
      console.error("Failed to fetch events", error);
      setError("Unable to load events.");
    } finally {
      setLoading(false);
    }
  };


  const renderEventCard = (event: EventData, isUpcoming: boolean) => (
    <Card
      key={event._id}
      className="
        rounded-2xl 
        border border-border 
        bg-card
        dark:bg-card/40
        backdrop-blur-xl 
        shadow-md
        hover:shadow-xl 
        p-0
        hover:-translate-y-1
        transition-all duration-300
        overflow-hidden
      "
    >
      <div className="h-full flex flex-col md:flex-row">
        {/* Poster */}
        <div className="md:w-1/3 w-full h-full">
          <img
            src={event.poster_link}
            alt={event.name}
            className="w-full h-48 md:h-full object-cover rounded-t-2xl md:rounded-none md:rounded-l-2xl"
          />
        </div>

        {/* Content */}
        <div className="md:w-2/3 w-full flex flex-col justify-between">
          <div className="p-6 pb-4">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {event.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
              {event.description}
            </p>
          </div>

          {/* Info */}
          <CardContent className="p-6 pt-4 flex flex-col  justify-between gap-6  border-t border-border/50">
            {/* Details */}
            <div className="flex flex-col  text-sm">

              {/* Date */}
              <div className="flex items-center gap-3 w-full">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CalendarDays size={16} className="text-primary" />
                </div>
                <span className="text-muted-foreground font-medium">{moment(event.scheduled_date).format("DD MMMM YYYY")}</span>
              </div>

              {/* Time */}
              {event.start_time && (
                <div className="flex items-center gap-3 ">
                  <div className="w-9 h-9 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Clock size={16} className="text-yellow-500" />
                  </div>
                  <span className="text-muted-foreground font-medium">{formatTime(event.start_time) + " - " + formatTime(event.end_time)}</span>
                </div>
              )}

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <MapPin size={16} className="text-blue-500" />
                </div>
                <span className="text-muted-foreground font-medium">{event.venue}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              {isUpcoming && (
                <Button
                  onClick={() => handleRegistration(event._id)}
                  disabled={registeringId === event._id || isRegistered(event._id)}
                  className={`flex items-center gap-2 ${isRegistered(event._id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700"
                    }`}
                >
                  {registeringId === event._id && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}

                  {isRegistered(event._id) ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Registered
                    </>
                  ) : registeringId === event._id ? (
                    "Registering..."
                  ) : (
                    "Register"
                  )}
                </Button>


              )}

              <Button
                onClick={() => {
                  handleKnowMore(event._id)
                }}
                variant="outline" className="flex items-center gap-2">
                Know More
                <ArrowRight size={16} />
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="opacity-70 hover:opacity-100">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">Events</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Heading */}
      <div className="mt-4 mb-10  space-y-3">
        <h1 className="text-4xl md:text-[10vw] font-bold text-foreground tracking-tight">
          Events
        </h1>

      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid grid-cols-2 bg-accent/20 rounded-xl p-1">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="archive">Event Archive</TabsTrigger>
        </TabsList>

        {/* Upcoming Events */}
        <TabsContent value="upcoming" className="mt-10">
          {eventData.length ? (
            <div className="grid md:grid-cols-2 gap-8">
              {eventData.map((event) => renderEventCard(event, true))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground mt-20 text-lg">
              No upcoming events.
            </p>
          )}
        </TabsContent>

        {/* Archive */}
        {/* <TabsContent value="archive" className="mt-10">
          {eventsData.archive.length ? (
            <div className="grid md:grid-cols-2 gap-8">
              {eventsData.archive.map((event) => renderEventCard(event, false))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground mt-20 text-lg">
              No past events available.
            </p>
          )}
        </TabsContent> */}
      </Tabs>
      <LoginDialog open={loginOpen} setOpen={setLoginOpen} />
    </div>
  );
}
