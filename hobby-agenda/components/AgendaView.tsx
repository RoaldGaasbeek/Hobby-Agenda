import ActivityCard from "./ActivityCard";
import { Activity, Category } from "@/types/activity";

type Props = {
  activities: Activity[];
  categories: Category[];
};

export default function AgendaView({
  activities,
  categories,
}: Props) {
  const groupedActivities = activities.reduce<
    Record<string, Activity[]>
  >((acc, activity) => {
    if (!acc[activity.date]) {
      acc[activity.date] = [];
    }

    acc[activity.date].push(activity);

    return acc;
  }, {});

  const dates = Object.keys(groupedActivities).sort();

  return (
    <div className="space-y-6">
      {dates.map((date) => (
        <div key={date}>
          <h2 className="mb-3 text-lg font-semibold">
            {new Date(date).toLocaleDateString()}
          </h2>

          <div className="space-y-3">
            {groupedActivities[date].map((activity) => {
              const category = categories.find(
                (c) => c.id === activity.categoryId
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
        </div>
      ))}
    </div>
  );
}