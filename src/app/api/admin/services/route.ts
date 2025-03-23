// // app/api/admin/services/route.ts
// import { NextResponse } from 'next/server';
// import { z } from 'zod';
// import fs from 'fs/promises';
// import path from 'path';
// import { ServiceType } from '@/type/ServiceType';
// import { v4 as uuidv4 } from 'uuid';

// // Chemin vers le fichier service.json dans le dossier dataApi à la racine
// const DATA_FILE = 'services.json';
// const dataFilePath = path.join(process.cwd(), 'dataApi', DATA_FILE); // Chemin absolu
// const lockFilePath = path.join(process.cwd(), 'dataApi', `${DATA_FILE}.lock`); // Fichier de verrou

// // Schéma Zod pour la validation des données
// const serviceSchema = z.object({
//   id: z.string().optional(),
//   icon: z.string().min(2, { message: "Icon class must be at least 2 characters." }),
//   category: z.string().min(3, { message: "Category must be at least 3 characters." }),
//   title: z.string().min(3, { message: "Title must be at least 3 characters." }),
//   desc: z.string().min(10, { message: "Description must be at least 10 characters." }),
//   shortDesc: z.string().min(5, { message: "Short description must be at least 5 characters." }),
//   serviceItems: z.array(
//     z.object({
//       itemTitle: z.string().min(3),
//       itemDesc: z.string().min(10),
//     })
//   ).optional(),
//   serviceQuestions: z.array(
//     z.object({
//       qsSubject: z.string().min(3),
//       qsResponse: z.string().min(10),
//     })
//   ).optional(),
//   image: z.string().optional(),
// });

// // Fonction pour acquérir un verrou
// async function acquireLock(): Promise<void> {
//   try {
//     await fs.writeFile(lockFilePath, 'locked', { flag: 'wx' }); // Crée le fichier seulement s'il n'existe pas
//   } catch (error: any) {
//     if (error.code === 'EEXIST') {
//       // Le verrou existe déjà, attendre et réessayer
//       await new Promise(resolve => setTimeout(resolve, 50)); // Petit délai
//       return acquireLock(); // Appel récursif
//     } else {
//       throw error; // Relancer les autres erreurs
//     }
//   }
// }

// // Fonction pour libérer le verrou
// async function releaseLock(): Promise<void> {
//   try {
//     await fs.unlink(lockFilePath);
//   } catch (error: any) {
//     // Ignorer si le fichier n'existe pas (déjà libéré)
//     if (error.code !== 'ENOENT') {
//       console.error('Error releasing lock:', error);
//     }
//   }
// }

// // Fonction pour lire les données des services
// async function readServicesData(): Promise<ServiceType[]> {
//   try {
//     const fileContent = await fs.readFile(dataFilePath, 'utf-8');
//     return JSON.parse(fileContent) as ServiceType[];
//   } catch (error) {
//     console.error("Error reading service.json:", error);
//     return []; // Retourner un tableau vide pour éviter de planter l'application
//   }
// }

// // Fonction pour écrire les données des services
// async function writeServicesData(data: ServiceType[]): Promise<void> {
//   await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
// }

// // GET: Récupérer tous les services
// export async function GET() {
//   try {
//     const servicesData = await readServicesData();
//     return NextResponse.json(servicesData);
//   } catch (error) {
//     console.error("Error in GET:", error);
//     return NextResponse.json({ message: "Error fetching services" }, { status: 500 });
//   }
// }

// // POST: Créer un nouveau service
// export async function POST(req: Request) {
//   try {
//     await acquireLock(); // Acquérir le verrou

//     const body = await req.json();
//     const validatedData = serviceSchema.safeParse(body);

//     if (!validatedData.success) {
//       await releaseLock(); // Libérer le verrou en cas d'échec de validation
//       return NextResponse.json({ errors: validatedData.error.errors }, { status: 400 });
//     }

//     const newService: ServiceType = { ...validatedData.data, id: uuidv4() };
//     const servicesData = await readServicesData();
//     servicesData.push(newService);
//     await writeServicesData(servicesData);

//     await releaseLock(); // Libérer le verrou après l'écriture

//     return NextResponse.json(newService, { status: 201 }); // Retourner le service créé
//   } catch (error) {
//     console.error("Error in POST:", error);
//     await releaseLock(); // S'assurer que le verrou est libéré même en cas d'erreur
//     return NextResponse.json({ message: "Error creating service" }, { status: 500 });
//   }
// }

// // PUT: Mettre à jour un service existant
// export async function PUT(req: Request) {
//   try {
//     await acquireLock();

//     const body = await req.json();
//     const validatedData = serviceSchema.safeParse(body);

//     if (!validatedData.success) {
//       await releaseLock();
//       return NextResponse.json({ errors: validatedData.error.errors }, { status: 400 });
//     }

//     const updatedService = validatedData.data;
//     const servicesData = await readServicesData();

//     const index = servicesData.findIndex(service => service.id === updatedService.id);

//     if (index === -1) {
//       await releaseLock();
//       return NextResponse.json({ message: "Service not found" }, { status: 404 });
//     }

//     servicesData[index] = updatedService as ServiceType; // Assurer la sécurité du type
//     await writeServicesData(servicesData);

//     await releaseLock();

//     return NextResponse.json(updatedService, { status: 200 });
//   } catch (error) {
//     console.error("Error in PUT:", error);
//     await releaseLock();
//     return NextResponse.json({ message: "Error updating service" }, { status: 500 });
//   }
// }

// // DELETE: Supprimer un service
// export async function DELETE(req: Request) {
//   try {
//     await acquireLock();

//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       await releaseLock();
//       return NextResponse.json({ message: "Missing service ID" }, { status: 400 });
//     }

//     let servicesData = await readServicesData();
//     const initialLength = servicesData.length;
//     servicesData = servicesData.filter(service => service.id !== id);

//     if (servicesData.length === initialLength) {
//       await releaseLock();
//       return NextResponse.json({ message: "Service not found" }, { status: 404 });
//     }

//     await writeServicesData(servicesData);

//     await releaseLock();

//     return NextResponse.json({ message: "Service deleted" }, { status: 200 });
//   } catch (error) {
//     console.error("Error in DELETE:", error);
//     await releaseLock();
//     return NextResponse.json({ message: "Error deleting service" }, { status: 500 });
//   }
// }

// app/api/admin/services/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { ServiceType } from '@/type/ServiceType';
import { v4 as uuidv4 } from 'uuid';

const DATA_FILE = 'services.json';
const dataFilePath = path.join(process.cwd(), 'dataApi', DATA_FILE);
const lockFilePath = path.join(process.cwd(), 'dataApi', `${DATA_FILE}.lock`);

// Schéma Zod avec validation d'URL d'image
const serviceSchema = z.object({
  id: z.string().optional(),
  icon: z.string().min(2),
  category: z.string().min(3),
  title: z.string().min(3),
  desc: z.string().min(10),
  shortDesc: z.string().min(5),
  serviceItems: z.array(
    z.object({
      itemTitle: z.string().min(3),
      itemDesc: z.string().min(10),
    })
  ).optional(),
  serviceQuestions: z.array(
    z.object({
      qsSubject: z.string().min(3),
      qsResponse: z.string().min(10),
    })
  ).optional(),
  image: z.string().optional(),
});

// Fonction pour sauvegarder les images
async function saveImage(base64Data: string): Promise<string> {
  const matches = base64Data.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!matches) throw new Error('Données image invalides');

  const extension = matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  const filename = `${uuidv4()}.${extension}`;
  const uploadPath = path.join(process.cwd(), 'public', 'uploads', 'services', filename);

  await fs.mkdir(path.dirname(uploadPath), { recursive: true });
  await fs.writeFile(uploadPath, buffer as unknown as Uint8Array);

  return `/uploads/services/${filename}`;
}

// Fonction pour acquérir un verrou
async function acquireLock(): Promise<void> {
  try {
    await fs.writeFile(lockFilePath, 'locked', { flag: 'wx' }); // Crée le fichier seulement s'il n'existe pas
  } catch (error: any) {
    if (error.code === 'EEXIST') {
      // Le verrou existe déjà, attendre et réessayer
      await new Promise(resolve => setTimeout(resolve, 50)); // Petit délai
      return acquireLock(); // Appel récursif
    } else {
      throw error; // Relancer les autres erreurs
    }
  }
}

// Fonction pour libérer le verrou
async function releaseLock(): Promise<void> {
  try {
    await fs.unlink(lockFilePath);
  } catch (error: any) {
    // Ignorer si le fichier n'existe pas (déjà libéré)
    if (error.code !== 'ENOENT') {
      console.error('Error releasing lock:', error);
    }
  }
}

// Fonction pour lire les données des services
async function readServicesData(): Promise<ServiceType[]> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent) as ServiceType[];
  } catch (error) {
    console.error("Error reading service.json:", error);
    return []; // Retourner un tableau vide pour éviter de planter l'application
  }
}

// Fonction pour écrire les données des services
async function writeServicesData(data: ServiceType[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

// GET: Récupérer tous les services
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
  let newImageUrl = '';
  try {
    await acquireLock();
    const body = await req.json();

    // Traitement de l'image
    if (body.image?.startsWith('data:image/')) {
      newImageUrl = await saveImage(body.image);
      body.image = newImageUrl;
    }

    const validatedData = serviceSchema.safeParse(body);
    
    if (!validatedData.success) {
      await releaseLock();
      return NextResponse.json({ errors: validatedData.error.errors }, { status: 400 });
    }

    const newService: ServiceType = { 
      ...validatedData.data, 
      id: uuidv4()
    };

    const servicesData = await readServicesData();
    servicesData.push(newService);
    await writeServicesData(servicesData);

    await releaseLock();
    return NextResponse.json(newService, { status: 201 });

  } catch (error) {
    if (newImageUrl) {
      await fs.unlink(path.join(process.cwd(), 'public', newImageUrl));
    }
    await releaseLock();
    return NextResponse.json({ message: "Erreur lors de la création" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  let newImageUrl = '';
  try {
    await acquireLock();
    const body = await req.json();
    const servicesData = await readServicesData();
    const index = servicesData.findIndex(s => s.id === body.id);

    if (index === -1) {
      await releaseLock();
      return NextResponse.json({ message: "Service non trouvé" }, { status: 404 });
    }

    // Gestion de l'image
    const oldImage = servicesData[index].image;
    if (body.image?.startsWith('data:image/')) {
      newImageUrl = await saveImage(body.image);
      body.image = newImageUrl;
      
      // Suppression ancienne image
      if (oldImage) {
        await fs.unlink(path.join(process.cwd(), 'public', oldImage));
      }
    }

    const validatedData = serviceSchema.safeParse(body);
    
    if (!validatedData.success) {
      await releaseLock();
      return NextResponse.json({ errors: validatedData.error.errors }, { status: 400 });
    }

    servicesData[index] = validatedData.data as ServiceType;
    await writeServicesData(servicesData);

    await releaseLock();
    return NextResponse.json(validatedData.data, { status: 200 });

  } catch (error) {
    if (newImageUrl) {
      await fs.unlink(path.join(process.cwd(), 'public', newImageUrl));
    }
    await releaseLock();
    return NextResponse.json({ message: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}


// DELETE: Supprimer un service
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