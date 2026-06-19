"use client";

import { useMemo, useState } from "react";

import ActivityCard from "@/components/ActivityCard";
import CategoryFilter from "@/components/CategoryFilter";
import ViewToggle from "@/components/ViewToggle";

import { categories } from "@/lib/categories";
import { Activity } from "@/types/activity";
import { getActivities } from "@/lib/storage";

const activities: Activity[] = getActivities();

export default function HomePage() {
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
  }, [selectedCategory]);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">
          Hobby Planner
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
        <div className="space-y-4">
          {filteredActivities.map((activity) => {
            const category = categories.find(
              (c) => c.id === activity.categoryId,
            )!;

            return (
              <ActivityCard
                key={activity.id}
                activity={activity}
                category={category}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-xl font-semibold">
            Calendar View
          </h2>

          <div className="space-y-3">
            {filteredActivities.map((activity) => {
              const category = categories.find(
                (c) => c.id === activity.categoryId,
              )!;

              return (
                <div
                  key={activity.id}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`h-3 w-3 rounded-full ${category.color}`}
                  />

                  <span className="font-medium">
                    {activity.date}
                  </span>

                  <span>{activity.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
