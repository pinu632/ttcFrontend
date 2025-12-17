"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

import { useAppDispatch } from "@/store/hook";
import { toast } from "react-toastify";
import { loginUser } from "@/store/Slices/authSlice";

export default function LoginDialog({ open, setOpen }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(""); // ⭐ NEW ERROR STATE
  const dispatch = useAppDispatch();

  // Reset error when modal opens
  useEffect(() => {
    if (open) setError("");
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rollNo || !password) {
      const msg = "Please enter roll number and password";
      toast.error(msg);
      setError(msg);
      return;
    }

    const res = await dispatch(loginUser({ rollNo, password }));

    if (loginUser.fulfilled.match(res)) {
      toast.success("Logged in successfully");
      setOpen(false);

      setRollNo("");
      setPassword("");
      setError("");
    } else {
      //@ts-ignore
      const msg = res.payload?.message || "Invalid roll number or password";
      toast.error(msg);
      setError(msg); // ⭐ SHOW ERROR IN UI
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[420px] p-6 rounded-xl">
        <h3 className="text-2xl font-codec font-bold tracking-tight">
          TechTalk Club<span className="text-violet-600 text-4xl">.</span>
        </h3>

        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Welcome Back
          </DialogTitle>
          <DialogDescription className="text-sm">
            Login to access the TechTalk Club dashboard
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-5 py-4">
          {/* ⭐ ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Roll No */}
          <div className="grid gap-2">
            <Label>Roll No</Label>
            <Input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter roll number"
              className="h-11"
            />
          </div>

          {/* Password */}
          <div className="grid gap-2 relative">
            <Label>Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-11 pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-2.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <DialogFooter className="mt-2 sm:flex-row gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button onClick={handleSubmit}>Login</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
