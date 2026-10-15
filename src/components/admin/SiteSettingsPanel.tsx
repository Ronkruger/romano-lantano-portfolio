import { FileText, Globe, Loader2, Mail, MapPin, Save, Upload, User } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchAdminSettings, updateAdminSettings, uploadResume, type SiteSettingsValues } from '../../api/admin';

const SiteSettingsPanel = () => {
  const [settings, setSettings] = useState<SiteSettingsValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAdminSettings();
      setSettings(data);
    } catch {
      toast.error('Unable to load site settings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!settings) return;

    setSaving(true);

    try {
      const updated = await updateAdminSettings({
        name: settings.name,
        title: settings.title,
        location: settings.location,
        email: settings.email,
        intro: settings.intro,
        githubUrl: settings.githubUrl,
        linkedinUrl: settings.linkedinUrl,
        facebookUrl: settings.facebookUrl,
      });
      setSettings(updated);
      toast.success('Settings saved.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Unable to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const { settings: updated } = await uploadResume(file);
      setSettings(updated);
      toast.success('Resume uploaded successfully.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Unable to upload resume.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const updateField = (field: keyof SiteSettingsValues, value: string) => {
    setSettings((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  const fieldClass = 'min-h-11 w-full rounded-md border border-white/10 bg-dark-bg/75 px-3 py-2 text-sm text-text-light outline-none transition focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20';
  const labelClass = 'mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted';

  if (loading) {
    return (
      <section className="mt-8 rounded-lg border border-white/10 bg-surface-raised/75 p-6 shadow-editorial">
        <div className="animate-pulse space-y-4">
          <div className="h-5 w-40 rounded bg-white/10" />
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-11 rounded-md bg-white/5" />)}
          </div>
        </div>
      </section>
    );
  }

  if (!settings) return null;

  return (
    <section className="mt-8 rounded-lg border border-white/10 bg-surface-raised/75 p-6 shadow-editorial">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-text-light">Site Settings</h2>
          <p className="mt-1 text-sm text-text-muted">Edit your profile info, social links, and resume.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}><User size={14} aria-hidden="true" />Name</label>
            <input value={settings.name} onChange={(e) => updateField('name', e.target.value)} className={fieldClass} required />
          </div>
          <div>
            <label className={labelClass}><FileText size={14} aria-hidden="true" />Title</label>
            <input value={settings.title} onChange={(e) => updateField('title', e.target.value)} className={fieldClass} required />
          </div>
          <div>
            <label className={labelClass}><MapPin size={14} aria-hidden="true" />Location</label>
            <input value={settings.location} onChange={(e) => updateField('location', e.target.value)} className={fieldClass} required />
          </div>
          <div>
            <label className={labelClass}><Mail size={14} aria-hidden="true" />Email</label>
            <input type="email" value={settings.email} onChange={(e) => updateField('email', e.target.value)} className={fieldClass} required />
          </div>
        </div>

        <div>
          <label className={labelClass}>Intro / Bio</label>
          <textarea
            value={settings.intro}
            onChange={(e) => updateField('intro', e.target.value)}
            className={`${fieldClass} min-h-[80px] resize-y`}
            maxLength={500}
            placeholder="A short intro about yourself..."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className={labelClass}><Globe size={14} aria-hidden="true" />GitHub URL</label>
            <input value={settings.githubUrl} onChange={(e) => updateField('githubUrl', e.target.value)} className={fieldClass} placeholder="https://github.com/..." />
          </div>
          <div>
            <label className={labelClass}><Globe size={14} aria-hidden="true" />LinkedIn URL</label>
            <input value={settings.linkedinUrl} onChange={(e) => updateField('linkedinUrl', e.target.value)} className={fieldClass} placeholder="https://linkedin.com/in/..." />
          </div>
          <div>
            <label className={labelClass}><Globe size={14} aria-hidden="true" />Facebook URL</label>
            <input value={settings.facebookUrl} onChange={(e) => updateField('facebookUrl', e.target.value)} className={fieldClass} placeholder="https://facebook.com/..." />
          </div>
        </div>

        {/* Resume upload */}
        <div className="rounded-lg border border-white/10 bg-dark-bg/40 p-4">
          <label className={labelClass}><FileText size={14} aria-hidden="true" />Resume / CV</label>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {settings.resumeUrl && (
              <a
                href={settings.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs font-semibold text-text-light transition hover:border-accent-primary/60 hover:text-accent-primary"
              >
                <FileText size={14} aria-hidden="true" />
                View current resume
              </a>
            )}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs font-semibold text-text-muted transition hover:border-accent-primary/60 hover:text-accent-primary">
              <Upload size={14} aria-hidden="true" />
              {uploading ? 'Uploading...' : 'Upload new PDF'}
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleResumeUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
            {uploading && <Loader2 size={16} className="animate-spin text-accent-primary" />}
          </div>
          <p className="mt-2 text-xs text-text-muted">PDF only, max 10MB. Uploaded to S3.</p>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent-primary px-5 py-2 text-sm font-semibold text-dark-bg transition hover:bg-link-hover focus:outline-none focus:ring-2 focus:ring-accent-primary/70 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={16} aria-hidden="true" />
            {saving ? 'Saving...' : 'Save settings'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SiteSettingsPanel;
