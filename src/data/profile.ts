import rawProfile from "@/data/profile.json"
import { createProfileRepository } from "@/data/profile-repository"
import { parseProfileData } from "@/data/profile-schema"

const repository = createProfileRepository(parseProfileData(rawProfile))
const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:7344"

export const profileData = repository.profileData
export const getProfileContent = repository.getContent
export const getProfileLinks = repository.getLinks

export async function getRuntimeProfileRepository() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/profile`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      return repository
    }

    const result = await response.json()
    const profile = { ...(result.data ?? {}) }
    for (const field of ["_id", "__v", "key", "createdAt", "updatedAt"]) {
      delete profile[field]
    }
    if (profile.avatar && !/^https?:\/\//.test(profile.avatar)) {
      profile.avatar = `${apiBaseUrl}/${String(profile.avatar).replace(/^\//, "")}`
    }

    return createProfileRepository(parseProfileData(profile))
  } catch {
    return repository
  }
}

export {
  iconNames,
  linkDomains,
  type IconName,
  type LinkDomain,
  type ProfileData,
  type ProfileLink,
  type ResolvedProfileLink,
} from "@/data/profile-types"
