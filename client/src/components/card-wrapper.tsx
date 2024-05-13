import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Header from "./header";
import BackButton from "./back-button";

type Props = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
};

const CardWrapper = ({
  children,
  backButtonHref,
  backButtonLabel,
  headerLabel,
}: Props) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref}></BackButton>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
