"use client";

import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../../components/common/ComponentCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useEffect, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/Axios/axiosInstance";
import { toast } from "react-toastify";

interface FormData {
    name: string;
    rollNo: string;
    phone: string;
    email: string;
    password: string;
    course: string;
    semester: string;
    class: string;
    profilePic: string;
    role: string[];
    status: string;
}

interface ErrorsState {
    [key: string]: string;
}

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import ImageUploadDialog from "@/components/Uploder/uploader";
import { Card } from "@/components/ui/card";
import BulkStudentUploadDrawer from "./AddBulkStudentDrawer";

export default function AddStudent() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [profilePic, setProfilePic] = useState(null)
    const fileRef = useRef<HTMLInputElement | null>(null)

    const [formData, setFormData] = useState<FormData>({
        name: "",
        rollNo: "",
        phone: "",
        email: "",
        password: "",
        course: "",
        semester: "",
        class: "",
        profilePic: "",
        role: ["Student"],
        status: "Active",
    });

    useEffect(() => {


        setFormData((prev: FormData): FormData => ({
            ...prev,
            profilePic: profilePic || ""
        }));
    }, [profilePic]);


    const [errors, setErrors] = useState<any>({});

    const validateField = (id: string, value: string) => {
        let err = "";

        switch (id) {
            case "name":
                if (!value.trim()) err = "Name is required";
                break;

            case "rollNo":
                if (!value.trim()) err = "Roll number is required";
                break;

            case "phone":
                if (!/^[0-9]{10}$/.test(value)) err = "Phone must be 10 digits";
                break;

            case "email":
                if (!/\S+@\S+\.\S+/.test(value)) err = "Invalid email";
                break;

            case "password":
                if (value.length < 6) err = "Password must be ≥ 6 characters";
                break;

            case "course":
                if (!value.trim()) err = "Course is required";
                break;

            case "semester":
                if (!value.trim()) err = "Semester is required";
                break;

            case "class":
                if (!value.trim()) err = "Class is required";
                break;


        }

        setErrors((prev: any) => ({ ...prev, [id]: err }));
    };

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        if (id === "phone" && value.length > 10) return;

        setFormData({ ...formData, [id]: value });
        validateField(id, value);
    };

    const validateForm = () => {
        const { profilePic, ...rest } = formData;
        return Object.values(errors).every((e) => e === "") &&
            Object.values(rest).every((v) => String(v).trim() !== "");
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.error("Fix errors before submitting");
            return;
        }

        setLoading(true);
        try {
            const res = await api.post("/student", {
                ...formData,
                isVerified: false,
            });

            if (res.data.success) {
                toast.success("Student added!");
                navigate("/student-list");
            } else {
                toast.error(res.data.message);
            }
        } catch {
            toast.error("Error adding student");
        }
        setLoading(false);
    };

    return (
        <div className="w-full">

            <PageBreadcrumb pageTitle="Add Student" />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                {/* LEFT SECTION */}
                <div className="space-y-6">

                    <BulkStudentUploadDrawer />
                    {/* --- Student Details Card --- */}
                    <ComponentCard title="Student Details" className="border-none bg-transparent" buttonReq={false}>
                        <div className="space-y-6 text-foreground">

                            <div
                                onClick={() => fileRef.current?.click()}
                                className="
                                         group
                                         h-[200px] w-[150px]
                                         flex flex-col items-center justify-center
                                         rounded-xl border border-dashed border-muted-foreground/40
                                         cursor-pointer transition
                                         hover:border-primary hover:bg-primary/5
                                       "
                            >
                                {profilePic ? (
                                    <img
                                        src={profilePic}
                                        alt="profile pic"
                                        className="h-full w-auto object-cover rounded-lg shadow-sm"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-center">
                                        <UploadCloud className="w-8 h-8 text-muted-foreground group-hover:text-primary transition" />
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Upload profile picture
                                        </p>
                                        <p className="text-[10px] text-muted-foreground/70 mt-1">
                                            PNG, JPG • Max 5MB
                                        </p>
                                    </div>
                                )}
                            </div>



                            <ImageUploadDialog
                                //@ts-ignore
                                setImgUrl={setProfilePic}
                                className="hidden"
                                //@ts-ignore
                                triggerRef={fileRef} />

                            <div className="space-y-1">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-input border-border"
                                />
                                {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="rollNo">Roll Number</Label>
                                <Input
                                    id="rollNo"
                                    placeholder="Enter roll number"
                                    value={formData.rollNo}
                                    onChange={handleChange}
                                    className="bg-input border-border"
                                />
                                {errors.rollNo && <p className="text-destructive text-sm">{errors.rollNo}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    placeholder="96931XXXXX"
                                    maxLength={10}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="bg-input border-border"
                                />
                                {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="course">Course</Label>
                                <Input
                                    id="course"
                                    placeholder="B.Tech CSE"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className="bg-input border-border"
                                />
                                {errors.course && <p className="text-destructive text-sm">{errors.course}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label>Semester</Label>
                                <Select
                                    onValueChange={(value) => {
                                        setFormData({ ...formData, semester: value });
                                        validateField("semester", value);
                                    }}
                                >
                                    <SelectTrigger className="w-full bg-input border-border rounded-xl">
                                        <SelectValue placeholder="Select semester" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-popover border-border">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                            <SelectItem key={sem} value={String(sem)}>
                                                {sem}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.semester && <p className="text-destructive text-sm">{errors.semester}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="class">Class</Label>
                                <Input
                                    id="class"
                                    placeholder="C8"
                                    value={formData.class}
                                    onChange={handleChange}
                                    className="bg-input border-border"
                                />
                                {errors.class && <p className="text-destructive text-sm">{errors.class}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="profilePic">Profile Picture URL</Label>
                                <Input
                                    id="profilePic"
                                    placeholder="https://..."
                                    value={formData.profilePic}
                                    onChange={handleChange}
                                    className="bg-input border-border"
                                />
                                {errors.profilePic && (
                                    <p className="text-destructive text-sm">{errors.profilePic}</p>
                                )}
                            </div>

                        </div>
                    </ComponentCard>

                    {/* --- Login Credentials Card --- */}
                    <ComponentCard title="Login Credentials" className="border-none bg-transparent" buttonReq={false}>
                        <div className="space-y-6 text-foreground">

                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Enter student email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-input border-border"
                                />
                                {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-input border-border"
                                />
                                {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
                            </div>

                        </div>
                    </ComponentCard>

                    {/* --- Submit Button --- */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !validateForm()}
                        className={`mt-4 w-full py-3 rounded-xl text-white font-medium shadow-md transition 
              ${loading || !validateForm()
                                ? "bg-primary/50 text-muted-foreground cursor-not-allowed"
                                : "bg-primary hover:bg-primary/90"
                            }`}
                    >
                        {loading ? "Saving..." : "Add Student"}
                    </button>

                </div>
            </div>
        </div>
    );
}
