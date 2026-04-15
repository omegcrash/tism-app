/**
 * ActivityPub federation support via TISM AP sidecar
 *
 * Enables resolving and following users from Mastodon/Fediverse
 */

import {TISM_SERVICE} from '#/lib/constants'

// AP sidecar base URL (same domain as PDS)
const AP_BASE = TISM_SERVICE

/**
 * Check if a string looks like a fediverse handle
 * Format: @user@domain.tld or user@domain.tld
 */
export function isFediverseHandle(input: string): boolean {
  const cleaned = input.startsWith('@') ? input.slice(1) : input
  const parts = cleaned.split('@')
  return parts.length === 2 && parts[0].length > 0 && parts[1].includes('.')
}

/**
 * Parse a fediverse handle into username and domain
 */
export function parseFediverseHandle(input: string): {
  username: string
  domain: string
} | null {
  const cleaned = input.startsWith('@') ? input.slice(1) : input
  const parts = cleaned.split('@')
  if (parts.length !== 2 || !parts[0] || !parts[1].includes('.')) {
    return null
  }
  return {username: parts[0], domain: parts[1]}
}

/**
 * WebFinger link from AP sidecar
 */
interface WebFingerLink {
  rel: string
  type?: string
  href?: string
  template?: string
}

/**
 * WebFinger response
 */
interface WebFingerResponse {
  subject: string
  aliases?: string[]
  links: WebFingerLink[]
}

/**
 * ActivityPub Actor object (simplified)
 */
export interface APActor {
  '@context': string | string[]
  id: string
  type: 'Person' | 'Service' | 'Application' | 'Group' | 'Organization'
  preferredUsername: string
  name?: string
  summary?: string
  icon?: {
    type: string
    url: string
    mediaType?: string
  }
  image?: {
    type: string
    url: string
  }
  inbox: string
  outbox: string
  followers?: string
  following?: string
  url?: string
  // For compatibility with AT Protocol profile views
  handle?: string
  displayName?: string
  avatar?: string
  banner?: string
  description?: string
}

/**
 * Normalized profile that works with both AT and AP
 */
export interface FederatedProfile {
  // Universal fields
  id: string // did: for AT, actor URL for AP
  handle: string // user.domain or user@domain
  displayName?: string
  description?: string
  avatar?: string
  banner?: string

  // Protocol info
  protocol: 'at' | 'ap'
  actorUrl?: string // AP actor URL (for AP users)
  did?: string // AT Protocol DID (for AT users)

  // Counts (may not be available for remote AP users)
  followersCount?: number
  followsCount?: number
  postsCount?: number
}

/**
 * Resolve a fediverse handle via WebFinger
 */
export async function resolveWebFinger(
  handle: string,
): Promise<WebFingerResponse | null> {
  const parsed = parseFediverseHandle(handle)
  if (!parsed) {
    return null
  }

  const resource = `acct:${parsed.username}@${parsed.domain}`

  try {
    // Try remote server's WebFinger first
    const remoteUrl = `https://${parsed.domain}/.well-known/webfinger?resource=${encodeURIComponent(resource)}`
    const res = await fetch(remoteUrl, {
      headers: {Accept: 'application/jrd+json, application/json'},
    })

    if (res.ok) {
      return (await res.json()) as WebFingerResponse
    }

    // Fall back to our sidecar (might have cached or have different routing)
    const localUrl = `${AP_BASE}/.well-known/webfinger?resource=${encodeURIComponent(resource)}`
    const localRes = await fetch(localUrl, {
      headers: {Accept: 'application/jrd+json, application/json'},
    })

    if (localRes.ok) {
      return (await localRes.json()) as WebFingerResponse
    }

    return null
  } catch (error) {
    console.error('WebFinger resolution failed:', error)
    return null
  }
}

/**
 * Get AP actor URL from WebFinger response
 */
export function getActorUrlFromWebFinger(
  webfinger: WebFingerResponse,
): string | null {
  const selfLink = webfinger.links.find(
    link =>
      link.rel === 'self' &&
      (link.type === 'application/activity+json' ||
        link.type ===
          'application/ld+json; profile="https://www.w3.org/ns/activitystreams"'),
  )
  return selfLink?.href ?? null
}

/**
 * Fetch an ActivityPub actor
 */
export async function fetchAPActor(actorUrl: string): Promise<APActor | null> {
  try {
    const res = await fetch(actorUrl, {
      headers: {
        Accept:
          'application/activity+json, application/ld+json; profile="https://www.w3.org/ns/activitystreams"',
      },
    })

    if (!res.ok) {
      console.error(`Failed to fetch AP actor: ${res.status}`)
      return null
    }

    return (await res.json()) as APActor
  } catch (error) {
    console.error('Failed to fetch AP actor:', error)
    return null
  }
}

/**
 * Convert AP actor to normalized profile
 */
export function apActorToProfile(
  actor: APActor,
  handle: string,
): FederatedProfile {
  return {
    id: actor.id,
    handle,
    displayName: actor.name ?? actor.preferredUsername,
    description: actor.summary ? stripHtml(actor.summary) : undefined,
    avatar: actor.icon?.url,
    banner: actor.image?.url,
    protocol: 'ap',
    actorUrl: actor.id,
  }
}

/**
 * Strip HTML tags from text (for AP summary/bio)
 */
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<p>/gi, '')
    .replace(/<\/p>/gi, '\n')
    .replace(/<a[^>]*>([^<]*)<\/a>/gi, '$1')
    .replace(/<[^>]+>/g, '')
    .trim()
}

/**
 * Resolve a fediverse handle to a normalized profile
 */
export async function resolveFediverseProfile(
  handle: string,
): Promise<FederatedProfile | null> {
  const webfinger = await resolveWebFinger(handle)
  if (!webfinger) {
    return null
  }

  const actorUrl = getActorUrlFromWebFinger(webfinger)
  if (!actorUrl) {
    return null
  }

  const actor = await fetchAPActor(actorUrl)
  if (!actor) {
    return null
  }

  const parsed = parseFediverseHandle(handle)
  const normalHandle = parsed ? `${parsed.username}@${parsed.domain}` : handle

  return apActorToProfile(actor, normalHandle)
}

/**
 * Follow an AP user via the sidecar
 */
export async function followAPUser(
  localHandle: string,
  targetActorUrl: string,
): Promise<boolean> {
  try {
    const res = await fetch(`${AP_BASE}/api/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        follower: localHandle,
        target: targetActorUrl,
      }),
    })
    return res.ok
  } catch (error) {
    console.error('Failed to follow AP user:', error)
    return false
  }
}

/**
 * Unfollow an AP user via the sidecar
 */
export async function unfollowAPUser(
  localHandle: string,
  targetActorUrl: string,
): Promise<boolean> {
  try {
    const res = await fetch(`${AP_BASE}/api/unfollow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        follower: localHandle,
        target: targetActorUrl,
      }),
    })
    return res.ok
  } catch (error) {
    console.error('Failed to unfollow AP user:', error)
    return false
  }
}
