import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { ConfigProvider } from 'antd'
import View from 'os/view'

import reportWebVitals from 'reportWebVitals'

render(
  <BrowserRouter>
    <ConfigProvider prefixCls={'sentre'}>
      <View />
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
