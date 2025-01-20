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
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import { addCar } from "@/app/actions";

interface CarInput {
  model: string;
  speed: number;
  features?: string;
}

const schema = yup.object().shape({
  model: yup.string().required("Le modèle est obligatoire"),
  speed: yup
    .number()
    .typeError("La vitesse doit être un nombre")
    .positive("La vitesse doit être positive")
    .required("La vitesse est obligatoire"),
  features: yup.string(),
});

const AddCarForm = () => {
  const onSubmit = async (data: CarInput) => {
    const result = await addCar(data);
    if (result.success) {
      toast.success("Voiture ajoutée avec succès");
    } else {
      toast.error(result.error);
    }
  };

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      model: "",
      speed: 0,
      features: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <Label>Modèle</Label>
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
              <Label>Vitesse</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Vitesse (km/h)"
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
          name="features"
          render={({ field }) => (
            <FormItem>
              <Label>Options</Label>
              <FormControl>
                <Input placeholder="Options (optionnel)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"default"} type="submit">
          Ajouter
        </Button>
      </form>
    </Form>
  );
};

export default AddCarForm;
