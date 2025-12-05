import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, X, FileJson, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminPasswordGate from "@/components/admin/AdminPasswordGate";

type Program = {
  title: string;
  price: string;
  description: string;
};

type Submission = {
  id: string;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  specialty: string;
  programs: Program[] | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
  booking_link: string | null;
  testimonial_quote: string | null;
  testimonial_name: string | null;
  before_photo_url: string | null;
  after_photo_url: string | null;
  profile_photo_url: string | null;
  coaching_style: string | null;
  wants_custom_domain: boolean | null;
  wants_sms_automations: boolean | null;
  wants_ai_assistant: boolean | null;
  wants_courses: boolean | null;
  wants_client_app: boolean | null;
  status: string | null;
  created_at: string;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  approved: "bg-green-500/20 text-green-400 border-green-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
  generated: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const AdminSubmissionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (isAuthenticated && id) {
      fetchSubmission();
    }
  }, [isAuthenticated, id]);

  const fetchSubmission = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("trainer_submissions")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching submission:", error);
      toast({ title: "Error loading submission", variant: "destructive" });
    } else if (!data) {
      toast({ title: "Submission not found", variant: "destructive" });
      navigate("/admin/submissions");
    } else {
      // Parse programs if it's a string
      const parsedData = {
        ...data,
        programs: typeof data.programs === 'string' 
          ? JSON.parse(data.programs) 
          : data.programs
      };
      setSubmission(parsedData as Submission);
    }
    setLoading(false);
  };

  const updateStatus = async (newStatus: string) => {
    if (!submission) return;
    setUpdating(true);

    const { error } = await supabase
      .from("trainer_submissions")
      .update({ status: newStatus })
      .eq("id", submission.id);

    if (error) {
      toast({ title: "Error updating status", variant: "destructive" });
    } else {
      setSubmission({ ...submission, status: newStatus });
      toast({ title: `Status updated to ${newStatus}` });
    }
    setUpdating(false);
  };

  const generateJson = async () => {
    if (!submission) return;
    setGenerating(true);

    try {
      const response = await supabase.functions.invoke("generate-trainer-json", {
        body: { submissionId: submission.id },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast({ title: "JSON generated successfully!" });
      // Optionally update status to generated
      await updateStatus("generated");
    } catch (error) {
      console.error("Error generating JSON:", error);
      toast({ title: "Error generating JSON", variant: "destructive" });
    }
    setGenerating(false);
  };

  if (!isAuthenticated) {
    return <AdminPasswordGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!submission) {
    return null;
  }

  const programs = submission.programs || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/submissions")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Submissions
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{submission.full_name}</h1>
            <p className="text-foreground/60">{submission.business_name}</p>
          </div>
          <Badge
            variant="outline"
            className={`text-sm px-4 py-2 ${statusColors[submission.status || "pending"]}`}
          >
            {submission.status || "pending"}
          </Badge>
        </div>

        {/* Action Buttons */}
        <Card className="mb-6 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button
              onClick={() => updateStatus("approved")}
              disabled={updating || submission.status === "approved"}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button
              onClick={() => updateStatus("rejected")}
              disabled={updating || submission.status === "rejected"}
              variant="destructive"
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={generateJson}
              disabled={generating}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              {generating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileJson className="mr-2 h-4 w-4" />
              )}
              Generate Website JSON
            </Button>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="Email" value={submission.email} />
              <InfoRow label="Phone" value={submission.phone} />
              <InfoRow label="Location" value={submission.location} />
              <InfoRow
                label="Submitted"
                value={new Date(submission.created_at).toLocaleString()}
              />
            </CardContent>
          </Card>

          {/* Branding */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="Specialty" value={submission.specialty} />
              <InfoRow label="Coaching Style" value={submission.coaching_style} />
              <div>
                <span className="text-foreground/60 text-sm">Bio</span>
                <p className="text-foreground mt-1">{submission.bio}</p>
              </div>
            </CardContent>
          </Card>

          {/* Programs */}
          <Card className="bg-card border-border md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Programs</CardTitle>
            </CardHeader>
            <CardContent>
              {programs.length === 0 ? (
                <p className="text-foreground/60">No programs added</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-4">
                  {programs.map((program, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-muted/30 border border-border"
                    >
                      <h4 className="font-semibold">{program.title || `Program ${index + 1}`}</h4>
                      <p className="text-primary font-medium">{program.price}</p>
                      <p className="text-sm text-foreground/70 mt-2">
                        {program.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="Instagram" value={submission.instagram_url} isLink />
              <InfoRow label="TikTok" value={submission.tiktok_url} isLink />
              <InfoRow label="YouTube" value={submission.youtube_url} isLink />
              <InfoRow label="Booking Link" value={submission.booking_link} isLink />
            </CardContent>
          </Card>

          {/* Testimonial */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Testimonial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {submission.testimonial_quote ? (
                <>
                  <p className="italic text-foreground/80">
                    "{submission.testimonial_quote}"
                  </p>
                  <p className="text-sm text-foreground/60">
                    — {submission.testimonial_name || "Anonymous"}
                  </p>
                </>
              ) : (
                <p className="text-foreground/60">No testimonial provided</p>
              )}
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="bg-card border-border md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <ImagePreview label="Profile Photo" url={submission.profile_photo_url} />
                <ImagePreview label="Before Photo" url={submission.before_photo_url} />
                <ImagePreview label="After Photo" url={submission.after_photo_url} />
              </div>
            </CardContent>
          </Card>

          {/* Advanced Options */}
          <Card className="bg-card border-border md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Advanced Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <OptionBadge label="Custom Domain" active={submission.wants_custom_domain} />
                <OptionBadge label="SMS Automations" active={submission.wants_sms_automations} />
                <OptionBadge label="AI Assistant" active={submission.wants_ai_assistant} />
                <OptionBadge label="Courses" active={submission.wants_courses} />
                <OptionBadge label="Client App" active={submission.wants_client_app} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
  isLink = false,
}: {
  label: string;
  value: string | null;
  isLink?: boolean;
}) => (
  <div>
    <span className="text-foreground/60 text-sm">{label}</span>
    {value ? (
      isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-primary hover:underline truncate"
        >
          {value}
        </a>
      ) : (
        <p className="text-foreground">{value}</p>
      )
    ) : (
      <p className="text-foreground/40">Not provided</p>
    )}
  </div>
);

const ImagePreview = ({ label, url }: { label: string; url: string | null }) => (
  <div>
    <span className="text-foreground/60 text-sm block mb-2">{label}</span>
    {url ? (
      <img
        src={url}
        alt={label}
        className="w-full h-40 object-cover rounded-lg border border-border"
      />
    ) : (
      <div className="w-full h-40 bg-muted/30 rounded-lg border border-border flex items-center justify-center text-foreground/40">
        No image
      </div>
    )}
  </div>
);

const OptionBadge = ({ label, active }: { label: string; active: boolean | null }) => (
  <Badge
    variant="outline"
    className={
      active
        ? "bg-primary/20 text-primary border-primary/30"
        : "bg-muted/30 text-foreground/40 border-border"
    }
  >
    {label}: {active ? "Yes" : "No"}
  </Badge>
);

export default AdminSubmissionDetail;
