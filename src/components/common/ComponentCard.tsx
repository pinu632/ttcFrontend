interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
  buttonReq?:boolean
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  buttonReq=true
}) => {
  return (
    <div
      className={`
        rounded-xl border border-border 
        bg-card shadow-sm 
        ${className}
      `}
    >
      {/* Header */}
      <div className="px-6 py-5">
        <h3 className="text-base font-semibold text-foreground tracking-tight">
          {title}
        </h3>

        {desc && (
          <p className="mt-1 text-sm text-muted-foreground">
            {desc}
          </p>
        )}
      </div>

      {/* Add Button */}
      {buttonReq && <div className="px-6 pb-3">
        <a
          href={`/add-${title.toLowerCase()}`}
          className="
            inline-flex items-center justify-center
            px-4 py-2 text-sm font-medium rounded-md
            bg-primary text-primary-foreground
            hover:bg-primary/90
            transition-colors
          "
        >
          Add {title}
        </a>
      </div>}

      {/* Body */}
      <div className="p-6 border-t border-border">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
