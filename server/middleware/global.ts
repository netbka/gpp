import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  let user = await serverSupabaseUser(event);

  // if (user === null) {
  //   console.log("user is null event is:", event);
  // } else {
  //   console.log("user parsed event is:", event);
  // }

  event.context.user = user;
  //console.log("===================================", new Date());
});
