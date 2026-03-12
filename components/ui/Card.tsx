import { ReactNode, HTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  title?: string;
  icon?: LucideIcon;
  className?: string;
  contentClassName?: string;
  noPadding?: boolean;
}

export function Card({ 
  children, 
  title, 
  icon: Icon, 
  className = "", 
  contentClassName = "",
  noPadding = false,
  ...props
}: CardProps) {
  return (
    <div 
      className={`bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden ${className}`}
      {...props}
    >
      {(title || Icon) && (
        <div className="px-8 pt-8 pb-4 flex items-center gap-3 border-b border-gray-50 dark:border-gray-800/50 mb-2">
          {Icon && <Icon className="w-5 h-5 text-blue-600" />}
          {title && <h3 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h3>}
        </div>
      )}
      <div className={`${noPadding ? "" : (title || Icon ? "px-6 pb-6 pt-2" : "p-6")} ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`bg-primary/5 p-8 text-center border-b border-gray-100 dark:border-gray-800 ${className}`}>
      {children}
    </div>
  );
}
