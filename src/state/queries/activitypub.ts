/**
 * React Query hooks for ActivityPub federation
 */

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'

import {
  type FederatedProfile,
  followAPUser,
  isFediverseHandle,
  resolveFediverseProfile,
  unfollowAPUser,
} from '#/lib/api/activitypub'
import {STALE} from '#/state/queries'
import {useSession} from '#/state/session'

const AP_PROFILE_QUERY_KEY_ROOT = 'ap-profile'

export function createAPProfileQueryKey(handle: string) {
  return [AP_PROFILE_QUERY_KEY_ROOT, handle]
}

/**
 * Query hook to resolve a fediverse handle to a profile
 */
export function useAPProfileQuery({
  handle,
  enabled = true,
}: {
  handle: string
  enabled?: boolean
}) {
  return useQuery<FederatedProfile | null>({
    queryKey: createAPProfileQueryKey(handle),
    queryFn: async () => {
      if (!isFediverseHandle(handle)) {
        return null
      }
      return resolveFediverseProfile(handle)
    },
    staleTime: STALE.MINUTES.FIVE,
    enabled: enabled && isFediverseHandle(handle),
  })
}

/**
 * Follow an ActivityPub user
 */
export function useAPFollowMutation() {
  const queryClient = useQueryClient()
  const {currentAccount} = useSession()

  return useMutation({
    mutationFn: async ({actorUrl}: {actorUrl: string; handle: string}) => {
      if (!currentAccount?.handle) {
        throw new Error('Must be logged in to follow')
      }
      const success = await followAPUser(currentAccount.handle, actorUrl)
      if (!success) {
        throw new Error('Failed to follow user')
      }
    },
    onSuccess: (_data, variables) => {
      // Invalidate the profile query to refresh follow state
      queryClient.invalidateQueries({
        queryKey: createAPProfileQueryKey(variables.handle),
      })
    },
  })
}

/**
 * Unfollow an ActivityPub user
 */
export function useAPUnfollowMutation() {
  const queryClient = useQueryClient()
  const {currentAccount} = useSession()

  return useMutation({
    mutationFn: async ({actorUrl}: {actorUrl: string; handle: string}) => {
      if (!currentAccount?.handle) {
        throw new Error('Must be logged in to unfollow')
      }
      const success = await unfollowAPUser(currentAccount.handle, actorUrl)
      if (!success) {
        throw new Error('Failed to unfollow user')
      }
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: createAPProfileQueryKey(variables.handle),
      })
    },
  })
}

/**
 * Combined search that checks both AT Protocol and ActivityPub
 * Used when search query looks like a fediverse handle
 */
export function useFederatedSearchQuery({
  query,
  enabled = true,
}: {
  query: string
  enabled?: boolean
}) {
  const isAPHandle = isFediverseHandle(query)

  return useQuery<FederatedProfile | null>({
    queryKey: ['federated-search', query],
    queryFn: async () => {
      if (!isAPHandle) {
        return null
      }
      return resolveFediverseProfile(query)
    },
    staleTime: STALE.MINUTES.FIVE,
    enabled: enabled && isAPHandle,
  })
}
