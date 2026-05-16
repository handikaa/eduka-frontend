import { AxiosError } from "axios";

type ApiErrorResponse = {
    success?: boolean;
    message?: string;
    errors?: Record<string, string[]>;
};

export function getApiErrorMessage(
    error: unknown,
    fallbackMessage = "Terjadi kesalahan. Silakan coba lagi."
): string {
    if (!(error instanceof AxiosError)) {
        return fallbackMessage;
    }

    const responseData = error.response?.data as ApiErrorResponse | undefined;

    if (!responseData) {
        return fallbackMessage;
    }

    const messages: string[] = [];

    if (responseData.message) {
        messages.push(responseData.message);
    }

    if (responseData.errors) {
        Object.entries(responseData.errors).forEach(([field, fieldMessages]) => {
            fieldMessages.forEach((message) => {
                messages.push(`${field}: ${message}`);
            });
        });
    }

    return messages.length > 0 ? messages.join("\n") : fallbackMessage;
}