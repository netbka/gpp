import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
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
    console.log(data);
  }
});
