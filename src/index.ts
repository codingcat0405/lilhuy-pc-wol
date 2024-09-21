import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .get("/wol/:mac",  async ({params}) => {
    const mac = params.mac;
    const proc = Bun.spawn(['wakeonlan', mac]);
    const output = await new Response(proc.stdout).text();
    console.log(output);
    return {
      status: 'success',
      message: 'WOL packet sent'
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
