import { createConnection, Connection } from 'typeorm';
import { Resource } from '../models/Resource';

export const connectDatabase = async (): Promise<Connection> => {
  try {
    const connection = await createConnection({
      type: 'sqlite',
      database: process.env.DB_PATH || '/app/data/game_resources.sqlite',
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