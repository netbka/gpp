import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  let user = await serverSupabaseUser(event);
  event.context.user = user;
});
