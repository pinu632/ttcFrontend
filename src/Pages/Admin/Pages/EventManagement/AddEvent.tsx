"use client";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../../components/common/ComponentCard";
import { toast } from "react-toastify";
import api from "@/Axios/axiosInstance";
import ImageUploadDialog from "@/components/Uploder/uploader";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, Plus, Trash } from "lucide-react";
import DateTimeRangePicker from "@/components/ui/dateTimeRangePicker";
import moment from "moment";
import { CoordinatorSelector } from "./components/addCoordinator";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [poster, setPoster] = useState(null);
  const [posterId, setPosterId] = useState(null)
  const [coordinators, setCoordinators] = useState<any[]>([])
  const fileRef = useRef<HTMLInputElement | null>(null);

  console.log(posterId)




  const [formData, setFormData] = useState({
    name: "",
    type: "",
    scheduled_date: moment().day(2 + 7).toDate(),
    start_time: "13:30",
    end_time: "14:30",
    poster_link: "",
    description: "",
    venue: "",
    status: "Upcoming",
  });

  // ----------- Multi-round Rules -------------
  const [rules, setRules] = useState([{ round: 1, instructions: "" }]);

  const addRuleRound = () => {
    setRules([...rules, { round: rules.length + 1, instructions: "" }]);
  };

  const removeRound = (idx: number) => {
    const updated = rules.filter((_, i) => i !== idx);
    setRules(updated.map((r, i) => ({ ...r, round: i + 1 })));
  };

  const updateRule = (idx: number, value: string) => {
    const updated = [...rules];
    updated[idx].instructions = value;
    setRules(updated);
  };

  // Set uploaded poster URL into formData
  useEffect(() => {
    if (poster) {
      setFormData((prev) => ({ ...prev, poster_link: poster }));
    }
  }, [poster]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleChangeByFieldName = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!formData.poster_link) {
      toast.error("Please upload event poster");
      return;
    }

    if (!formData.name.trim()) return toast.error("Event name required");

    setLoading(true);
    try {
      const res = await api.post("/event", {
        ...formData,
        rules: JSON.stringify(rules),
        coordinators
      });



      if (res.data.success) {
        if (!res?.data?.data?._id) throw new Error("data not found")
          //@ts-ignore
        const saveImgMeta = await api.post("/media/update", {
          id: posterId,
          event: res?.data?._id,
          type: "Event Poster"
        })
        toast.success("Event created!");
        navigate("/event-list");
      } else toast.error(res.data.message);
    } catch {
      toast.error("Error creating event");
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      <PageBreadcrumb pageTitle="Create Event" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCard title="Event Details" className="border-none bg-transparent" buttonReq={false}>
            <div className="space-y-6">

              {/* Poster Upload */}
              <div
                onClick={() => fileRef.current?.click()}
                className="group h-[200px] w-[160px] rounded-xl border border-dashed
                flex flex-col justify-center items-center cursor-pointer transition
                hover:border-primary hover:bg-primary/10"
              >
                {poster ? (
                  <img
                    src={poster}
                    className="h-full w-auto object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <UploadCloud className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                    <p className="text-sm mt-2">Upload Event Poster</p>
                    <p className="text-xs opacity-60">PNG, JPG • Max 5MB</p>
                  </div>
                )}
              </div>

              <ImageUploadDialog
                //@ts-ignore
                setImgUrl={setPoster}
                //@ts-ignore
                setImgId={setPosterId}
                //@ts-ignore
                triggerRef={fileRef}
                className="hidden"
              />

              {/* Event Name */}
              <div className="space-y-1">
                <Label>Event Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="AI & ML Workshop"
                />
              </div>

              {/* Type */}
              <div className="space-y-1">
                <Label>Event Type</Label>
                <Select
                  onValueChange={(v) => setFormData({ ...formData, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Tech">Tech</SelectItem>
                    <SelectItem value="Non Tech">Non Tech</SelectItem>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                    <SelectItem value="Expert Talk">Expert Talk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              {/* <div className="space-y-1">
                <Label>Event Date</Label>
                <Input
                  id="scheduled_date"
                  type="date"
                  value={formData.scheduled_date}
                  onChange={handleChange}
                />
              </div> */}

              {/* Time */}
              {/* <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Start Time</Label>
                  <Input
                    id="start_time"
                    type="time"
                    value={formData.start_time}
                    onChange={handleChange}
                  />
                </div> */}

              {/* <div className="space-y-1">
                  <Label>End Time</Label>
                  <Input
                    id="end_time"
                    type="time"
                    value={formData.end_time}
                    onChange={handleChange}
                  />
                </div>
              </div> */}

              <DateTimeRangePicker
                date={formData.scheduled_date}
                onDateChange={(val) => handleChangeByFieldName("scheduled_date", val)}

                startTime={formData.start_time}
                endTime={formData.end_time}
                onStartTimeChange={(val) => handleChangeByFieldName("start_time", val)}
                onEndTimeChange={(val) => handleChangeByFieldName("end_time", val)}
              />
              <CoordinatorSelector
                onChange={(val) => setCoordinators(val)}
                
              />

              {/* Venue */}
              <div className="space-y-1">
                <Label>Venue</Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Auditorium, Block A"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Short description about the event..."
                />
              </div>
            </div>
          </ComponentCard>

          {/* ----- Rules Section ----- */}
          <ComponentCard title="Event Rules (Rounds)" className="border-none bg-transparent" buttonReq={false}>
            <div className="space-y-4">
              {rules.map((r, idx) => (
                <div key={idx} className="relative p-4 border rounded-xl space-y-2 bg-card">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">Round {r.round}</h3>

                    {rules.length > 1 && (
                      <Trash
                        className="w-4 h-4 cursor-pointer text-red-500"
                        onClick={() => removeRound(idx)}
                      />
                    )}
                  </div>

                  <Textarea
                    placeholder={`Rules for Round ${r.round}`}
                    value={r.instructions}
                    //@ts-ignore
                    onChange={(e) => updateRule(idx, e.target.value)}
                  />
                </div>
              ))}

              <button
                onClick={addRuleRound}
                className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg"
              >
                <Plus className="w-4 h-4" /> Add Round
              </button>
            </div>
          </ComponentCard>

          {/* ----- Submit ----- */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-4 w-full py-3 rounded-xl font-medium text-white 
              ${loading ? "bg-primary/50" : "bg-primary hover:bg-primary/90"}
          `}
          >
            {loading ? "Saving..." : "Create Event"}
          </button>
        </div>
      </div >
    </div >
  );
}
