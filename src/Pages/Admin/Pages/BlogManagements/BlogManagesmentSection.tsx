import { MoreVertical, Filter, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CreateBlogModal from "./CreateBlogModal";
import api from "@/Axios/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setOpenBlog } from "@/store/Slices/blogOpenSlice";

/* =======================
   Types
======================= */

interface BlogStatusMap {
  Draft: string;
  Published: string;
  Archived: string;
}

export default function BlogManagement() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);

  const user = useAppSelector((state) => state.auth.user);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /* =======================
     Fetch Drafts
  ======================= */
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`/blogs/author/${user.id}`);
        setDrafts(res?.data.data || []);
      } catch (err) {
        console.error("Failed to fetch drafts", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const statusStyles: BlogStatusMap = {
    Draft: "bg-muted text-muted-foreground",
    Published: "bg-primary text-primary-foreground",
    Archived: "bg-accent text-accent-foreground",
  };

  return (
    <Card className="w-full p-4 md:p-6 bg-card text-card-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold">Blog Management</h2>

        <div className="flex flex-wrap items-center gap-2">
          <Input
            placeholder="Search blogs..."
            className="w-48"
          />

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </Button>

          <Button size="sm" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Create
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  Loading blogs...
                </TableCell>
              </TableRow>
            )}

            {!loading && drafts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No drafts found
                </TableCell>
              </TableRow>
            )}

            {!loading && drafts.length > 0 && (
              <>
                <TableRow>
                  <TableCell colSpan={6} className="bg-muted font-medium">
                    Your Drafts
                  </TableCell>
                </TableRow>

                {drafts.map((b) => (
                  <TableRow key={b._id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{b.title}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{b.category || "General"}</TableCell>
                    <TableCell>
                      {new Date(b.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                     
                      <Badge
                      //@ts-ignore
                       className={statusStyles[b.status]}>
                        {b.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              dispatch(setOpenBlog(b));
                              navigate(`/blogs/${b._id}`);
                            }}
                          >
                            View Blog
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => navigate(`/admin/blogs/create/${b._id}`)}
                          >
                            Edit Blog
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      <CreateBlogModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </Card>
  );
}
