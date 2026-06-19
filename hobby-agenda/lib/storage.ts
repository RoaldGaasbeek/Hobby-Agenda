import { Activity } from "@/types/activity";

const STORAGE_KEY = "activities";

export function getActivities(): Activity[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  return JSON.parse(raw);
}

export function saveActivities(
  activities: Activity[],
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(activities),
  );
}