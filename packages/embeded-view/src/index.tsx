import { useEffect } from 'react'
import { Gateway, Wallet } from '@sentre/connector'

export type EmbededViewProps = {
  appId: string
  src: string
  title?: string
  wallet: Wallet
  verbose?: boolean
}

const EmbededView = ({
  appId,
  src,
  title,
  wallet,
  verbose = false,
}: EmbededViewProps) => {
  // Setup wallet gateway
  useEffect(() => {
    const gateway = new Gateway(wallet, verbose)
    return gateway.terminate
  }, [])

  return (
    <iframe
      id={appId + '-iframe'}
      src={src}
      title={title || `${appId} on Senhub`}
      style={{
        height: 'calc(100vh - 64px)',
        margin: -12,
        marginTop: -24,
        border: 'none',
        width: '100vw',
      }}
      loading="lazy"
      allowFullScreen
    />
  )
}

export default EmbededView
