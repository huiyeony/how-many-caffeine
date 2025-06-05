import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";
type Coffee = {
  id: number;
  div: string;
  cat: string;
  prd: string;
  caf: number;
};

export default function Filters() {
  const hot = useRef(0); //ice | hot

  return <>{}</>;
}
