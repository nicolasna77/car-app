"use client";

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
import { Car } from "@/lib/type/car";

const schema = yup.object().shape({
  model: yup.string().required("Le modèle est obligatoire"),
  speed: yup
    .number()
    .typeError("La vitesse doit être un nombre")
    .positive("La vitesse doit être positive")
    .required("La vitesse est obligatoire"),
  features: yup.string(),
});

interface EditCarFormProps {
  car: Car;
  onSubmit: (id: number, data: Omit<Car, "id">) => Promise<void>;
  onCancel: () => void;
}

const EditCarForm = ({ car, onSubmit, onCancel }: EditCarFormProps) => {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      model: car.model,
      speed: car.speed,
      features: car.features || "",
    },
  });

  const handleSubmit = async (data: Omit<Car, "id">) => {
    await onSubmit(car.id, data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Modèle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="speed"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Vitesse (km/h)"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Caractéristiques" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit">Sauvegarder</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditCarForm;
