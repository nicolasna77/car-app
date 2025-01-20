import { getCars } from "./actions";
import AddCarForm from "@/components/form/AddCarForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CalculateTimeForm from "@/components/form/CalculateTimeForm";
import { CarList } from "@/components/CarList";

export default async function Cars() {
  const result = await getCars();
  return (
    <div className="py-8 space-y-8">
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="w-full h-full">
          <CardHeader>
            <h1 className="text-2xl font-bold">Gestion des voitures</h1>
          </CardHeader>
          <CardContent>
            <AddCarForm />
          </CardContent>
        </Card>

        <Card className="w-full h-full">
          <CardHeader>
            <h2 className="text-2xl font-bold">Calculer le temps de trajet</h2>
          </CardHeader>
          <CardContent>
            <CalculateTimeForm cars={result.data} />
          </CardContent>
        </Card>
      </div>

      <CarList Cars={result.data} />
    </div>
  );
}
