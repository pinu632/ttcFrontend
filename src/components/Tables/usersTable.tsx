"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import api from "@/Axios/axiosInstance";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

interface UserType {
  _id: string;
  name: string;
  rollNo: string;
  email: string;
  phone?: string;
  course?: string;
  semester?: number;
  class?: string;
  profilePic?: string;
  role: string[];
  status: string;
  lastLogin?: string;
  createdAt?: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Pagination state
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10); // fixed page size
  const [total, setTotal] = useState(0);

  const pageCount = Math.ceil(total / pageSize);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.post("/student/list", {
        filter: {

        },
        pageNum,
        pageSize,
      });

      setUsers(res?.data?.data.students || []);
      setTotal(res?.data?.data.totalStudents || 0); // must return from backend
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pageNum]); // reload when page changes

  const deleteUser = async (id: string) => {
    try {
      const res = await api.delete(`/users/${id}`);
      if (res.data.success) {
        toast.success("User deleted");
        setUsers(users.filter((u) => u._id !== id));
      }
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  if (loading)
    return <p className="p-4 text-muted-foreground text-sm">Loading users...</p>;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/40">
              <TableHead>User</TableHead>
              <TableHead>Roll No</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} className="border-b border-border">
                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.profilePic} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{user.name}</div>
                </TableCell>

                <TableCell>{user.rollNo}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.course || "—"}</TableCell>
                <TableCell>{user.semester || "—"}</TableCell>
                <TableCell>{user.class || "—"}</TableCell>

                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {user.role.map((r) => (
                      <Badge key={r} variant="secondary">
                        {r}
                      </Badge>
                    ))}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    className={
                      user.status === "Active"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : "Never"}
                </TableCell>

                <TableCell className="text-right flex gap-2 justify-end">
                  <button
                    onClick={() =>
                      (window.location.href = `/users/edit/${user._id}`)
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

                  <button
                    onClick={() => deleteUser(user._id)}
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

      {/* 🔥 Pagination Row (shadcn) */}
      <div className="p-4 border-t flex justify-center">
        <Pagination>
          <PaginationContent>

            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => pageNum > 1 && setPageNum(pageNum - 1)}
                className={pageNum === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {[...Array(pageCount)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setPageNum(i + 1)}
                  isActive={pageNum === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                onClick={() => pageNum < pageCount && setPageNum(pageNum + 1)}
                className={
                  pageNum === pageCount ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
