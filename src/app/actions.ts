"use server";

import { revalidatePath } from "next/cache";
import api from "@/lib/api";
import { Car } from "@/lib/type/car";

export async function addCar(data: Omit<Car, "id">) {
  try {
    await api.post("/cars", data);
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Erreur lors de l'ajout de la voiture";
    return { success: false, error: message };
  }
}

export async function deleteCar(id: number) {
  try {
    await api.delete(`/cars/${id}`);
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Erreur lors de la suppression de la voiture";
    return { success: false, error: message };
  }
}

export async function editCar(id: number, data: Omit<Car, "id">) {
  try {
    await api.put(`/cars/${id}`, data);
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Erreur lors de la modification de la voiture";
    return { success: false, error: message };
  }
}

export async function calculateTime(data: { distance: number; model: string }) {
  try {
    const response = await api.post("/calculate-time", data);
    return { success: true, time: response.data.time };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erreur lors du calcul du temps";
    return { success: false, error: message };
  }
}

export async function getCars() {
  try {
    const response = await api.get("/cars");
    return { success: true, data: response.data };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Erreur lors du chargement des voitures";
    return { success: false, error: message };
  }
}
