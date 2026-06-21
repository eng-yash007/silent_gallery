"use client";

import { useEffect } from "react";
import { pollAndCreateNotifications } from "@/app/actions/notifications";

export default function NotificationPoller() {
  useEffect(() => {
    // Run immediately on mount
    const checkNotifications = async () => {
      const res = await pollAndCreateNotifications();
      if (res.success && res.newNotifications && res.newNotifications.length > 0) {
        // Trigger a UI popup for each new notification
        res.newNotifications.forEach((notif: any) => {
          let type = "system";
          if (notif.type === "meeting_soon") type = "meeting";
          if (notif.type === "task_overdue" || notif.type === "task_due_soon") type = "task";

          const event = new CustomEvent('trigger-notification', {
            detail: {
              id: notif.id,
              title: notif.title,
              description: notif.description,
              time: notif.timeString,
              type: type
            }
          });
          window.dispatchEvent(event);
        });
      }
    };

    checkNotifications();

    // Then poll every 60 seconds
    const interval = setInterval(checkNotifications, 60000);

    return () => clearInterval(interval);
  }, []);

  return null; // Hidden component
}
