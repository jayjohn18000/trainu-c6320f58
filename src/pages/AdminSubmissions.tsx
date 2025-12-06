import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronDown, ChevronUp, Loader2, ChevronRight } from "lucide-react";
import AdminPasswordGate from "@/components/admin/AdminPasswordGate";
import { useIsMobile } from "@/hooks/use-mobile";

type Submission = {
  id: string;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  location: string;
  specialty: string;
  created_at: string;
  status: string | null;
};

type SortField = keyof Submission;
type SortDirection = "asc" | "desc";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  approved: "bg-green-500/20 text-green-400 border-green-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
  generated: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const AdminSubmissions = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const fetchSubmissions = useCallback(async (passcode: string) => {
    setLoading(true);
    try {
      const response = await supabase.functions.invoke("admin-fetch-submissions", {
        body: {},
        headers: {
          "x-admin-passcode": passcode,
        },
      });

      if (response.error) {
        console.error("Error fetching submissions:", response.error);
        if (response.error.message?.includes("Unauthorized")) {
          sessionStorage.removeItem("admin_passcode");
          setIsAuthenticated(false);
          setAdminPasscode(null);
        }
        return;
      }

      setSubmissions(response.data?.data || []);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated && adminPasscode) {
      fetchSubmissions(adminPasscode);
    }
  }, [isAuthenticated, adminPasscode, fetchSubmissions]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredSubmissions = submissions
    .filter((s) => {
      const searchLower = search.toLowerCase();
      return (
        s.full_name?.toLowerCase().includes(searchLower) ||
        s.business_name?.toLowerCase().includes(searchLower) ||
        s.email?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const aVal = a[sortField] || "";
      const bVal = b[sortField] || "";
      const comparison = String(aVal).localeCompare(String(bVal));
      return sortDirection === "asc" ? comparison : -comparison;
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="inline h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="inline h-4 w-4 ml-1" />
    );
  };

  const handleAuthSuccess = (passcode: string) => {
    setAdminPasscode(passcode);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AdminPasswordGate onSuccess={handleAuthSuccess} />;
  }

  // Mobile Card View Component
  const MobileSubmissionCard = ({ submission }: { submission: Submission }) => (
    <Card 
      className="bg-card border-border cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => navigate(`/admin/submissions/${submission.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{submission.full_name}</h3>
            <p className="text-sm text-foreground/70 truncate">{submission.business_name}</p>
            <p className="text-xs text-foreground/50 mt-1">{submission.specialty}</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Badge
              variant="outline"
              className={`text-xs ${statusColors[submission.status || "pending"]}`}
            >
              {submission.status || "pending"}
            </Badge>
            <ChevronRight className="w-4 h-4 text-foreground/40" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <span className="text-xs text-foreground/50">
            {new Date(submission.created_at).toLocaleDateString()}
          </span>
          <span className="text-xs text-foreground/50 truncate max-w-[150px]">
            {submission.location}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Trainer Submissions</h1>
          <p className="text-sm sm:text-base text-foreground/60">
            Manage and review trainer website requests
          </p>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
            <Input
              placeholder="Search by name, business, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-foreground/60">
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="p-8 text-center text-foreground/60 rounded-lg border border-border bg-card">
            No submissions found
          </div>
        ) : isMobile ? (
          // Mobile: Card-based layout
          <div className="space-y-3">
            {filteredSubmissions.map((submission) => (
              <MobileSubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        ) : (
          // Desktop: Table layout
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("full_name")}
                  >
                    Name <SortIcon field="full_name" />
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("business_name")}
                  >
                    Business <SortIcon field="business_name" />
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    Status <SortIcon field="status" />
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("created_at")}
                  >
                    Submitted <SortIcon field="created_at" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow
                    key={submission.id}
                    className="border-border cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate(`/admin/submissions/${submission.id}`)}
                  >
                    <TableCell className="font-medium">
                      {submission.full_name}
                    </TableCell>
                    <TableCell>{submission.business_name}</TableCell>
                    <TableCell className="text-foreground/70">
                      {submission.email}
                    </TableCell>
                    <TableCell>{submission.location}</TableCell>
                    <TableCell>{submission.specialty}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusColors[submission.status || "pending"]}
                      >
                        {submission.status || "pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground/70">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="mt-4 text-sm text-foreground/50">
          {filteredSubmissions.length} submission(s)
        </div>
      </div>
    </div>
  );
};

export default AdminSubmissions;
