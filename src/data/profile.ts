import { createProfileRepository } from "@/data/profile-repository"
import { parseProfileData } from "@/data/profile-schema"

const internalApiBaseUrl =
  process.env.INTERNAL_API_BASE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:7344"
    : "http://host.docker.internal:7344")

export async function getProfileRepository() {
  const response = await fetch(`${internalApiBaseUrl}/api/profile`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Unable to load profile from backend (${response.status})`)
  }

  const result = await response.json()
  const profile = { ...(result.data ?? {}) }
  for (const field of ["_id", "__v", "key", "createdAt", "updatedAt"]) {
    delete profile[field]
  }
  if (profile.avatar && !/^https?:\/\//.test(profile.avatar)) {
    profile.avatar = `/${String(profile.avatar).replace(/^\//, "")}`
  }

  return createProfileRepository(parseProfileData(profile))
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
