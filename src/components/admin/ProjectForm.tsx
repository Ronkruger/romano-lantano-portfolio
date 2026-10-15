import { Image, Save, Upload, X } from 'lucide-react';
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import type { ProjectFormValues } from '../../api/admin';
import { uploadProjectImage } from '../../api/admin';

interface ProjectFormProps {
  initialValues: ProjectFormValues;
  mode: 'create' | 'edit';
  saving: boolean;
  onCancel: () => void;
  onSubmit: (values: ProjectFormValues) => Promise<void>;
}

const slugify = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const joinList = (items: string[]) => items.join('\n');

const splitList = (value: string) => value.split('\n').map((item) => item.trim()).filter(Boolean);

const inputClass = 'mt-2 min-h-11 w-full rounded-md border border-white/10 bg-dark-bg/75 px-3 py-2 text-sm text-text-light outline-none transition placeholder:text-text-muted/60 focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20';
const labelClass = 'text-xs font-semibold uppercase tracking-[0.18em] text-text-muted';

const ProjectForm = ({ initialValues, mode, saving, onCancel, onSubmit }: ProjectFormProps) => {
  const [formValues, setFormValues] = useState<ProjectFormValues>(initialValues);
  const [stackText, setStackText] = useState(joinList(initialValues.stack));
  const [highlightsText, setHighlightsText] = useState(joinList(initialValues.highlights));
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    setFormValues(initialValues);
    setStackText(joinList(initialValues.stack));
    setHighlightsText(joinList(initialValues.highlights));
    setUploadError('');
  }, [initialValues]);

  const previewUrl = useMemo(() => formValues.imageUrl.trim(), [formValues.imageUrl]);

  const updateField = (field: keyof ProjectFormValues, value: string | number | boolean | null) => {
    setFormValues((currentValues) => ({ ...currentValues, [field]: value }));
  };

  const updateTitle = (title: string) => {
    setFormValues((currentValues) => {
      const nextValues = { ...currentValues, title };

      if (mode === 'create' && (!currentValues.slug || currentValues.slug === slugify(currentValues.title))) {
        nextValues.slug = slugify(title);
      }

      return nextValues;
    });
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const uploadResult = await uploadProjectImage(file);
      setFormValues((currentValues) => ({
        ...currentValues,
        imageUrl: uploadResult.imageUrl,
        imagePublicId: uploadResult.imagePublicId,
      }));
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed.');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({ ...formValues, stack: splitList(stackText), highlights: splitList(highlightsText) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-white/10 bg-surface-raised/75 p-5 shadow-editorial lg:p-6">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-primary">{mode === 'create' ? 'New project' : 'Edit project'}</p>
          <h2 className="mt-2 text-2xl font-semibold text-text-light">{formValues.title || 'Project details'}</h2>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-text-muted transition hover:border-accent-primary/60 hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/70"
        >
          <X size={17} aria-hidden="true" />
          Close
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className={labelClass}>Title</span>
          <input className={inputClass} value={formValues.title} onChange={(event) => updateTitle(event.target.value)} required />
        </label>
        <label>
          <span className={labelClass}>Slug</span>
          <input className={inputClass} value={formValues.slug} onChange={(event) => updateField('slug', slugify(event.target.value))} required />
        </label>
        <label>
          <span className={labelClass}>Eyebrow</span>
          <input className={inputClass} value={formValues.eyebrow} onChange={(event) => updateField('eyebrow', event.target.value)} required />
        </label>
        <label>
          <span className={labelClass}>Role</span>
          <input className={inputClass} value={formValues.role} onChange={(event) => updateField('role', event.target.value)} required />
        </label>
        <label>
          <span className={labelClass}>Timeframe</span>
          <input className={inputClass} value={formValues.timeframe} onChange={(event) => updateField('timeframe', event.target.value)} required />
        </label>
        <label>
          <span className={labelClass}>Accent</span>
          <div className="mt-2 flex min-h-11 rounded-md border border-white/10 bg-dark-bg/75 focus-within:border-accent-primary/70 focus-within:ring-2 focus-within:ring-accent-primary/20">
            <input aria-label="Project accent color" type="color" value={formValues.accent} onChange={(event) => updateField('accent', event.target.value)} className="h-11 w-14 cursor-pointer border-0 bg-transparent p-2" />
            <input className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-text-light outline-none" value={formValues.accent} onChange={(event) => updateField('accent', event.target.value)} required />
          </div>
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Summary</span>
        <textarea className={`${inputClass} min-h-24 resize-y`} value={formValues.summary} onChange={(event) => updateField('summary', event.target.value)} required />
      </label>

      <label className="block">
        <span className={labelClass}>Description</span>
        <textarea className={`${inputClass} min-h-24 resize-y`} value={formValues.description} onChange={(event) => updateField('description', event.target.value)} required />
      </label>

      <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border border-white/10 bg-dark-bg/55 p-3">
          {previewUrl ? (
            <img src={previewUrl} alt="Project preview" className="aspect-[16/10] w-full rounded-md object-cover" />
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center rounded-md border border-dashed border-white/15 text-text-muted">
              <Image size={26} aria-hidden="true" />
            </div>
          )}
        </div>
        <div>
          <label className="block">
            <span className={labelClass}>Image URL</span>
            <input className={inputClass} value={formValues.imageUrl} onChange={(event) => updateField('imageUrl', event.target.value)} required />
          </label>
          <label className="mt-4 inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-highlight-blue/50 px-4 py-2 text-sm font-semibold text-highlight-blue transition hover:border-highlight-blue hover:bg-highlight-blue hover:text-dark-bg focus-within:ring-2 focus-within:ring-highlight-blue/70">
            <Upload size={17} aria-hidden="true" />
            {uploading ? 'Uploading...' : 'Upload image'}
            <input type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} disabled={uploading} />
          </label>
          {uploadError && <p className="mt-3 text-sm text-red-300" role="alert">{uploadError}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label>
          <span className={labelClass}>Source URL</span>
          <input className={inputClass} type="url" value={formValues.githubUrl} onChange={(event) => updateField('githubUrl', event.target.value)} required />
        </label>
        <label>
          <span className={labelClass}>Live URL</span>
          <input className={inputClass} type="url" value={formValues.demoUrl ?? ''} onChange={(event) => updateField('demoUrl', event.target.value)} />
        </label>
        <label>
          <span className={labelClass}>Admin URL</span>
          <input className={inputClass} type="url" value={formValues.demoAdminUrl ?? ''} onChange={(event) => updateField('demoAdminUrl', event.target.value)} />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className={labelClass}>Stack</span>
          <textarea className={`${inputClass} min-h-32 resize-y`} value={stackText} onChange={(event) => setStackText(event.target.value)} required />
        </label>
        <label>
          <span className={labelClass}>Highlights</span>
          <textarea className={`${inputClass} min-h-32 resize-y`} value={highlightsText} onChange={(event) => setHighlightsText(event.target.value)} required />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label>
          <span className={labelClass}>Problem</span>
          <textarea className={`${inputClass} min-h-32 resize-y`} value={formValues.problem} onChange={(event) => updateField('problem', event.target.value)} required />
        </label>
        <label>
          <span className={labelClass}>Solution</span>
          <textarea className={`${inputClass} min-h-32 resize-y`} value={formValues.solution} onChange={(event) => updateField('solution', event.target.value)} required />
        </label>
        <label>
          <span className={labelClass}>Outcome</span>
          <textarea className={`${inputClass} min-h-32 resize-y`} value={formValues.outcome} onChange={(event) => updateField('outcome', event.target.value)} required />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <label>
          <span className={labelClass}>Sort order</span>
          <input className={inputClass} type="number" min="0" value={formValues.sortOrder} onChange={(event) => updateField('sortOrder', Number(event.target.value))} />
        </label>
        <label className="flex min-h-11 items-center gap-3 rounded-md border border-white/10 bg-dark-bg/60 px-4 py-2 text-sm font-semibold text-text-light">
          <input type="checkbox" checked={formValues.featured} onChange={(event) => updateField('featured', event.target.checked)} className="h-4 w-4 accent-accent-primary" />
          Visible on portfolio
        </label>
      </div>

      <button
        type="submit"
        disabled={saving || uploading}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-accent-primary px-5 py-3 text-sm font-semibold text-dark-bg transition hover:bg-link-hover focus:outline-none focus:ring-2 focus:ring-accent-primary/70 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <Save size={17} aria-hidden="true" />
        {saving ? 'Saving...' : 'Save project'}
      </button>
    </form>
  );
};

export default ProjectForm;