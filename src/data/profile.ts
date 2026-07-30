import rawProfile from "@/data/profile.json"
import { createProfileRepository } from "@/data/profile-repository"
import { parseProfileData } from "@/data/profile-schema"

const repository = createProfileRepository(parseProfileData(rawProfile))

export const profileData = repository.profileData
export const getProfileContent = repository.getContent
export const getProfileLinks = repository.getLinks

export {
  iconNames,
  linkDomains,
  type IconName,
  type LinkDomain,
  type ProfileData,
  type ProfileLink,
  type ResolvedProfileLink,
} from "@/data/profile-types"
