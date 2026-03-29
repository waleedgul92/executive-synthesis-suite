import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-electric/20 border border-electric/30 flex items-center justify-center">
          <Shield className="w-4 h-4 text-electric" />
        </div>
        <h1 className="text-sm font-semibold tracking-wide text-foreground">
          Executive Decision Matrix
        </h1>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-electric/20 bg-electric/5">
        <div className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
        <span className="text-xs font-medium tracking-widest uppercase text-electric/80">
          Clearance Level: Executive
        </span>
      </div>
    </header>
  );
};

export default Header;
