import { Loader2 } from "lucide-react";

type LoadingProps = {
  text?: string;
};

export function Loading({ text = "Loading..." }: LoadingProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-6 text-gray-600">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-sm">{text}</span>
    </div>
  );
}