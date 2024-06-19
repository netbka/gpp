import { createClient } from "@supabase/supabase-js";
import { useRuntimeConfig } from "#imports";
export default defineEventHandler(async (event) => {
  const supabaseUrl = useRuntimeConfig().public.supabase.url;
  const supabaseKey = useRuntimeConfig().public.supabase.key;
  const supabase = createClient(supabaseUrl, supabaseKey);

  //const supabase = useSupabaseClient();
  let body = await readBody(event);
  let training_id = Number(body.id);
  let durationval = Number(body.duration);

  const { data, error } = await supabase.rpc("update_exercise_duration", {
    training_id,
    durationval,
  });

  if (error) {
    console.error(error);
  } else {
  }
});
