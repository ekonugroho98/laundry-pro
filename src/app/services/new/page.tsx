"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { SwissButton } from "@/components/ui/button";
import { SwissInput } from "@/components/ui/input";
import { SwissTextarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { createService } from "@/app/services/action";

export default function NewServicePage() {
  const router = useRouter();
  const initialValues = {
    name: "",
    price: "",
    unit: "",
    description: "",
    isActive: true,
  };
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    const type = target.type;
    const checked = target.checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors((prev) => prev);

    const validated = {
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      unit: formData.unit.trim(),
      description: formData.description.trim(),
      isActive: formData.isActive,
    };

    const newErrors: Record<string, string> = {};
    if (!validated.name) newErrors.name = "Name is required";
    if (isNaN(validated.price) || validated.price < 0) newErrors.price = "Price must be positive";
    if (!validated.unit) newErrors.unit = "Unit is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("name", validated.name);
      data.append("price", validated.price.toString());
      data.append("unit", validated.unit);
      data.append("description", validated.description);
      data.append("isActive", validated.isActive ? "true" : "false");
      
      await createService(data);
      router.push("/services");
    } catch {
      setErrors({ ...errors, server: "Failed to create service" });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[rgb(var(--swiss-paper))]">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <div className="flex items-center mb-8 gap-4">
            <SwissButton variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </SwissButton>
          </div>
          <h1 className="swiss-display text-4xl uppercase tracking-tight mb-2">Add New Service</h1>
          <p className="text-[rgb(var(--swiss-muted))] text-lg mb-8">Complete the form to add a new service to your catalog.</p>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label className="swiss-eyebrow">Service Name</label>
              <SwissInput
                name="name"
                placeholder="e.g., Premium Wash & Fold"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-[rgb(var(--swiss-accent))] text-sm">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="swiss-eyebrow">Price (Rp)</label>
                <SwissInput
                  name="price"
                  type="number"
                  placeholder="150000"
                  value={formData.price}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.price && <p className="text-[rgb(var(--swiss-accent))] text-sm">{errors.price}</p>}
              </div>
              <div className="space-y-2">
                <label className="swiss-eyebrow">Unit</label>
                <SwissInput
                  name="unit"
                  placeholder="kg, pcs, loads"
                  value={formData.unit}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.unit && <p className="text-[rgb(var(--swiss-accent))] text-sm">{errors.unit}</p>}
              </div>
            </div>

            <div className="space-y-4">
              <label className="swiss-eyebrow">Description</label>
              <SwissTextarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.description && <p className="text-[rgb(var(--swiss-accent))] text-sm">{errors.description}</p>}
            </div>

            <div className="space-y-4 flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="mr-2"
                />
                <span className="swiss-eyebrow">Is Active</span>
              </label>
            </div>

            {errors.server && <p className="text-[rgb(var(--swiss-accent))] text-sm">{errors.server}</p>}

            <div className="flex items-end">
              <SwissButton type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Create Service"}
              </SwissButton>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
