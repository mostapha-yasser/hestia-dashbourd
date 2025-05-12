import { AlertTriangle } from "lucide-react";
import { ReactNode } from "react";

interface ErrorMessageProps {
  message: ReactNode;
  className?: string;
  iconSize?: number;
}

export function ErrorMessage({ 
  message, 
  className = "", 
  iconSize = 20 
}: ErrorMessageProps) {
  return (
    <div 
      className={`flex items-center gap-2 text-red-600 dark:text-red-400 ${className}`}
      role="alert"
      aria-live="polite"
    >
      <AlertTriangle size={iconSize} className="flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export default ErrorMessage;
