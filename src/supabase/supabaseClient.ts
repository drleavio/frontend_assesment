import { createClient } from "@supabase/supabase-js";
const supabaseUrl:string="https://asfabyswqpycwvvphguu.supabase.co"!;
const supabaseAnonKey:string="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzZmFieXN3cXB5Y3d2dnBoZ3V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwMjY1NTgsImV4cCI6MjA0NzYwMjU1OH0.O-yDPBaNnPJJCvoMX87b1BkIkOZsI8RDUNxw77UboTY"!;

export const supabase=createClient(supabaseUrl,supabaseAnonKey);