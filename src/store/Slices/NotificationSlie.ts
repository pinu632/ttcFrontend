import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../Axios/axiosInstance";

export interface NotificationPayload {
    _id: string;

    user: string;          // user receiving the notification
    userModel: string;     // "Guard" | "Admin" | "Host" etc.

    title: string;
    message: string;
    type?: string;         // e.g., VISITOR_NO_SHOW

    relatedAppointment?: {
        _id: string;
        purpose?: string;
    };

    relatedVisitor?: {
        _id: string;
        name: string;
        phone?: string;
        photo?: string;
    };

    relatedHost?: {
        _id: string;
        name: string;
        department?: string;
        photo?: string | null;
    };

    isRead: boolean;
    isSilent?: boolean;

    createdAt: string;
    updatedAt: string;
}



interface NotificationState {
    notifications: NotificationPayload[];
    unreadCount: number;
    loading: boolean;
}

const initialState: NotificationState = {
    notifications: [],
    unreadCount: 0,
    loading: false,
};



// Thunk to fetch notifications from backend
export const fetchNotifications = createAsyncThunk<
    NotificationPayload[],   // return type
    string,                  // argument type (userId)
    { rejectValue: string }  // error type
>(
    "notifications/fetchNotifications",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await api.post("/notification/list", {
                filter: { user: userId },
            });

            return res.data.data as NotificationPayload[];
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to load notifications");
        }
    }
);


export const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        // Store notifications coming from DB
        setNotifications: (state, action: PayloadAction<NotificationPayload[]>) => {
            // Sort newest first
            state.notifications = action.payload.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            state.unreadCount = state.notifications.filter(n => !n.isRead).length;
        },

        // Add real-time notification
        addNotification: (state, action: PayloadAction<NotificationPayload>) => {
            state.notifications.unshift(action.payload); // add to top
            state.unreadCount += 1;
        },

        // Mark single notification as read
        markAsRead: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const notif = state.notifications.find(n => n._id === id);
            if (notif && !notif.isRead) {
                notif.isRead = true;
                state.unreadCount -= 1;
            }
        },

        // Mark all read
        markAllRead: (state) => {
            state.notifications.forEach(n => (n.isRead = true));
            state.unreadCount = 0;
        },

        // Clear notifications from UI
        clearNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;

                // Sort newest first
                state.notifications = action.payload.sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );

                state.unreadCount = state.notifications.filter(n => !n.isRead).length;
            })
            .addCase(fetchNotifications.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const {
    setNotifications,
    addNotification,
    markAsRead,
    markAllRead,
    clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
