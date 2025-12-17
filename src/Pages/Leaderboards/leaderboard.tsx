"use client";

import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { LeaderboardData } from "@/DemoData/participation"; // import your data here

export default function LeaderboardPage() {
    const categories = [
        { id: "events", label: "Most Events Attended" },
        { id: "hackathons", label: "Most Hackathon Wins" },
        { id: "overall", label: "Overall Score" },
    ];

    const [active, setActive] = useState("overall");
    const [selectedUser, setSelectedUser] = useState<any | null>(null);

    // Sorting logic based on selected category
    const sortedData = [...LeaderboardData].sort((a, b) => {
        if (active === "events") return b.eventsAttended - a.eventsAttended;
        if (active === "hackathons") return b.hackathonScore - a.hackathonScore;
        return b.totalScore - a.totalScore; // default
    });

    return (
        <div className="w-full max-w-7xl mx-auto min-h-screen px-6 py-10 bg-background text-foreground space-y-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="opacity-70 hover:opacity-100">
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-medium">Leaderboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-4xl md:text-[10vw] font-bold text-foreground tracking-tight">
                Leaderboard
            </h1>
            {/* Category Selector */}
            <div className="flex flex-wrap gap-4">
                {categories.map((c) => (
                    <Button
                        key={c.id}
                        onClick={() => setActive(c.id)}
                        variant={`${active === c.id?"default":"outline"}`}
                    >
                        {c.label}
                    </Button>
                ))}
            </div>

            {/* Leaderboard Table */}
            <Card className="p-4 rounded-2xl border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rank</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Roll No</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Events</TableHead>
                            <TableHead>Hackathons</TableHead>
                            <TableHead>Total Score</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {sortedData.map((user, index) => (
                            <TableRow
                                key={user.rollNo}
                                className="cursor-pointer hover:bg-accent/40"
                                onClick={() => setSelectedUser(user)}
                            >
                                <TableCell className="font-semibold">{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.rollNo}</TableCell>
                                <TableCell>{user.class}</TableCell>
                                <TableCell>{user.eventsAttended}</TableCell>
                                <TableCell>{user.hackathonsAttended}</TableCell>
                                <TableCell className="font-bold">{user.totalScore}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {/* Details Modal */}
            <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
                <DialogContent className="min-w-3xl max-h-3/4 overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            {selectedUser?.name}'s Performance Details
                        </DialogTitle>
                    </DialogHeader>

                    {selectedUser && (
                        <div className="space-y-6">

                            {/* Basic Info */}
                            <div>
                                <p><strong>Roll No:</strong> {selectedUser.rollNo}</p>
                                <p><strong>Class:</strong> {selectedUser.class}</p>
                            </div>

                            {/* Scores */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="p-3 rounded-lg bg-accent/30">
                                    <p className="font-semibold">Events Attended</p>
                                    <p>{selectedUser.eventsAttended}</p>
                                </div>

                                <div className="p-3 rounded-lg bg-accent/30">
                                    <p className="font-semibold">Hackathons Attended</p>
                                    <p>{selectedUser.hackathonsAttended}</p>
                                </div>

                                <div className="p-3 rounded-lg bg-accent/30">
                                    <p className="font-semibold">Event Score</p>
                                    <p>{selectedUser.eventScore}</p>
                                </div>

                                <div className="p-3 rounded-lg bg-accent/30">
                                    <p className="font-semibold">Hackathon Score</p>
                                    <p>{selectedUser.hackathonScore}</p>
                                </div>

                                <div className="col-span-2 p-3 rounded-lg bg-primary/10">
                                    <p className="font-semibold">Total Score</p>
                                    <p className="text-lg font-bold">{selectedUser.totalScore}</p>
                                </div>
                            </div>

                            {/* Hackathon Details */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Hackathon Details</h3>
                                <ul className="list-disc ml-4 text-sm">
                                    {selectedUser.hackathonDetails.map((h: any, i: number) => (
                                        <li key={i}>{h.name} — {h.position ? `Position ${h.position}` : "Participated"}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Event Details */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Event Details</h3>
                                <ul className="list-disc ml-4 text-sm">
                                    {selectedUser.eventDetails.map((e: any, i: number) => (
                                        <li key={i}>{e.name} — {e.position ? `Position ${e.position}` : "Participated"}</li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    )}
                </DialogContent>
            </Dialog>

        </div>
    );
}
