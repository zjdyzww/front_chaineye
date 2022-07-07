import React, { Component } from 'react';
import { Layout, Input, Col, Row, Card } from 'antd'
import { AudioOutlined } from '@ant-design/icons';
import LineEcharts from '../../components/Echarts/LineEcharts';
import request from '@/utils/request';
import { RequestMethod } from '@/store/common';
import Axis from 'axios';
import './index.less';

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

export default class brower extends Component {
    state = {
        data: {
            x: ['2019-11-21', '2019-11-22', '2019-11-23', '2019-11-24', '2019-11-25', '2019-11-26'],
            y: [20, 50, 80, 70, 45, 85]
        },
        result: ""
    }

    componentDidMount() {

    }

    getBrainParams(data) {
        return request('/api/n9e/xuperchain/tx/query', {
            method: "GET",
            data
        }).then((res) => {
            console.log(res)
            return res.data;
        });
        // Axios.get(`/api/n9e/chaineye/api/n9e/xuperchain/tx/query?chain_name=${data.chain_name}&input=${data.input}`, {
        //     headers: {
        //         "jwttoken": localStorage.getItem('token')
        //     }
        // }).then(res => {
        //     console.log(res);
        // })
    };

    onSearch(e) {
        let data = {
            "chain_name": "xuper",
            "input": e
        }
        let result = this.getBrainParams(data);
        this.setState({
            result: result
        })
    }


    render() {
        const { data, result } = this.state;
        return (
            <Layout>
                <Header className='header'>
                    <Search placeholder="区块高度、区块哈希、交易" size='large' onSearch={(e) => { this.onSearch(e) }} style={{ width: 600, height: "100px", marginTop: "60px" }} />
                </Header>
                <Content className='Content'>
                    <Row>
                        <Col span={12} className='rowleft'>
                            <Row className='rowleftRow'>
                                <Col span={24} className='rowleftTop'>
                                    <div>
                                        <p>区块高度</p>
                                        <p className="textNum">{result.block_height}</p>
                                    </div>
                                    <div>
                                        <p>交易总数</p>
                                        <p className="textNum">{result.block_height}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='rowleftCenterRow'>
                                <Col span={12}>
                                    <p>合约数</p>
                                    <p className="textNum">5,459个</p>
                                </Col>
                                <Col span={12}>
                                    <p>节点数</p>
                                    <p className="textNum">5,459个</p>
                                </Col>
                            </Row>
                            <Row className='rowleftRightRow'>
                                <Col span={12}>
                                    <p>平均出块时间</p>
                                    <p className="textNum">3秒</p>
                                </Col>
                                <Col span={12}>
                                    <p>历史并发峰值</p>
                                    <p className="textNum">356笔/秒</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12} className='rowright'>
                            <LineEcharts data={data} yname="交易数" />
                        </Col>
                    </Row>
                </Content>
                {/* 交易 */}
                <Footer className='Footer'>
                    <div>摘要</div>
                    <Row gutter={16} className='CardgutterRow'>
                        <Col span={12}>
                            <Card bordered={false} className='Cardgutter'>
                                <p className="block"><span>交易类型</span>普通</p>
                                <p className="block"><span>交易哈希</span>285cac9f2472b3fa960f5f1549f90dd538f6f612cff5275e09bb2f2513c9d4c0</p>
                                <p className="block"><span>区块高度</span>26265655</p>
                                <p className="block"><span>出块时间</span>2022/07/07 16:14:33</p>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false} className='Cardgutter'>
                                <p className="block"><span>交易发起时间</span>2022/07/07 16:14:30</p>
                                <p className="block"><span>交易发起金额</span>123</p>
                                <p className="block"><span>交易接收金额</span>0</p>
                                <p className="block"><span>手续费</span>0</p>
                            </Card>
                        </Col>
                    </Row>
                </Footer>
                <Footer className='Footer'>
                    <div>交易</div>
                    <Row gutter={16} className='CardgutterRow'>
                        <Col span={12}>
                            <Card bordered={false} className='Cardgutter'>
                                <p className="block"><span>发起方</span>1</p>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false} className='Cardgutter'>
                                <p className="block"><span>接收方</span>ZJRX8iqEraWuKAZC4Kf7y28uF1saEAgxf</p>
                            </Card>
                        </Col>
                    </Row>
                </Footer>
                {/* 块 */}
                <Footer className='Footer'>
                    <div>摘要</div>
                    <Row gutter={16} className='CardgutterRow'>
                        <Col span={12}>
                            <Card bordered={false} className='Cardgutter'>
                                <p className="block"><span>区块高度</span>12312312313</p>
                                <p className="block"><span>普通交易数量</span>1</p>
                                <p className="block"><span>播报方</span>ZJRX8iqEraWuKAZC4Kf7y28uF1saEAgxf</p>
                                <p className="block"><span>时间</span>2022/07/07 16:14:33</p>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false} className='Cardgutter'>
                                <p className="block"><span>区块哈希</span>12312312313</p>
                                <p className="block"><span>前一个区块哈希</span>12312312313</p>
                                <p className="block"><span>后一个区块哈希</span>12312312313</p>
                            </Card>
                        </Col>
                    </Row>
                </Footer>
                <Footer className='Footer'>
                    <div>交易</div>
                    <Row gutter={16} className='CardgutterRow'>
                        <Col span={12}>
                            <Card bordered={false} className='Cardgutter'>
                                <p className="block"><span>交易编号：</span>6eff25ec994c6ccbab84dde0d7536268ee47bbd4ab0106071a1fe95c4cf67739</p>
                                <p className="block"><span>发起方</span>1</p>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false} className='Cardgutter'>
                                <p className="block"><span>手续费</span>0</p>
                                <p className="block"><span>接收方</span>ZJRX8iqEraWuKAZC4Kf7y28uF1saEAgxf</p>
                                <p className="block"><span>总金额</span>0</p>
                            </Card>
                        </Col>
                    </Row>
                </Footer>
            </Layout>
        )
    }
}