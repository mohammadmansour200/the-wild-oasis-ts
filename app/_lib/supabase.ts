import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<Database>(
	process.env.SUPABASE_URL as string,
	process.env.SUPABASE_KEY as string,
);

export default supabase;
