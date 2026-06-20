"use client";

import { useState } from "react";
import { Activity } from "@/types/activity";
import { categories } from "@/lib/categories";
import { useRouter } from "next/navigation";

type Props = {
  initialData?: Activity;
  onSubmit: (activity: Activity) => void;
};

export default function ActivityForm({initialData, onSubmit}: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [date, setDate] = useState(initialData?.date ?? "");
  const [time, setTime] = useState(initialData?.time ?? "");
  const [categoryId, setCategoryId] = useState(
    initialData?.categoryId ?? categories[0].id
  );
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const activity: Activity = {
      id: initialData?.id ?? crypto.randomUUID(),
      title,
      date,
      time,
      categoryId,
      description,
    };

    onSubmit(activity);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full rounded border p-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        className="w-full rounded border p-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="time"
        className="w-full rounded border p-2"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <select
        className="w-full rounded border p-2"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <textarea
        className="w-full rounded border p-2"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Save
      </button>
      <button
        type="button"
        className="rounded bg-red-600 px-4 py-2 text-white ml-4"
        onClick={() => router.back()}
      >
        Cancel
      </button>
    </form>
  );
}