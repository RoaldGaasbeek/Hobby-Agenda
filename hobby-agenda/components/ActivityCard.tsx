import { Activity, Category } from "@/types/activity";
import { useRouter } from "next/navigation";

type Props = {
  activity: Activity;
  category: Category;
};

export default function ActivityCard({activity, category}: Props) {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/activity/${activity.id}`)}>
      <div className="cursor-pointer rounded-lg border p-4 transition hover:shadow">
        <div className="mb-2 flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${category.color}`}
          />
          <span className="text-sm text-gray-600">
            {category.name}
          </span>
        </div>

        <h3 className="font-semibold">{activity.title}</h3>

        <p className="text-sm text-gray-500">
          {activity.date} • {activity.time}
        </p>
      </div>
    </div>
  );
}