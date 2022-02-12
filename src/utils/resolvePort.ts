export function getUri(query?: string): string {
  if (query === "query") {
    return process.env.NODE_ENV === "production"
      ? "https:api.mohits.dev"
      : "http://localhost:5001";
  }
  let uri: string;
  if (process.env.NODE_ENV === "development") uri = "http://localhost:4218";
  else uri = "https://mohits.dev";

  return uri;
}
