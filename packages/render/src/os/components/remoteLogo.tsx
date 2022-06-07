import { Avatar } from 'antd'
import { useEffect, useState } from 'react'

const fetchAsset = async () => {
  try {
    const res = await fetch(window.location.origin + '/asset-senhub.json')
    return await res.json()
  } catch (er) {
    return {}
  }
}

const RemoteLogo = () => {
  const [src, setSrc] = useState('')

  useEffect(() => {
    ;(async () => {
      const { logo } = await fetchAsset()
      return setSrc(logo)
    })()
  }, [])

  return <Avatar src={src} shape="square" />
}

export default RemoteLogo
