import bmwLogo from "@/assets/bmw-logo.png";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card shadow-sm">
      <div className="flex items-center gap-3">
        <img src={bmwLogo} alt="BMW Group" className="w-8 h-8 object-contain" />
        <h1 className="text-sm font-semibold tracking-wide text-foreground">
          Executive Decision Matrix
        </h1>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-primary/20 bg-primary/5">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-medium tracking-widest uppercase text-primary">
          Clearance Level: Executive
        </span>
      </div>
    </header>
  );
};

export default Header;
