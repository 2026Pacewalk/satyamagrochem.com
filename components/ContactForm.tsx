"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", message: "" });

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text =
      `New enquiry for ${site.name}\n\n` +
      `Name: ${form.name}\n` +
      `Mobile: ${form.mobile}\n` +
      `Email: ${form.email}\n` +
      `Message: ${form.message}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  const fieldClass =
    "w-full rounded-xl border border-sand bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Name *</label>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={fieldClass} placeholder="Your name" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Mobile *</label>
          <input required value={form.mobile} onChange={(e) => update("mobile", e.target.value)} className={fieldClass} placeholder="Your mobile number" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Email</label>
        <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={fieldClass} placeholder="you@example.com" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Message *</label>
        <textarea required rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} className={fieldClass} placeholder="How can we help?" />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Send via WhatsApp
      </button>
      <p className="text-xs text-muted">
        Submitting opens WhatsApp with your message pre-filled to our team.
      </p>
    </form>
  );
}
