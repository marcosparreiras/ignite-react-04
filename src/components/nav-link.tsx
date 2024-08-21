import { Link, useLocation, type LinkProps } from "react-router-dom";

export function NavLink(props: LinkProps) {
  const location = useLocation();

  return (
    <Link
      data-current={location.pathname === props.to}
      {...props}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
    />
  );
}
