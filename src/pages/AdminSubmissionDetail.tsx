import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check, X, FileJson, Loader2, ExternalLink, Copy, CheckCheck, Pencil, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminPasswordGate from "@/components/admin/AdminPasswordGate";
import DomainManager from "@/components/admin/DomainManager";
import { useIsMobile } from "@/hooks/use-mobile";

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
  x_url: string | null;
  facebook_url: string | null;
  booking_link: string | null;
  testimonial_quote: string | null;
  testimonial_name: string | null;
  before_photo_url: string | null;
  after_photo_url: string | null;
  profile_photo_url: string | null;
  gallery_photo_urls: string[] | null;
  coaching_style: string | null;
  custom_hero_title: string | null;
  wants_custom_domain: boolean | null;
  wants_sms_automations: boolean | null;
  wants_ai_assistant: boolean | null;
  wants_courses: boolean | null;
  wants_client_app: boolean | null;
  wants_website_enhancements: boolean | null;
  wants_social_media_management: boolean | null;
  wants_done_for_you: boolean | null;
  primary_color: string | null;
  background_style: string | null;
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
  const isMobile = useIsMobile();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState<string | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedJson, setGeneratedJson] = useState<string | null>(null);
  const [generatedSlug, setGeneratedSlug] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<Partial<Submission>>({});
  const [saving, setSaving] = useState(false);

  const fetchSubmission = useCallback(async (passcode: string) => {
    setLoading(true);
    try {
      const response = await supabase.functions.invoke("admin-fetch-submissions", {
        body: { submissionId: id },
        headers: {
          "x-admin-passcode": passcode,
        },
      });

      if (response.error) {
        console.error("Error fetching submission:", response.error);
        if (response.error.message?.includes("Unauthorized")) {
          sessionStorage.removeItem("admin_passcode");
          setIsAuthenticated(false);
          setAdminPasscode(null);
        }
        toast({ title: "Error loading submission", variant: "destructive" });
        return;
      }

      const data = response.data?.data;
      if (!data) {
        toast({ title: "Submission not found", variant: "destructive" });
        navigate("/admin/submissions");
        return;
      }

      const parsedData = {
        ...data,
        programs: typeof data.programs === 'string' 
          ? JSON.parse(data.programs) 
          : data.programs,
        gallery_photo_urls: typeof data.gallery_photo_urls === 'string'
          ? JSON.parse(data.gallery_photo_urls)
          : data.gallery_photo_urls
      };
      setSubmission(parsedData as Submission);
      
      // Generate slug for domain manager
      const slug = data.business_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      setGeneratedSlug(slug);
    } catch (error) {
      console.error("Error:", error);
      toast({ title: "Error loading submission", variant: "destructive" });
    }
    setLoading(false);
  }, [id, navigate, toast]);

  useEffect(() => {
    if (isAuthenticated && adminPasscode && id) {
      fetchSubmission(adminPasscode);
    }
  }, [isAuthenticated, adminPasscode, id, fetchSubmission]);

  const updateStatus = async (newStatus: string) => {
    if (!submission || !adminPasscode) return;
    setUpdating(true);

    try {
      const response = await supabase.functions.invoke("admin-update-submission", {
        body: { 
          submissionId: submission.id,
          updates: { status: newStatus }
        },
        headers: {
          "x-admin-passcode": adminPasscode,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      setSubmission({ ...submission, status: newStatus });
      toast({ title: `Status updated to ${newStatus}` });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({ title: "Error updating status", variant: "destructive" });
    }
    setUpdating(false);
  };

  const generateJson = async () => {
    if (!submission || !adminPasscode) return;
    setGenerating(true);

    try {
      const response = await supabase.functions.invoke("generate-trainer-json", {
        body: { submissionId: submission.id },
        headers: {
          "x-admin-passcode": adminPasscode,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      // Store the generated JSON for display
      if (response.data?.json) {
        setGeneratedJson(JSON.stringify(response.data.json, null, 2));
        setGeneratedSlug(response.data.slug);
      }

      toast({ title: "JSON generated successfully!" });
      await updateStatus("generated");
    } catch (error) {
      console.error("Error generating JSON:", error);
      toast({ title: "Error generating JSON", variant: "destructive" });
    }
    setGenerating(false);
  };

  const copyJson = async () => {
    if (!generatedJson) return;
    
    try {
      await navigator.clipboard.writeText(generatedJson);
      setCopied(true);
      toast({ title: "JSON copied to clipboard!" });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const handleAuthSuccess = (passcode: string) => {
    setAdminPasscode(passcode);
    setIsAuthenticated(true);
  };

  const enterEditMode = () => {
    if (!submission) return;
    setEditData({
      custom_hero_title: submission.custom_hero_title || "",
      x_url: submission.x_url || "",
      facebook_url: submission.facebook_url || "",
      wants_website_enhancements: submission.wants_website_enhancements || false,
      wants_social_media_management: submission.wants_social_media_management || false,
      wants_done_for_you: submission.wants_done_for_you || false,
      bio: submission.bio || "",
      specialty: submission.specialty || "",
      coaching_style: submission.coaching_style || "",
    });
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setEditData({});
  };

  const saveChanges = async () => {
    if (!submission || !adminPasscode) return;
    setSaving(true);

    try {
      const response = await supabase.functions.invoke("admin-update-submission", {
        body: { 
          submissionId: submission.id,
          updates: editData
        },
        headers: {
          "x-admin-passcode": adminPasscode,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      // Update local state
      setSubmission({ ...submission, ...editData });
      setIsEditMode(false);
      setEditData({});
      toast({ title: "Changes saved successfully!" });
    } catch (error) {
      console.error("Error saving changes:", error);
      toast({ title: "Error saving changes", variant: "destructive" });
    }
    setSaving(false);
  };

  if (!isAuthenticated) {
    return <AdminPasswordGate onSuccess={handleAuthSuccess} />;
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
  const trainerSlug = submission.business_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/submissions")}
          className="mb-4 sm:mb-6"
          size={isMobile ? "sm" : "default"}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Header - Stacks vertically on mobile */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{submission.full_name}</h1>
              <p className="text-foreground/60 text-sm sm:text-base">{submission.business_name}</p>
            </div>
            <Badge
              variant="outline"
              className={`text-sm px-3 py-1.5 sm:px-4 sm:py-2 w-fit ${statusColors[submission.status || "pending"]}`}
            >
              {submission.status || "pending"}
            </Badge>
          </div>
          
          {/* Edit buttons - Full width on mobile */}
          <div className="flex gap-2">
            {!isEditMode ? (
              <Button variant="outline" size="sm" onClick={enterEditMode} className="w-full sm:w-auto">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={cancelEdit} disabled={saving} className="flex-1 sm:flex-none">
                  Cancel
                </Button>
                <Button size="sm" onClick={saveChanges} disabled={saving} className="flex-1 sm:flex-none">
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons - Stack and full width on mobile */}
        <Card className="mb-6 bg-card border-border">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              onClick={() => updateStatus("approved")}
              disabled={updating || submission.status === "approved"}
              className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
              size={isMobile ? "sm" : "default"}
            >
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button
              onClick={() => updateStatus("rejected")}
              disabled={updating || submission.status === "rejected"}
              variant="destructive"
              className="w-full sm:w-auto"
              size={isMobile ? "sm" : "default"}
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={generateJson}
              disabled={generating}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto"
              size={isMobile ? "sm" : "default"}
            >
              {generating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileJson className="mr-2 h-4 w-4" />
              )}
              Generate JSON
            </Button>
          </CardContent>
        </Card>

        {/* Live Site URL Card - Stacks content on mobile */}
        {submission.status === "generated" && (
          <Card className="mb-6 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-green-400">
                <span className="text-lg sm:text-xl">🌐</span>
                Live Site URL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 sm:p-4 rounded-lg bg-background/50 border border-border">
                <p className="text-xs text-foreground/50 mb-1">Your trainer's website is live at:</p>
                <p className="text-sm sm:text-lg font-mono text-foreground break-all">
                  {window.location.origin}/trainers/{trainerSlug}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await navigator.clipboard.writeText(`${window.location.origin}/trainers/${trainerSlug}`);
                    toast({ title: "URL copied to clipboard!" });
                  }}
                  className="border-green-500/50 text-green-400 hover:bg-green-500/10 w-full sm:w-auto"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy URL
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-green-500/50 text-green-400 hover:bg-green-500/10 w-full sm:w-auto"
                >
                  <a
                    href={`/trainers/${trainerSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Site
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generated JSON Display - Scrollable on mobile */}
        {generatedJson && (
          <Card className="mb-6 bg-card border-border border-primary/30">
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle className="text-base sm:text-lg text-primary">Generated JSON</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyJson}
                  className="border-primary/50 w-full sm:w-auto"
                >
                  {copied ? (
                    <CheckCheck className="mr-2 h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4" />
                  )}
                  {copied ? "Copied!" : "Copy JSON"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <p className="text-xs sm:text-sm text-foreground/70 mb-2">
                  Paste into Lovable:
                </p>
                <code className="text-primary text-xs sm:text-sm break-all">
                  src/data/trainers/{generatedSlug}.json
                </code>
              </div>
              <pre className="p-3 sm:p-4 rounded-lg bg-muted/20 border border-border overflow-x-auto max-h-64 sm:max-h-96 text-xs">
                <code className="text-foreground/80">{generatedJson}</code>
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Domain Manager */}
        {submission.status === "generated" && generatedSlug && (
          <div className="mb-6">
            <DomainManager trainerSlug={generatedSlug} />
          </div>
        )}

        {/* Grid - Single column on mobile */}
        <div className="grid gap-4 sm:gap-6">
          {/* Contact Info */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">Contact Information</CardTitle>
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
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Custom Hero Title - Editable */}
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="custom_hero_title">Custom Hero Title</Label>
                  <Input
                    id="custom_hero_title"
                    value={editData.custom_hero_title || ""}
                    onChange={(e) => setEditData({ ...editData, custom_hero_title: e.target.value })}
                    placeholder="Enter custom hero headline"
                  />
                </div>
              ) : (
                <InfoRow label="Custom Hero Title" value={submission.custom_hero_title} />
              )}
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input
                    id="specialty"
                    value={editData.specialty || ""}
                    onChange={(e) => setEditData({ ...editData, specialty: e.target.value })}
                  />
                </div>
              ) : (
                <InfoRow label="Specialty" value={submission.specialty} />
              )}
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="coaching_style">Coaching Style</Label>
                  <Input
                    id="coaching_style"
                    value={editData.coaching_style || ""}
                    onChange={(e) => setEditData({ ...editData, coaching_style: e.target.value })}
                  />
                </div>
              ) : (
                <InfoRow label="Coaching Style" value={submission.coaching_style} />
              )}
              
              <div className="flex gap-4 flex-wrap">
                <div>
                  <span className="text-foreground/60 text-sm">Primary Color</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div 
                      className="w-6 h-6 rounded-full border border-border"
                      style={{ 
                        backgroundColor: submission.primary_color === 'orange' ? '#ff5f26' :
                          submission.primary_color === 'red' ? '#ef4444' :
                          submission.primary_color === 'blue' ? '#3b82f6' :
                          submission.primary_color === 'green' ? '#22c55e' :
                          submission.primary_color === 'purple' ? '#a855f7' :
                          submission.primary_color === 'gold' ? '#f59e0b' :
                          submission.primary_color === 'pink' ? '#ec4899' :
                          submission.primary_color === 'cyan' ? '#22d3ee' : '#ff5f26'
                      }}
                    />
                    <span className="text-foreground capitalize text-sm">{submission.primary_color || 'orange'}</span>
                  </div>
                </div>
                <div>
                  <span className="text-foreground/60 text-sm">Background</span>
                  <p className="text-foreground mt-1 capitalize text-sm">{submission.background_style || 'dark'}</p>
                </div>
              </div>
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={editData.bio || ""}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    rows={4}
                  />
                </div>
              ) : (
                <div>
                  <span className="text-foreground/60 text-sm">Bio</span>
                  <p className="text-foreground mt-1 text-sm">{submission.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Programs */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">Programs</CardTitle>
            </CardHeader>
            <CardContent>
              {programs.length === 0 ? (
                <p className="text-foreground/60">No programs added</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {programs.map((program, index) => (
                    <div
                      key={index}
                      className="p-3 sm:p-4 rounded-lg bg-muted/30 border border-border"
                    >
                      <h4 className="font-semibold text-sm sm:text-base">{program.title || `Program ${index + 1}`}</h4>
                      <p className="text-primary font-medium text-sm">{program.price}</p>
                      <p className="text-xs sm:text-sm text-foreground/70 mt-2">
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
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="Instagram" value={submission.instagram_url} isLink />
              <InfoRow label="TikTok" value={submission.tiktok_url} isLink />
              <InfoRow label="YouTube" value={submission.youtube_url} isLink />
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="x_url">X (Twitter)</Label>
                  <Input
                    id="x_url"
                    value={editData.x_url || ""}
                    onChange={(e) => setEditData({ ...editData, x_url: e.target.value })}
                    placeholder="https://x.com/username"
                  />
                </div>
              ) : (
                <InfoRow label="X (Twitter)" value={submission.x_url} isLink />
              )}
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="facebook_url">Facebook</Label>
                  <Input
                    id="facebook_url"
                    value={editData.facebook_url || ""}
                    onChange={(e) => setEditData({ ...editData, facebook_url: e.target.value })}
                    placeholder="https://facebook.com/page"
                  />
                </div>
              ) : (
                <InfoRow label="Facebook" value={submission.facebook_url} isLink />
              )}
              
              <InfoRow label="Booking Link" value={submission.booking_link} isLink />
            </CardContent>
          </Card>

          {/* Testimonial */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">Testimonial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {submission.testimonial_quote ? (
                <>
                  <p className="italic text-foreground/80 text-sm sm:text-base">
                    "{submission.testimonial_quote}"
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/60">
                    — {submission.testimonial_name || "Anonymous"}
                  </p>
                </>
              ) : (
                <p className="text-foreground/60">No testimonial provided</p>
              )}
            </CardContent>
          </Card>

          {/* Images - Responsive grid */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                <ImagePreview label="Profile" url={submission.profile_photo_url} />
                <ImagePreview label="Before" url={submission.before_photo_url} />
                <ImagePreview label="After" url={submission.after_photo_url} />
              </div>
              {submission.gallery_photo_urls && submission.gallery_photo_urls.length > 0 && (
                <div>
                  <span className="text-foreground/60 text-sm block mb-2">Gallery Photos</span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {submission.gallery_photo_urls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-20 sm:h-24 object-cover rounded-lg border border-border"
                      />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Advanced Options */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">Advanced Options</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditMode ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="wants_website_enhancements"
                      checked={editData.wants_website_enhancements || false}
                      onCheckedChange={(checked) => setEditData({ ...editData, wants_website_enhancements: checked as boolean })}
                    />
                    <Label htmlFor="wants_website_enhancements" className="text-sm">Website Enhancements</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="wants_social_media_management"
                      checked={editData.wants_social_media_management || false}
                      onCheckedChange={(checked) => setEditData({ ...editData, wants_social_media_management: checked as boolean })}
                    />
                    <Label htmlFor="wants_social_media_management" className="text-sm">Social Media Mgmt</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="wants_done_for_you"
                      checked={editData.wants_done_for_you || false}
                      onCheckedChange={(checked) => setEditData({ ...editData, wants_done_for_you: checked as boolean })}
                    />
                    <Label htmlFor="wants_done_for_you" className="text-sm">Done For You</Label>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <OptionBadge label="Custom Domain" active={submission.wants_custom_domain} />
                  <OptionBadge label="SMS Automations" active={submission.wants_sms_automations} />
                  <OptionBadge label="AI Assistant" active={submission.wants_ai_assistant} />
                  <OptionBadge label="Courses" active={submission.wants_courses} />
                  <OptionBadge label="Client App" active={submission.wants_client_app} />
                  <OptionBadge label="Website Enhancements" active={submission.wants_website_enhancements} />
                  <OptionBadge label="Social Media Mgmt" active={submission.wants_social_media_management} />
                  <OptionBadge label="Done For You" active={submission.wants_done_for_you} />
                </div>
              )}
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
          className="block text-primary hover:underline text-sm truncate"
        >
          {value}
        </a>
      ) : (
        <p className="text-foreground text-sm">{value}</p>
      )
    ) : (
      <p className="text-foreground/40 text-sm">Not provided</p>
    )}
  </div>
);

const ImagePreview = ({ label, url }: { label: string; url: string | null }) => (
  <div>
    <span className="text-foreground/60 text-xs sm:text-sm block mb-2">{label}</span>
    {url ? (
      <img
        src={url}
        alt={label}
        className="w-full h-28 sm:h-40 object-cover rounded-lg border border-border"
      />
    ) : (
      <div className="w-full h-28 sm:h-40 bg-muted/30 rounded-lg border border-border flex items-center justify-center text-foreground/40 text-xs sm:text-sm">
        No image
      </div>
    )}
  </div>
);

const OptionBadge = ({ label, active }: { label: string; active: boolean | null }) => (
  <Badge
    variant="outline"
    className={`text-xs ${
      active
        ? "bg-primary/20 text-primary border-primary/30"
        : "bg-muted/30 text-foreground/40 border-border"
    }`}
  >
    {label}: {active ? "Yes" : "No"}
  </Badge>
);

export default AdminSubmissionDetail;
