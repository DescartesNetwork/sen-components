import EmbededView from '@sentre/embeded-view'
import { Col, Divider, Row, Typography } from 'antd'

import './index.less'

const wallet: any = {
  getAddress: async () => '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
  signTransaction: async () => {},
  signAllTransactions: async () => {},
  signMessage: async () => {},
}

const View = () => {
  return (
    <Row gutter={[24, 24]} id="senhub">
      <Col span={24}>
        <Divider style={{ margin: 0, width: '100%' }} />
      </Col>
      <Col span={24}>
        <Typography.Text>App</Typography.Text>
      </Col>
      <Col span={24}>
        <Typography.Text className="app-isolated-text">
          App: Test Style Module
        </Typography.Text>
      </Col>
      <Col span={24}>
        <EmbededView
          appId="sypool"
          title="Sypool Embeded View"
          wallet={wallet}
          src="https://app.sypool.io/"
          verbose
        />
      </Col>
    </Row>
  )
}

export default View
