import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  let user = await serverSupabaseUser(event);

  if (user) {
    event.context.user = user;
  } else {
    event.context.user = {};
    event.context.user.id = "12345678123456781234567812345678";
  }

  //event.context.user = user;
  //console.log(getRequestURL(event));
  const url = event.node.req.url;
  const method = event.node.req.method;

  await protectRoute(method, url.split("/").slice(-1)[0]);
});

async function protectRoute(method?: string, url?: string) {
  console.log(method, url);
}
