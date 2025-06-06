import { useMemo } from 'react'

import { Dialog, UseDialogProps } from '../common/Dialog'
import { DOCS_DOMAIN } from '../../constants'
import { NoteBox } from '../common/NoteBox'
import { ExternalLink } from '../common/ExternalLink'
import { useNetworks } from '../../hooks/useNetworks'
import { getNetworkName } from '../../util/networks'

export type TokenDepositCheckDialogType =
  | 'deposit_token_user_added_token'
  | 'deposit_token_new_token'

export type TokenDepositCheckDialogProps = UseDialogProps & {
  type: TokenDepositCheckDialogType
  symbol: string
}

export function TokenDepositCheckDialog(props: TokenDepositCheckDialogProps) {
  const { type, symbol } = props

  const [networks] = useNetworks()

  const networkName = getNetworkName(networks.destinationChain.id)

  const textContent = useMemo(() => {
    switch (type) {
      case 'deposit_token_user_added_token':
        return (
          <p className="pb-2">
            You are about to deposit {symbol} to {networkName}
          </p>
        )

      case 'deposit_token_new_token':
        return (
          <div className="mb-4">
            <p className="pb-2">
              You are the first to bridge {symbol} to {networkName} ⭐
            </p>
            <span className="font-medium">Important facts</span>
            <ol>
              <li>1. Some tokens are not compatible with the bridge</li>
              <li>
                2. The initial bridge is more expensive than following ones
              </li>
            </ol>
          </div>
        )
    }
  }, [type, symbol, networkName])

  const title = useMemo(() => {
    switch (type) {
      case 'deposit_token_user_added_token':
        return `Depositing ${symbol} to ${networkName}`

      case 'deposit_token_new_token':
        return 'New Token Detected'
    }
  }, [type, symbol, networkName])

  return (
    <Dialog {...props} title={title} className="flex flex-col gap-4">
      <p>{textContent}</p>
      <NoteBox variant="error">
        <p className="mb-2">
          <span className="font-medium">Do not bridge</span> if your token does
          something non-standard like generates passive interest or is a
          rebasing stablecoin.
        </p>
        <p>Not sure if your token is compatible?</p>
        <p>
          Check the{' '}
          <ExternalLink
            className="arb-hover underline"
            href={`${DOCS_DOMAIN}/for-devs/concepts/token-bridge/token-bridge-erc20#the-arbitrum-generic-custom-gateway`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-medium">docs</span>
          </ExternalLink>{' '}
          or ask on{' '}
          <ExternalLink
            className="arb-hover underline"
            href="https://discord.gg/ZpZuw7p"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-medium">Discord</span>
          </ExternalLink>
          .
        </p>
      </NoteBox>
    </Dialog>
  )
}
