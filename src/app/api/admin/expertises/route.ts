import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { ServiceType } from '@/type/ServiceType';
import { v4 as uuidv4 } from 'uuid';

const DATA_FILE = 'expertises.json'; // Clé : Nom du fichier
const dataFilePath = path.join(process.cwd(), 'dataApi', DATA_FILE); // <-- Chemin mis à jour
const lockFilePath = path.join(process.cwd(), 'dataApi', `${DATA_FILE}.lock`); // <-- Chemin mis à jour

// Schéma Zod pour la validation des données
const serviceSchema = z.object({
  id: z.string().optional(),
  icon: z.string().min(2, { message: "Icon class must be at least 2 characters." }),
  category: z.string().min(3, { message: "Category must be at least 3 characters." }),
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  desc: z.string().min(10, { message: "Description must be at least 10 characters." }),
  shortDesc: z.string().min(5, { message: "Short description must be at least 5 characters." }),
});

// ... (acquireLock, releaseLock, readServicesData, writeServicesData, GET, POST, PUT, DELETE - restent identiques)

async function acquireLock(): Promise<void> {
    try {
      await fs.writeFile(lockFilePath, 'locked', { flag: 'wx' }); // 'wx' creates the file only if it doesn't exist
    } catch (error: any) {
      if (error.code === 'EEXIST') {
        // Lock already exists, wait and retry
        await new Promise(resolve => setTimeout(resolve, 50)); // Small delay
        return acquireLock(); // Recursive call
      } else {
        throw error; // Re-throw other errors
      }
    }
  }

  async function releaseLock(): Promise<void> {
    try {
      await fs.unlink(lockFilePath);
    } catch (error: any) {
      // Ignore if the file doesn't exist (already released)
      if (error.code !== 'ENOENT') {
        console.error('Error releasing lock:', error);
      }
    }
  }

  async function readServicesData(): Promise<ServiceType[]> {
    try {
      const fileContent = await fs.readFile(dataFilePath, 'utf-8');
      return JSON.parse(fileContent) as ServiceType[];
    } catch (error) {
      console.error("Error reading expertise.json:", error);
      return []; // Return an empty array to avoid crashing the app. Consider more robust error handling.
    }
  }

  async function writeServicesData(data: ServiceType[]): Promise<void> {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }

export async function GET() {
    try {
      const servicesData = await readServicesData();
      return NextResponse.json(servicesData);
    } catch (error) {
      console.error("Error in GET:", error);
      return NextResponse.json({ message: "Error fetching services" }, { status: 500 });
    }
  }

  export async function POST(req: Request) {
    try {
      await acquireLock(); // Acquire the lock

      const body = await req.json();
      const validatedData = serviceSchema.safeParse(body);

      if (!validatedData.success) {
        await releaseLock(); // Release the lock, even on validation failure.
        return NextResponse.json({ errors: validatedData.error.errors }, { status: 400 });
      }

      const newService: ServiceType = { ...validatedData.data, id: uuidv4() };
      const servicesData = await readServicesData();
      servicesData.push(newService);
      await writeServicesData(servicesData);

      await releaseLock(); // Release the lock after writing

      return NextResponse.json(newService, { status: 201 }); // Return the created service
    } catch (error) {
      console.error("Error in POST:", error);
      await releaseLock(); // Ensure lock is released even if there's an error
      return NextResponse.json({ message: "Error creating service" }, { status: 500 });
    }
  }

  export async function PUT(req: Request) {
    try {
        await acquireLock();

        const body = await req.json();
        const validatedData = serviceSchema.safeParse(body);

        if (!validatedData.success) {
            await releaseLock();
            return NextResponse.json({ errors: validatedData.error.errors }, { status: 400 });
        }

        const updatedService = validatedData.data;
        const servicesData = await readServicesData();

        const index = servicesData.findIndex(service => service.id === updatedService.id);

        if (index === -1) {
            await releaseLock();
            return NextResponse.json({ message: "Service not found" }, { status: 404 });
        }

        servicesData[index] = updatedService as ServiceType; // Ensure type safety
        await writeServicesData(servicesData);

        await releaseLock();

        return NextResponse.json(updatedService, { status: 200 });

    } catch (error) {
        console.error("Error in PUT:", error);
        await releaseLock();
        return NextResponse.json({ message: "Error updating service" }, { status: 500 });
    }
  }


  export async function DELETE(req: Request) {
    try {
      await acquireLock();

      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');

      if (!id) {
        await releaseLock();
        return NextResponse.json({ message: "Missing service ID" }, { status: 400 });
      }

      let servicesData = await readServicesData();
      const initialLength = servicesData.length;
      servicesData = servicesData.filter(service => service.id !== id);

      if (servicesData.length === initialLength) {
        await releaseLock();
        return NextResponse.json({ message: "Service not found" }, { status: 404 });
      }


      await writeServicesData(servicesData);

      await releaseLock();

      return NextResponse.json({ message: "Service deleted" }, { status: 200 });
    } catch (error) {
      console.error("Error in DELETE:", error);
      await releaseLock();
      return NextResponse.json({ message: "Error deleting service" }, { status: 500 });
    }
  }