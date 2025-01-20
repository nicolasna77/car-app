"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditCarForm from "./form/EditCarForm";
import { Car } from "@/lib/type/car";
import { toast } from "sonner";
import { deleteCar, editCar } from "@/app/actions";
import { Trash2Icon } from "lucide-react";

export function CarList({ Cars }: { Cars: Car[] }) {
  const [editingCarId, setEditingCarId] = useState<number | null>(null);

  const onDelete = async (id: number) => {
    const result = await deleteCar(id);
    if (result.success) {
      toast.success("Voiture supprimée avec succès");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Liste des voitures</h2>
          <span> {Cars.length} resultats</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Cars.length > 0 ? (
            Cars.map((car) => (
              <div key={car.id} className="p-4 border rounded">
                {editingCarId === car.id ? (
                  <EditCarForm
                    car={car}
                    onSubmit={async (id, data) => {
                      const result = await editCar(id, data);
                      if (result.success) {
                        setEditingCarId(null);
                        toast.success("Voiture modifiée avec succès");
                      } else {
                        toast.error(result.error);
                      }
                    }}
                    onCancel={() => setEditingCarId(null)}
                  />
                ) : (
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg ">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {car.model}
                        <span className="ml-2 font-bold text-blue-600">
                          {car.speed} km/h
                        </span>
                      </h3>
                      {car.features && (
                        <p className="mt-1 text-sm text-gray-600">
                          {car.features}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setEditingCarId(car.id)}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onDelete(car.id)}
                      >
                        <Trash2Icon />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex justify-center py-32 items-center h-full">
              <span className="text-gray-500">Aucune voiture trouvée</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
