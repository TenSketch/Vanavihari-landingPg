// export default () => new Response("Hello world");
export default async () => {
    return new Response("Hello, World 2!", {
      headers: { "content-type": "text/html" }
    });
  };
  
export const config = { path: "/test" };
