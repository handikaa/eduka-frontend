import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: ButtonVariant;
    isLoading?: boolean;
};

export function Button({
    children,
    variant = "primary",
    isLoading = false,
    disabled,
    className = "",
    ...props
}: ButtonProps) {
    const baseClasses =
        "inline-flex items-center justify-center rounded-md transition-colors duration-200 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
        primary:
            "bg-secondary text-white hover:bg-[#FFFFFF] hover:text-secondary border border-secondary hover:border-secondary font-extrabold",
        secondary: "bg-gray-600 text-white hover:bg-gray-700 font-semibold",
        danger: "bg-red-600 text-white hover:bg-red-700 font-semibold",
        outline:
            "border border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold",
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? "Loading..." : children}
        </button>
    );
}