export const config = {
  endpoint: env(process.env.NEXT_PUBLIC_RELAY_ENDPOINT, "NEXT_PUBLIC_RELAY_ENDPOINT"),
};

function env(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`environment variable ${key} is not found`);
  }

  return value;
}
