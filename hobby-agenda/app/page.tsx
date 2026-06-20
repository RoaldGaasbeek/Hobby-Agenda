"use client";

import { useMemo, useState } from "react";

import ActivityCard from "@/components/ActivityCard";
import CategoryFilter from "@/components/CategoryFilter";
import ViewToggle from "@/components/ViewToggle";
import AgendaView from "@/components/AgendaView";
import CalendarView from "@/components/CalendarView";

import { categories } from "@/lib/categories";
import { Activity } from "@/types/activity";
import { getActivities } from "@/lib/storage";

export default function HomePage() {

  const [activities] = useState<Activity[]>(() => {
    if (typeof window === "undefined") return [];
    return getActivities();
  });

  const [view, setView] = useState<"agenda" | "calendar">(
    "agenda",
  );

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const filteredActivities = useMemo(() => {
    return activities
      .filter((activity) =>
        selectedCategory === "all"
          ? true
          : activity.categoryId === selectedCategory,
      )
      .sort((a, b) =>
        `${a.date}${a.time}`.localeCompare(
          `${b.date}${b.time}`,
        ),
      );
  }, [activities, selectedCategory]);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">
          Hobby Agenda
        </h1>

        <p className="text-gray-600">
          Plan and track your hobby activities.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ViewToggle
          view={view}
          onChange={setView}
        />

        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {view === "agenda" ? (
        <AgendaView
          activities={filteredActivities}
          categories={categories}
        />
      ) : (
        <CalendarView
          activities={filteredActivities}
        />
      )}
    </main>
  );
}
