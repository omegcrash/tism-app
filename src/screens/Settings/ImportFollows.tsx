import {useState} from 'react'
import {ActivityIndicator, View} from 'react-native'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'
import {Trans} from '@lingui/react/macro'

import {TISM_SERVICE} from '#/lib/constants'
import {useSession} from '#/state/session'
import {atoms as a, useTheme} from '#/alf'
import {Button, ButtonText} from '#/components/Button'
import * as TextField from '#/components/forms/TextField'
import {Check_Stroke2_Corner0_Rounded as Check} from '#/components/icons/Check'
import {Globe_Stroke2_Corner0_Rounded as Globe} from '#/components/icons/Globe'
import * as Layout from '#/components/Layout'
import {Text} from '#/components/Typography'

export function ImportFollowsScreen() {
  const t = useTheme()
  const {_} = useLingui()
  const {currentAccount} = useSession()
  const [instance, setInstance] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImport = async () => {
    if (!instance.trim() || !currentAccount?.handle) {
      setError('Please enter a Mastodon instance')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Call the sidecar to start OAuth flow
      const res = await fetch(
        `${TISM_SERVICE}/api/import/mastodon/start?instance=${encodeURIComponent(instance)}&handle=${encodeURIComponent(currentAccount.handle)}`,
      )

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to start import')
      }

      const data = (await res.json()) as {authUrl: string}

      // Redirect to Mastodon OAuth
      window.location.href = data.authUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed')
      setIsLoading(false)
    }
  }

  return (
    <Layout.Screen>
      <Layout.Header.Outer>
        <Layout.Header.BackButton />
        <Layout.Header.Content>
          <Layout.Header.TitleText>
            <Trans>Import Follows</Trans>
          </Layout.Header.TitleText>
        </Layout.Header.Content>
        <Layout.Header.Slot />
      </Layout.Header.Outer>

      <Layout.Content>
        <View style={[a.p_xl, a.gap_lg]}>
          {/* Header */}
          <View style={[a.flex_row, a.align_center, a.gap_md]}>
            <Globe size="xl" style={[{color: t.palette.primary_500}]} />
            <View style={[a.flex_1]}>
              <Text style={[a.text_lg, a.font_bold]}>
                <Trans>Import from Mastodon</Trans>
              </Text>
              <Text style={[a.text_sm, t.atoms.text_contrast_medium]}>
                <Trans>Bring your follows from Mastodon to Turtle Island</Trans>
              </Text>
            </View>
          </View>

          {/* Instructions */}
          <View
            style={[
              a.p_md,
              a.rounded_md,
              {backgroundColor: t.palette.primary_50},
            ]}>
            <Text style={[a.text_sm, {color: t.palette.primary_700}]}>
              <Trans>
                Enter your Mastodon instance (e.g., mastodon.social). You'll be
                redirected to authorize TISM to read your follows.
              </Trans>
            </Text>
          </View>

          {/* Instance input */}
          <View style={[a.gap_sm]}>
            <TextField.LabelText>
              <Trans>Mastodon Instance</Trans>
            </TextField.LabelText>
            <TextField.Root>
              <TextField.Input
                label={_(msg`Mastodon instance URL`)}
                placeholder="mastodon.social"
                value={instance}
                onChangeText={setInstance}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </TextField.Root>
          </View>

          {/* Error message */}
          {error && (
            <View
              style={[
                a.p_md,
                a.rounded_md,
                {backgroundColor: t.palette.negative_50},
              ]}>
              <Text style={[a.text_sm, {color: t.palette.negative_500}]}>
                {error}
              </Text>
            </View>
          )}

          {/* Import button */}
          <Button
            label={_(msg`Start Import`)}
            size="large"
            color="primary"
            onPress={handleImport}
            disabled={isLoading || !instance.trim()}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <ButtonText>
                <Trans>Connect to Mastodon</Trans>
              </ButtonText>
            )}
          </Button>

          {/* Success state (shown after redirect back) */}
          {typeof window !== 'undefined' &&
            new URLSearchParams(window.location.search).get('success') ===
              'true' && (
              <View
                style={[
                  a.p_md,
                  a.rounded_md,
                  a.flex_row,
                  a.align_center,
                  a.gap_sm,
                  {backgroundColor: t.palette.positive_50},
                ]}>
                <Check size="md" style={[{color: t.palette.positive_500}]} />
                <Text style={[a.text_sm, {color: t.palette.positive_700}]}>
                  <Trans>
                    Successfully imported{' '}
                    {new URLSearchParams(window.location.search).get('count')}{' '}
                    follows!
                  </Trans>
                </Text>
              </View>
            )}
        </View>
      </Layout.Content>
    </Layout.Screen>
  )
}
