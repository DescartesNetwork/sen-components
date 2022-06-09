# Antd Numeric Input

This package wraps [InputNumber](https://ant.design/components/input-number/) in Ant Design.

## Installation

```bash
npm i antd @sentre/antd-numeric-input
```

## Usage

```ts
import { useState } from 'react'
import NumericInput from '@sentre/antd-numeric-input'

const YourReactComponent = () => {
  const [value, setValue] = useState('')
  const max = '1000000000000'

  return <NumericInput value={value} onChange={setValue} ceiling={max} />
}
```

You can find details for props in [https://ant.design/components/input-number/#API](https://ant.design/components/input-number/#API).
