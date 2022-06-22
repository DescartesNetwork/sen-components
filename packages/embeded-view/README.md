# Embeded View

With regard to projects that has built by themselves on seperate domains, they can be integrated onto Sentre Hub by Embeded View. To fully work on Sentre Hub, the application also needs to natively support [@sentre/connector](https://www.npmjs.com/package/@sentre/connector).

## Installation

```bash
npm i @sentre/embeded-view
```

## Usage

```ts
import EmbededView from '@sentre/embeded-view'

const YourSenhubDApp = () => {
  return (
    <EmbededView
      appId="<your-app-id>"
      src="<your-app-original-url>"
      title="<your-app-description>"
    />
  )
}
```

You can find an example for the integration in [https://github.com/DescartesNetwork/miniroyale-iframe](https://github.com/DescartesNetwork/miniroyale-iframe).
