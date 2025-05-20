import type { Session } from "$lib/types/poi-types";
import type { LayoutServerLoad } from "./$types";

export const ssr = false; 

export const load: LayoutServerLoad = ({ cookies }) => {
  const cookieStr = cookies.get("donation-user") as string;
  if (cookieStr) {
    const session = JSON.parse(cookieStr) as Session;
    return {
      session: session
    };
  }
};
