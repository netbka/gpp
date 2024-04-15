import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  let user = await serverSupabaseUser(event);

  // if (user) {
  //   event.context.user = user;
  // } else {
  //   event.context.user = {};
  //   event.context.user.id = "12345678123456781234567812345678";
  // }
  const cookies = parseCookies(event);
  console.log(cookies);
  event.context.user = user;
});
