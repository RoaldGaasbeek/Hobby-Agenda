"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";

import { Activity } from "@/types/activity";
import { getActivities, saveActivities } from "@/lib/storage";
import ActivityForm from "@/components/ActivityForm";

export default function EditActivityPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const activities = getActivities();

  const activity = useMemo(() => {
    return activities.find((a) => a.id === id);
  }, [activities, id]);

  function handleSave(updated: Activity) {
    const updatedList = activities.map((a) =>
      a.id === id ? updated : a
    );

    saveActivities(updatedList);

    router.push(`/activity/${updated.id}`);
  }

  if (!activity) {
    return (
      <main className="p-6">
        <p>Activity not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Edit activity
      </h1>

      <ActivityForm
        initialData={activity}
        onSubmit={handleSave}
      />
    </main>
  );
}