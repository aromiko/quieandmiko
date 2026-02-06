"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { createSupabaseBrowserClient } from "@/lib/services/supabase-browser";
import { Database } from "@/lib/types";
import { ChevronLeft, ChevronRight, LogOut, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import RsvpQrCode from "./rsvp-qr-code";

type Guest = Database["public"]["Tables"]["guests"]["Row"];

interface AdminDashboardProps {
  guests: Guest[];
  userEmail?: string;
}

const ITEMS_PER_PAGE = 20;

const GUEST_TYPE_LABELS: Record<string, string> = {
  guest: "Guest",
  primary_sponsor: "Principal Sponsor",
  entourage: "Entourage",
  best_man: "Best Man",
  maid_of_honor: "Maid of Honor",
  mother: "Mother",
  father: "Father"
};

const RSVP_STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "attending", label: "Attending" },
  { value: "not_attending", label: "Not Attending" },
  { value: "pending", label: "Pending" }
];

const GUEST_TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "guest", label: "Guest" },
  { value: "primary_sponsor", label: "Principal Sponsor" },
  { value: "entourage", label: "Entourage" },
  { value: "best_man", label: "Best Man" },
  { value: "maid_of_honor", label: "Maid of Honor" },
  { value: "mother", label: "Mother" },
  { value: "father", label: "Father" }
];

function formatGuestType(type: string | null): string {
  if (!type) return "N/A";
  return (
    GUEST_TYPE_LABELS[type] ||
    type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export default function AdminDashboard({
  guests,
  userEmail
}: AdminDashboardProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const generateRSVPLink = useCallback(
    async (code: string): Promise<string> => {
      try {
        const res = await fetch("/api/encrypt-deterministic", {
          method: "POST",
          body: JSON.stringify({ code }),
          headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        if (!res.ok || !data.encrypted) throw new Error(data.error || "Failed");
        return `${window.location.origin}/rsvp/${data.encrypted}`;
      } catch {
        toast.error("Failed to generate link");
        return "#";
      }
    },
    []
  );

  // Filter guests based on search, status, and type
  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      const matchesSearch =
        g.full_name.toLowerCase().includes(search.toLowerCase()) ||
        (g.group_label?.toLowerCase().includes(search.toLowerCase()) ?? false);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "attending" && g.is_attending === true) ||
        (statusFilter === "not_attending" && g.is_attending === false) ||
        (statusFilter === "pending" && g.is_attending === null);

      const matchesType = typeFilter === "all" || g.guest_type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [guests, search, statusFilter, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredGuests.length / ITEMS_PER_PAGE);
  const paginatedGuests = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredGuests.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredGuests, currentPage]);

  // Reset to page 1 when filters change
  const handleFilterChange = useCallback(
    (setter: (value: string) => void) => (value: string) => {
      setter(value);
      setCurrentPage(1);
    },
    []
  );

  const stats = useMemo(
    () => ({
      total: guests.length,
      attending: guests.filter((g) => g.is_attending === true).length,
      notAttending: guests.filter((g) => g.is_attending === false).length,
      pending: guests.filter((g) => g.is_attending === null).length
    }),
    [guests]
  );

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Admin Dashboard</h1>
          {userEmail && (
            <p className="text-muted-foreground text-sm">
              Signed in as <strong>{userEmail}</strong>
            </p>
          )}
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 size-4" />
          Sign Out
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <Users className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Attending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-700">
              {stats.attending}
            </p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">
              Not Attending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-700">
              {stats.notAttending}
            </p>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-neutral-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-2xl font-bold">
              {stats.pending}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Guest List */}
      <Card>
        <CardHeader>
          <CardTitle>Guest List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <Input
                id="guest-search"
                placeholder="Search name or group..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Search guests by name or group"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={handleFilterChange(setStatusFilter)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="RSVP Status" />
              </SelectTrigger>
              <SelectContent>
                {RSVP_STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={typeFilter}
              onValueChange={handleFilterChange(setTypeFilter)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Guest Type" />
              </SelectTrigger>
              <SelectContent>
                {GUEST_TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results info */}
          <p className="text-muted-foreground text-sm">
            Showing {paginatedGuests.length} of {filteredGuests.length} guests
            {filteredGuests.length !== guests.length &&
              ` (filtered from ${guests.length} total)`}
          </p>

          {/* Guest List */}
          <ul className="space-y-2" role="list" aria-label="Guest list">
            {paginatedGuests.map((guest) => (
              <li
                key={guest.id}
                className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{guest.full_name}</p>
                    {guest.is_attending === true && (
                      <Badge variant="default" className="bg-green-600">
                        Attending
                      </Badge>
                    )}
                    {guest.is_attending === false && (
                      <Badge variant="destructive">Not Attending</Badge>
                    )}
                    {guest.is_attending === null && (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Group: {guest.group_label || "N/A"} •{" "}
                    {formatGuestType(guest.guest_type)}
                  </p>
                  {guest.email && (
                    <p className="text-muted-foreground text-xs">
                      {guest.email}
                      {guest.contact_number && ` • ${guest.contact_number}`}
                    </p>
                  )}
                  {guest.food_allergies && (
                    <Badge variant="outline" className="text-orange-600">
                      Allergies: {guest.food_allergies}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <RsvpQrCode
                    guestName={guest.full_name}
                    rsvpCode={guest.rsvp_code || ""}
                    generateLink={generateRSVPLink}
                  />
                  <Button
                    onClick={async () => {
                      const url = await generateRSVPLink(guest.rsvp_code || "");
                      if (url !== "#") {
                        await navigator.clipboard.writeText(url);
                        toast.success("RSVP link copied!");
                      }
                    }}
                    disabled={!guest.rsvp_code}
                    variant="outline"
                    size="sm"
                  >
                    Copy RSVP Link
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          {/* Empty state */}
          {paginatedGuests.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">
                No guests found matching your filters.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
              <p className="text-muted-foreground text-sm">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="mr-1 size-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
