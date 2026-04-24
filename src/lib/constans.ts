export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com/api';

export const STORAGE_KEY = {
    TOKEN : "lms_token",
    USER : "lms_user",
} as const;