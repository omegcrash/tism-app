/**
 * Profile card for ActivityPub (Mastodon/Fediverse) users
 */

import {type GestureResponderEvent, View} from 'react-native'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'

import {type FederatedProfile} from '#/lib/api/activitypub'
import {sanitizeHandle} from '#/lib/strings/handles'
import {
  useAPFollowMutation,
  useAPUnfollowMutation,
} from '#/state/queries/activitypub'
import {useSession} from '#/state/session'
import {UserAvatar} from '#/view/com/util/UserAvatar'
import {atoms as a, useTheme} from '#/alf'
import {Button, ButtonIcon, ButtonText} from '#/components/Button'
import {Check_Stroke2_Corner0_Rounded as Check} from '#/components/icons/Check'
import {Globe_Stroke2_Corner0_Rounded as Globe} from '#/components/icons/Globe'
import {PlusLarge_Stroke2_Corner0_Rounded as Plus} from '#/components/icons/Plus'
import {Text} from '#/components/Typography'

interface APProfileCardProps {
  profile: FederatedProfile
  noBorder?: boolean
  onPress?: (e: GestureResponderEvent) => void
}

export function APProfileCard({
  profile,
  noBorder,
  onPress,
}: APProfileCardProps) {
  const t = useTheme()

  return (
    <View
      style={[
        a.py_md,
        a.px_xl,
        !noBorder && [a.border_t, t.atoms.border_contrast_low],
      ]}>
      <APProfileCardInner profile={profile} onPress={onPress} />
    </View>
  )
}

function APProfileCardInner({
  profile,
  onPress,
}: {
  profile: FederatedProfile
  onPress?: (e: GestureResponderEvent) => void
}) {
  const t = useTheme()
  const {_} = useLingui()
  const {hasSession} = useSession()

  return (
    <View
      style={[a.w_full, a.flex_1, a.gap_xs]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={_(
        msg`View ${profile.displayName || profile.handle}'s profile`,
      )}
      accessibilityHint={_(msg`Opens the profile page for this Fediverse user`)}
      onTouchEnd={onPress}>
      {/* Header row */}
      <View style={[a.flex_row, a.align_center, a.gap_sm]}>
        {/* Avatar */}
        <UserAvatar size={42} avatar={profile.avatar} type="user" />

        {/* Name and handle */}
        <View style={[a.flex_1]}>
          <View style={[a.flex_row, a.align_center, a.gap_xs]}>
            <Text
              style={[a.text_md, a.font_bold, a.leading_snug]}
              numberOfLines={1}>
              {profile.displayName || profile.handle}
            </Text>
            {/* Fediverse indicator */}
            <Globe size="sm" style={[t.atoms.text_contrast_medium]} />
          </View>
          <Text
            style={[a.text_sm, t.atoms.text_contrast_medium, a.leading_snug]}
            numberOfLines={1}>
            @{sanitizeHandle(profile.handle)}
          </Text>
        </View>

        {/* Follow button */}
        {hasSession && <APFollowButton profile={profile} />}
      </View>

      {/* Description */}
      {profile.description && (
        <Text
          style={[a.text_sm, t.atoms.text_contrast_high, a.leading_snug]}
          numberOfLines={3}>
          {profile.description}
        </Text>
      )}

      {/* Protocol badge */}
      <View style={[a.flex_row, a.gap_xs, a.mt_xs]}>
        <View
          style={[
            a.px_sm,
            a.py_2xs,
            a.rounded_xs,
            {backgroundColor: t.palette.primary_100},
          ]}>
          <Text style={[a.text_xs, {color: t.palette.primary_600}]}>
            Fediverse
          </Text>
        </View>
      </View>
    </View>
  )
}

function APFollowButton({profile}: {profile: FederatedProfile}) {
  const {_} = useLingui()
  const followMutation = useAPFollowMutation()
  const unfollowMutation = useAPUnfollowMutation()

  // TODO: Track follow state properly via sidecar
  const isFollowing = false
  const isPending = followMutation.isPending || unfollowMutation.isPending

  const handlePress = async () => {
    if (!profile.actorUrl) return

    if (isFollowing) {
      await unfollowMutation.mutateAsync({
        actorUrl: profile.actorUrl,
        handle: profile.handle,
      })
    } else {
      await followMutation.mutateAsync({
        actorUrl: profile.actorUrl,
        handle: profile.handle,
      })
    }
  }

  return (
    <Button
      label={isFollowing ? _(msg`Unfollow`) : _(msg`Follow`)}
      size="small"
      color={isFollowing ? 'secondary' : 'primary'}
      variant={isFollowing ? 'solid' : 'solid'}
      onPress={handlePress}
      disabled={isPending}>
      <ButtonIcon icon={isFollowing ? Check : Plus} />
      <ButtonText>
        {isFollowing ? _(msg`Following`) : _(msg`Follow`)}
      </ButtonText>
    </Button>
  )
}
