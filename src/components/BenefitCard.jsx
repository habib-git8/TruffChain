import { Card, CardContent, CardHeader, CardTitle } from './card';

export default function BenefitCard({ Icon, title, description }) {
  return (
    <Card className="max-w-[16rem]">
      <CardHeader>
        <Icon className="mx-auto mb-2 size-8 text-primary" />
        <CardTitle className="text-center text-lg text-[#424242]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
