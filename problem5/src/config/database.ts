import { createConnection, Connection } from 'typeorm';
import { Resource } from '../models/Resource';
import path from 'path';
import fs from 'fs';

export const connectDatabase = async (): Promise<Connection> => {
  try {
    // Determine appropriate database directory
    let dbPath: string;
    
    if (process.env.NODE_ENV === 'production') {
      // Use container path in production
      dbPath = '/app/data/game_resources.sqlite';
    } else {
      // Use local path for development
      dbPath = path.join(process.cwd(), 'data', 'game_resources.sqlite');
      
      // Ensure the data directory exists
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
    }

    console.log(`Using database path: ${dbPath}`);
    
    const connection = await createConnection({
      type: 'sqlite',
      database: dbPath,
      entities: [Resource],
      synchronize: true,
      logging: false
    });
    console.log('Database connected successfully');
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};