import { Link } from "react-router-dom";
import { Button } from "./ui/button";

type Props = {
  label: string;
  href: string;
};

const BackButton = ({ href, label }: Props) => {
  return (
    <Button variant="link" size="sm" asChild className="font-normal w-full">
      <Link to={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
