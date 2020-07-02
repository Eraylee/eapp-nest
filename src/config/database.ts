import * as path from 'path';

export default {
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  entities: [path.resolve(__dirname, '..', process.env.TYPEORM_ENTITIE)],
  synchronize: process.env.DATA_BASE_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'true',
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
};
