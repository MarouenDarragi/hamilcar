import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Update the file path to be relative to the project root
const DATA_FILE_PATH = path.join(process.cwd(), 'dataApi', 'info.json');

// Helper function to ensure the data directory exists
async function ensureDataDirectory() {
  const dir = path.dirname(DATA_FILE_PATH);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

export async function GET() {
  try {
    await ensureDataDirectory();
    
    try {
      const fileData = await fs.readFile(DATA_FILE_PATH, 'utf8');
      const data = JSON.parse(fileData);
      return NextResponse.json(data);
    } catch (error) {
      // If file doesn't exist, return default data
      const defaultData = {
        phone: "+1 234 567 890",
        email: "contact@example.com",
        address: "123 Business Street, New York, NY 10001",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...",
        socialMedia: {
          facebook: "https://facebook.com/example",
          twitter: "https://twitter.com/example",
          instagram: "https://instagram.com/example",
          linkedin: "https://linkedin.com/company/example"
        }
      };
      
      // Create the file with default data
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(defaultData, null, 2), 'utf8');
      return NextResponse.json(defaultData);
    }
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json(
      { error: 'Failed to fetch info data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await ensureDataDirectory();
    
    const data = await request.json();
    
    // Validate the data structure
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
    }

    // Write the file with explicit encoding
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json({ message: 'Info updated successfully' });
  } catch (error) {
    console.error('Error in PUT:', error);
    return NextResponse.json(
      { error: 'Failed to update info data' },
      { status: 500 }
    );
  }
}