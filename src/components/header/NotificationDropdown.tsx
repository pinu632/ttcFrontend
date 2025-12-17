import {  useState } from "react";
import { Dropdown } from "./ui/dropdown/Dropdown";
import { DropdownItem } from "./ui/dropdown/DropdownItem";
import { Link } from "react-router";
import { useAppSelector, useAppDispatch } from "../../store/hook";

function timeAgo(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

import {
  markAsRead,
  markAllRead,
} from "../../store/Slices/NotificationSlie";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { notifications, unreadCount, loading } = useAppSelector(
    (s) => s.notification
  );

  const getInitials = (name = "") => {
    const parts = name.split(" ");
    return parts.map((p) => p[0]?.toUpperCase()).slice(0, 2).join("");
  };

  function toggleDropdown() {
    const next = !isOpen;
    setIsOpen(next);
    if (next) dispatch(markAllRead());
  }

  return (
    <div className="relative">
      {/* TRIGGER BUTTON */}
      <button
        onClick={toggleDropdown}
        className="
          relative flex items-center justify-center 
          h-11 w-11 rounded-full border border-border
          bg-card text-foreground
          hover:bg-muted transition-colors
        "
      >
        {unreadCount > 0 && (
          <span className="absolute right-0.5 top-0.5 w-2.5 h-2.5 rounded-full bg-primary">
            <span className="absolute w-full h-full bg-primary opacity-75 animate-ping rounded-full"></span>
          </span>
        )}

        {/* Bell Icon */}
        <svg width="20" height="20" className="fill-current">
          <path d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248Z" />
        </svg>
      </button>

      {/* DROPDOWN */}
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="
          absolute right-0 mt-3 w-[360px] h-[480px]
          rounded-xl border border-border 
          bg-popover text-popover-foreground
          dark:bg-popover
          shadow-lg p-4 flex flex-col
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
          <h5 className="text-lg font-semibold">Notifications</h5>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="p-4 text-center text-muted-foreground">
            Loading...
          </div>
        )}

        {/* EMPTY */}
        {!loading && notifications.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            No notifications found
          </div>
        )}

        {/* LIST */}
        <ul className="flex flex-col overflow-y-auto custom-scrollbar">
          {notifications.map((n: any) => (
            <li key={n._id}>
              <DropdownItem
                onItemClick={() => {
                  dispatch(markAsRead(n.id));
                  setIsOpen(false);
                }}
                className="
                  flex gap-3 p-3 rounded-lg border-b border-border 
                  hover:bg-muted transition-colors
                "
              >
                {/* Avatar */}
                <span
                  className="
                    h-10 w-10 rounded-full overflow-hidden border border-border 
                    flex items-center justify-center bg-muted
                  "
                >
                  {n.forUser?.photo ? (
                    <img
                      src={n.forUser.photo}
                      className="h-full w-full object-cover"
                      alt=""
                    />
                  ) : (
                    <span className="text-sm font-semibold">
                      {getInitials(n.relatedHost?.name)}
                    </span>
                  )}
                </span>

                {/* Content */}
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {n.relatedHost?.name}
                    </span>{" "}
                    — {n.message}
                  </span>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {timeAgo(n.createdAt)}

                    {!n.isRead && (
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                    )}
                  </div>
                </div>
              </DropdownItem>
            </li>
          ))}
        </ul>

        {/* VIEW ALL */}
        <Link
          to="/notifications"
          className="
            mt-4 text-center w-full py-2 text-sm rounded-lg
            bg-secondary text-secondary-foreground
            border border-border 
            hover:bg-accent hover:text-accent-foreground
            transition
          "
        >
          View All Notifications
        </Link>
      </Dropdown>
    </div>
  );
}

