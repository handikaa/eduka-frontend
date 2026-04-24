import { ButtonHTMLAttributes, HtmlHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: ButtonVariant;
    isLoading?: boolean ; 

}

export function Button ({
    children, 
    variant = "primary", 
    isLoading = false,
    disabled, 
    className ="",
    ...props
}: ButtonProps){

    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        danger: "bg-red-600 text-white hover:bg-red-700",   
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-100"
    }

    return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} 
        disabled={disabled || isLoading}
        {...props}>
        {isLoading ? "Loading..." : children}
    </button>
    )

}