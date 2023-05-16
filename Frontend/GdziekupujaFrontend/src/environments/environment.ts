export const environment: Environment = {
  production: false,
  httpBackend: 'http://localhost:5251',
};

interface Environment {
  production: boolean,
  httpBackend: string;
}