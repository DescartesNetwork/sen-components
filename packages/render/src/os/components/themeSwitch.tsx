import { useEffect, useMemo, useState } from 'react'

import { Switch } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

export type Theme = 'light' | 'dark'

export type ThemeSwitchProps = {
  defaultTheme?: Theme
}

const ThemeSwitch = ({ defaultTheme = 'light' }: ThemeSwitchProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    document.body.setAttribute('id', theme)
  }, [theme])
  const checked = useMemo(() => theme === 'dark', [theme])

  return (
    <Switch
      checked={checked}
      onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      checkedChildren={<IonIcon name="moon-outline" />}
      unCheckedChildren={<IonIcon name="sunny-outline" />}
    />
  )
}

export default ThemeSwitch
