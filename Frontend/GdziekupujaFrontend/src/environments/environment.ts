export const environment: Environment = {
  production: false,
  httpBackend: 'https://localhost:7173',
};

interface Environment {
  production: boolean,
  httpBackend: string;
}