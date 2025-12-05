import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { primaryColors, backgroundStyles, PrimaryColorKey, BackgroundStyleKey } from "@/theme/presetThemes";

type SpecialtyOption =
  | "Strength Training"
  | "Weight Loss"
  | "Women's Fitness"
  | "Hypertrophy"
  | "Athlete Training"
  | "Lifestyle Coaching"
  | "Mobility & Recovery"
  | "General Fitness";

type CoachingStyle = "Online Only" | "Hybrid" | "In-Person Only" | "";

interface FormState {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  specialty: SpecialtyOption | "";
  program1Title: string;
  program1Price: string;
  program1Description: string;
  program2Title: string;
  program2Price: string;
  program2Description: string;
  program3Title: string;
  program3Price: string;
  program3Description: string;
  instagramUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  bookingLink: string;
  testimonialQuote: string;
  testimonialName: string;
  coachingStyle: CoachingStyle;
  wantsCustomDomain: boolean;
  wantsSmsAutomations: boolean;
  wantsAiAssistant: boolean;
  wantsCourses: boolean;
  wantsClientApp: boolean;
  primaryColor: PrimaryColorKey;
  backgroundStyle: BackgroundStyleKey;
}

interface FileState {
  profilePhoto: File | null;
  beforePhoto: File | null;
  afterPhoto: File | null;
}

const specialtyOptions: SpecialtyOption[] = [
  "Strength Training",
  "Weight Loss",
  "Women's Fitness",
  "Hypertrophy",
  "Athlete Training",
  "Lifestyle Coaching",
  "Mobility & Recovery",
  "General Fitness",
];

const TrainerWebsiteForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    specialty: "",
    program1Title: "",
    program1Price: "",
    program1Description: "",
    program2Title: "",
    program2Price: "",
    program2Description: "",
    program3Title: "",
    program3Price: "",
    program3Description: "",
    instagramUrl: "",
    tiktokUrl: "",
    youtubeUrl: "",
    bookingLink: "",
    testimonialQuote: "",
    testimonialName: "",
    coachingStyle: "",
    wantsCustomDomain: false,
    wantsSmsAutomations: false,
    wantsAiAssistant: false,
    wantsCourses: false,
    wantsClientApp: false,
    primaryColor: "orange",
    backgroundStyle: "dark",
  });

  const [files, setFiles] = useState<FileState>({
    profilePhoto: null,
    beforePhoto: null,
    afterPhoto: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: fileList } = e.target;
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];

    setFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!form.businessName.trim()) newErrors.businessName = "Business name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!form.location.trim()) newErrors.location = "Location is required.";
    if (!files.profilePhoto) newErrors.profilePhoto = "Profile photo is required.";
    if (!form.bio.trim()) newErrors.bio = "Short bio is required.";
    if (!form.specialty) newErrors.specialty = "Please select a specialty.";
    if (!form.program1Title.trim()) newErrors.program1Title = "Program 1 title is required.";
    if (!form.program1Price.trim()) newErrors.program1Price = "Program 1 price is required.";
    if (!form.program1Description.trim())
      newErrors.program1Description = "Program 1 description is required.";
    if (!form.instagramUrl.trim()) newErrors.instagramUrl = "Instagram URL is required.";
    if (!form.bookingLink.trim()) newErrors.bookingLink = "Booking link is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from('trainer-submissions')
      .upload(fileName, file);

    if (error) {
      console.error('File upload error:', error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('trainer-submissions')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);
    setSubmitError(null);

    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload files first
      let profilePhotoUrl: string | null = null;
      let beforePhotoUrl: string | null = null;
      let afterPhotoUrl: string | null = null;

      if (files.profilePhoto) {
        profilePhotoUrl = await uploadFile(files.profilePhoto, 'profile-photos');
      }
      if (files.beforePhoto) {
        beforePhotoUrl = await uploadFile(files.beforePhoto, 'before-photos');
      }
      if (files.afterPhoto) {
        afterPhotoUrl = await uploadFile(files.afterPhoto, 'after-photos');
      }

      // Call edge function
      const { data, error } = await supabase.functions.invoke('trainer-intake', {
        body: {
          ...form,
          profilePhotoUrl,
          beforePhotoUrl,
          afterPhotoUrl,
        },
      });

      if (error) {
        throw new Error(error.message || 'Submission failed');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Submission failed');
      }

      // Redirect to success page
      navigate('/claim/success');

    } catch (err: unknown) {
      console.error(err);
      setSubmitError("Something went wrong submitting your info. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (field: string) =>
    errors[field] ? (
      <p className="mt-1 text-sm text-red-400">{errors[field]}</p>
    ) : null;

  const inputBaseClass = "mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary";
  const inputErrorClass = "border-red-500";
  const inputNormalClass = "border-border";

  return (
    <div className="w-full">
      <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
        Claim Your Free Trainer Website
      </h2>
      <p className="text-sm sm:text-base text-foreground/70 mb-6">
        Fill out this quick form and we'll build your done-for-you website in the next 24
        hours. No cost, no contracts.
      </p>

      {submitSuccess && (
        <div className="mb-4 rounded-lg border border-emerald-400/40 bg-emerald-900/30 px-4 py-3 text-sm text-emerald-100">
          Thanks! We got your info. You'll receive a confirmation email shortly.
        </div>
      )}

      {submitError && (
        <div className="mb-4 rounded-lg border border-red-500/40 bg-red-900/40 px-4 py-3 text-sm text-red-100">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Trainer Identity */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-3">Trainer Info</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground/90">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={`${inputBaseClass} ${errors.fullName ? inputErrorClass : inputNormalClass}`}
                placeholder="Ava Johnson"
              />
              {renderError("fullName")}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/90">
                Coaching Brand Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                className={`${inputBaseClass} ${errors.businessName ? inputErrorClass : inputNormalClass}`}
                placeholder="AvaFit Coaching"
              />
              {renderError("businessName")}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/90">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`${inputBaseClass} ${errors.email ? inputErrorClass : inputNormalClass}`}
                placeholder="you@example.com"
              />
              {renderError("email")}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/90">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`${inputBaseClass} ${errors.phone ? inputErrorClass : inputNormalClass}`}
                placeholder="(555) 123-4567"
              />
              {renderError("phone")}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground/90">
                Location (City, State) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className={`${inputBaseClass} ${errors.location ? inputErrorClass : inputNormalClass}`}
                placeholder="Chicago, IL"
              />
              {renderError("location")}
            </div>
          </div>
        </section>

        {/* Branding & Bio */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-3">Branding & Bio</h3>
          
          {/* Color Theme Picker */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground/90 mb-3">
              Choose Your Website Colors
            </label>
            
            {/* Primary Color Selection */}
            <div className="mb-4">
              <span className="text-xs text-foreground/60 uppercase tracking-wide">Primary Color</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {(Object.entries(primaryColors) as [PrimaryColorKey, typeof primaryColors[PrimaryColorKey]][]).map(([key, color]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, primaryColor: key }))}
                    className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                      form.primaryColor === key 
                        ? "border-foreground scale-110 ring-2 ring-foreground/20" 
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {form.primaryColor === key && (
                      <svg className="w-5 h-5 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-foreground/50 mt-1">
                Selected: {primaryColors[form.primaryColor].name}
              </p>
            </div>

            {/* Background Style Selection */}
            <div>
              <span className="text-xs text-foreground/60 uppercase tracking-wide">Background Style</span>
              <div className="flex gap-3 mt-2">
                {(Object.entries(backgroundStyles) as [BackgroundStyleKey, typeof backgroundStyles[BackgroundStyleKey]][]).map(([key, style]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, backgroundStyle: key }))}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      form.backgroundStyle === key
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-8 h-8 rounded-md border ${key === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-300'}`}
                      />
                      <span className="text-sm font-medium text-foreground">{style.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="mt-4 p-4 rounded-lg border border-border">
              <span className="text-xs text-foreground/60 uppercase tracking-wide">Preview</span>
              <div 
                className="mt-2 p-4 rounded-lg flex items-center gap-3"
                style={{ 
                  backgroundColor: form.backgroundStyle === 'dark' ? '#0a0a0f' : '#ffffff',
                  border: `1px solid ${form.backgroundStyle === 'dark' ? '#1f1f2e' : '#e5e5e5'}`
                }}
              >
                <div 
                  className="w-12 h-12 rounded-full"
                  style={{ backgroundColor: primaryColors[form.primaryColor].hex }}
                />
                <div>
                  <p style={{ color: form.backgroundStyle === 'dark' ? '#ffffff' : '#0a0a0f' }} className="font-semibold">
                    {form.businessName || "Your Brand"}
                  </p>
                  <p style={{ color: form.backgroundStyle === 'dark' ? '#888' : '#666' }} className="text-sm">
                    {form.specialty || "Your Specialty"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground/90">
                Profile Photo <span className="text-red-400">*</span>
              </label>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleFileChange}
                className={`mt-1 block w-full text-sm text-foreground/80 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90 ${
                  errors.profilePhoto ? "border border-red-500 rounded-lg" : ""
                }`}
              />
              {renderError("profilePhoto")}
              <p className="mt-1 text-xs text-foreground/50">
                Clear headshot or training photo. This appears in the hero section.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/90">
                Specialty / Niche <span className="text-red-400">*</span>
              </label>
              <select
                name="specialty"
                value={form.specialty}
                onChange={handleChange}
                className={`${inputBaseClass} ${errors.specialty ? inputErrorClass : inputNormalClass}`}
              >
                <option value="">Select your main focus</option>
                {specialtyOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {renderError("specialty")}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-foreground/90">
              Short Bio (2–3 sentences) <span className="text-red-400">*</span>
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              className={`${inputBaseClass} ${errors.bio ? inputErrorClass : inputNormalClass}`}
              placeholder="Tell us who you coach, how you help, and what makes your approach different."
            />
            {renderError("bio")}
          </div>
        </section>

        {/* Programs */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-3">Programs</h3>
          <p className="text-sm text-foreground/70 mb-3">
            These become the program cards on your website. You can start with just one and add more
            later.
          </p>

          {/* Program 1 */}
          <div className="rounded-xl border border-border bg-card p-4 mb-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">Program 1 (Required)</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground/90">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="program1Title"
                  value={form.program1Title}
                  onChange={handleChange}
                  className={`${inputBaseClass} ${errors.program1Title ? inputErrorClass : inputNormalClass}`}
                  placeholder="12-Week Strength Transformation"
                />
                {renderError("program1Title")}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/90">
                  Price (per month or full) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="program1Price"
                  value={form.program1Price}
                  onChange={handleChange}
                  className={`${inputBaseClass} ${errors.program1Price ? inputErrorClass : inputNormalClass}`}
                  placeholder="249"
                />
                {renderError("program1Price")}
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-foreground/90">
                Short Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="program1Description"
                value={form.program1Description}
                onChange={handleChange}
                rows={3}
                className={`${inputBaseClass} ${errors.program1Description ? inputErrorClass : inputNormalClass}`}
                placeholder="What's included, who it's for, and what results they can expect."
              />
              {renderError("program1Description")}
            </div>
          </div>

          {/* Program 2 */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-4 mb-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">Program 2 (Optional)</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground/90">Title</label>
                <input
                  type="text"
                  name="program2Title"
                  value={form.program2Title}
                  onChange={handleChange}
                  className={`${inputBaseClass} ${inputNormalClass}`}
                  placeholder="Busy Professional Program"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/90">Price</label>
                <input
                  type="text"
                  name="program2Price"
                  value={form.program2Price}
                  onChange={handleChange}
                  className={`${inputBaseClass} ${inputNormalClass}`}
                  placeholder="199"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-foreground/90">Short Description</label>
              <textarea
                name="program2Description"
                value={form.program2Description}
                onChange={handleChange}
                rows={3}
                className={`${inputBaseClass} ${inputNormalClass}`}
                placeholder="Who is this for and what problem does it solve?"
              />
            </div>
          </div>

          {/* Program 3 */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">Program 3 (Optional)</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground/90">Title</label>
                <input
                  type="text"
                  name="program3Title"
                  value={form.program3Title}
                  onChange={handleChange}
                  className={`${inputBaseClass} ${inputNormalClass}`}
                  placeholder="Online Coaching Lite"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/90">Price</label>
                <input
                  type="text"
                  name="program3Price"
                  value={form.program3Price}
                  onChange={handleChange}
                  className={`${inputBaseClass} ${inputNormalClass}`}
                  placeholder="129"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-foreground/90">Short Description</label>
              <textarea
                name="program3Description"
                value={form.program3Description}
                onChange={handleChange}
                rows={3}
                className={`${inputBaseClass} ${inputNormalClass}`}
                placeholder="Beginner-friendly offer or low-touch option."
              />
            </div>
          </div>
        </section>

        {/* Social & Links */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-3">Social & Booking</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground/90">
                Instagram URL <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                name="instagramUrl"
                value={form.instagramUrl}
                onChange={handleChange}
                className={`${inputBaseClass} ${errors.instagramUrl ? inputErrorClass : inputNormalClass}`}
                placeholder="https://instagram.com/yourhandle"
              />
              {renderError("instagramUrl")}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/90">
                Booking Link <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                name="bookingLink"
                value={form.bookingLink}
                onChange={handleChange}
                className={`${inputBaseClass} ${errors.bookingLink ? inputErrorClass : inputNormalClass}`}
                placeholder="https://calendly.com/you/consult"
              />
              {renderError("bookingLink")}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/90">TikTok URL</label>
              <input
                type="url"
                name="tiktokUrl"
                value={form.tiktokUrl}
                onChange={handleChange}
                className={`${inputBaseClass} ${inputNormalClass}`}
                placeholder="https://tiktok.com/@yourhandle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/90">YouTube URL</label>
              <input
                type="url"
                name="youtubeUrl"
                value={form.youtubeUrl}
                onChange={handleChange}
                className={`${inputBaseClass} ${inputNormalClass}`}
                placeholder="https://youtube.com/@yourchannel"
              />
            </div>
          </div>
        </section>

        {/* Results & Testimonials */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Results & Testimonials <span className="text-foreground/50 text-xs font-normal">(optional)</span>
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground/90">Before Photo</label>
              <input
                type="file"
                name="beforePhoto"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-foreground/80 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/90">After Photo</label>
              <input
                type="file"
                name="afterPhoto"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-foreground/80 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground/90">Testimonial Quote</label>
              <textarea
                name="testimonialQuote"
                value={form.testimonialQuote}
                onChange={handleChange}
                rows={3}
                className={`${inputBaseClass} ${inputNormalClass}`}
                placeholder="I finally feel confident in my body again thanks to coaching."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/90">Client Name</label>
              <input
                type="text"
                name="testimonialName"
                value={form.testimonialName}
                onChange={handleChange}
                className={`${inputBaseClass} ${inputNormalClass}`}
                placeholder="Mia R."
              />
            </div>
          </div>
        </section>

        {/* Advanced Options */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Advanced Options{" "}
            <span className="text-foreground/50 text-xs font-normal">(optional, for future upgrades)</span>
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground/90">Coaching Style</label>
              <select
                name="coachingStyle"
                value={form.coachingStyle}
                onChange={handleChange}
                className={`${inputBaseClass} ${inputNormalClass}`}
              >
                <option value="">Select one</option>
                <option value="Online Only">Online Only</option>
                <option value="Hybrid">Hybrid</option>
                <option value="In-Person Only">In-Person Only</option>
              </select>
            </div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <label className="flex items-center gap-2 text-sm text-foreground/90">
              <input
                type="checkbox"
                name="wantsCustomDomain"
                checked={form.wantsCustomDomain}
                onChange={handleChange}
                className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
              />
              <span>Interested in a custom domain later</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground/90">
              <input
                type="checkbox"
                name="wantsSmsAutomations"
                checked={form.wantsSmsAutomations}
                onChange={handleChange}
                className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
              />
              <span>Interested in SMS automations</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground/90">
              <input
                type="checkbox"
                name="wantsAiAssistant"
                checked={form.wantsAiAssistant}
                onChange={handleChange}
                className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
              />
              <span>Interested in AI trainer assistant</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground/90">
              <input
                type="checkbox"
                name="wantsCourses"
                checked={form.wantsCourses}
                onChange={handleChange}
                className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
              />
              <span>Interested in hosted courses/programs</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground/90">
              <input
                type="checkbox"
                name="wantsClientApp"
                checked={form.wantsClientApp}
                onChange={handleChange}
                className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
              />
              <span>Interested in a client app</span>
            </label>
          </div>
        </section>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Claim My Free Website"}
          </button>
          <p className="mt-2 text-xs text-foreground/50">
            By submitting, you&apos;re agreeing to be contacted about your free website and related
            TrainU services.
          </p>
        </div>
      </form>
    </div>
  );
};

export default TrainerWebsiteForm;
