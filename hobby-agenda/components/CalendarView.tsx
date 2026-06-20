"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  format,
  parse,
  startOfWeek,
  getDay,
} from "date-fns";

import { nl } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { Activity } from "@/types/activity";

const locales = {
  "nl": nl,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type Props = {
  activities: Activity[];
};

export default function CalendarView({ activities, }: Props) {
  const router = useRouter();
  const events = activities.map((activity) => {
    const start = new Date(
      `${activity.date}T${activity.time}`
    );

    const end = new Date(start);

    end.setHours(end.getHours() + 1);

    return {
      id: activity.id,
      title: activity.title,
      start,
      end,
    };
  });
  const [date, setDate] = useState(new Date());

  return (
    <div className="h-[700px] rounded-lg border bg-white p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        onNavigate={setDate}

        onSelectEvent={(event: Activity) =>
          router.push(`/activity/${event.id}`)
        }
      />
    </div>
  );
}