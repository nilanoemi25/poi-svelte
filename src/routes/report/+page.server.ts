import { poiService } from "$lib/services/poi-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (session) {
    return {
      pois: await poiService.getPois(session.token),
      categories: await poiService.getCategories(session.token)
    };
  }
};
