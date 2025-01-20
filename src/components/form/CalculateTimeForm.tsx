"use client";

import { Car } from "@/lib/type/car";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { calculateTime } from "@/app/actions";
import { useState } from "react";

interface TimeCalculation {
  distance: number;
  model: string;
}

const schema = yup.object().shape({
  distance: yup
    .number()
    .typeError("La distance doit être un nombre")
    .positive("La distance doit être positive")
    .required("La distance est obligatoire"),
  model: yup.string().required("Le modèle est obligatoire"),
});

const CalculateTimeForm = ({ cars }: { cars: Car[] }) => {
  const [result, setResult] = useState<string | null>(null);

  const onSubmit = async (data: TimeCalculation) => {
    const result = await calculateTime(data);

    if (result.success) {
      setResult(result.time);
      toast.success("Temps de trajet calculé avec succès");
    } else {
      toast.error(result.error);
    }
  };

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      distance: 0,
      model: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="distance"
          render={({ field }) => (
            <FormItem>
              <Label>Distance (km)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Distance (km)"
                  {...field}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <Label>Modèle</Label>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une voiture" />
                  </SelectTrigger>
                  <SelectContent>
                    {cars.map((car) => (
                      <SelectItem key={car.id} value={car.model}>
                        {car.model} - {car.speed} km/h
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Calculer</Button>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded">
          Temps estimé : {result}
        </div>
      )}
    </Form>
  );
};
export default CalculateTimeForm;
