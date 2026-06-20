"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Activity } from "@/types/activity";
import { categories } from "@/lib/categories";
import { getActivities, saveActivities } from "@/lib/storage";

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [activities, setActivities] = useState<Activity[]>(() => {
    if (typeof window === "undefined") return [];
    return getActivities();
  });

  const activity = useMemo(() => {
    return activities.find((a) => a.id === id);
  }, [activities, id]);

  const category = useMemo(() => {
    if (!activity) return null;
    return categories.find((c) => c.id === activity.categoryId);
  }, [activity]);

  function deleteActivity() {
    const updated = activities.filter((a) => a.id !== id);

    saveActivities(updated);

    router.push("/");
  }

  if (!activity) {
    return (
      <main className="p-6">
        <p>Activity not found.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 rounded bg-black px-4 py-2 text-white"
        >
          Back
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <button
        onClick={() => router.push("/")}
        className="mb-6 text-sm text-blue-600"
      >
        ← Back
      </button>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full`}
            style={{ backgroundColor: category?.color}}
          />
          <span className="text-sm text-gray-600">
            {category?.name ?? "Unknown"}
          </span>
        </div>

        <h1 className="mb-2 text-2xl font-bold">
          {activity.title}
        </h1>

        <p className="mb-4 text-gray-500">
          {activity.date} • {activity.time}
        </p>

        {activity.description && (
          <div className="mb-6">
            <h2 className="mb-1 font-semibold">Notes</h2>
            <p className="text-gray-700">{activity.description}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() =>
              router.push(`/edit/${activity.id}`)
            }
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Edit
          </button>

          <button
            onClick={deleteActivity}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </main>
  );
}