import { SITE_URL } from "../lib/constants"

export const getPath = (slug: string) => {
    return `${SITE_URL}+${slug}`    
}