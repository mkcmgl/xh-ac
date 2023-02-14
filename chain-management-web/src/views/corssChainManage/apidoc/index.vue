<template>
    <div class="app-container">
        <div class="title">跨链通道API文档</div>
        <!-- <section class="apidoc">
            <h1>跨链功能说明及API接口</h1>
            <p>更新时间 2021-4-14 17:15:01</p>
            <p>本文将阐述跨链功能的技术实现及使用方法。</p>
            <h3>目录</h3>
            <hr>
            </hr>
            <h3>1.功能说明</h3>
            <h3>2.快速开始</h3>
            <h3>3.API文档</h3>
            <hr>
            </hr>
            <h2>1.功能说明</h2>
            <img src="../../../assets/images/crossChain.jpg"></img>
            <h3>1.1 跨链功能时序图</h3>
            <ul>
                <li>1.应用A将业务数据写入子链A</li>
                <li>2.子链A返回txHashA</li>
                <li>3.应用A调用接口将业务数据的hash及txHash写入主链</li>
                <li>4.应用B通过WebSocket订阅业务数据变化，当有业务新增或变动的时候，主链推送变化给应用B</li>
                <li>5.应用B处理业务，并将处理结果写入子链B</li>
                <li>6.子链B返回txHashB</li>
                <li>7.应用B调用接口将处理结果数据的Hash及txHashB写入主链</li>
            </ul>
            <h3>1.2 跨链数据交互时序图</h3>
            <p>从1.1中可以看到，业务数据本身是存储在应用子链上的，当需要获取业务数据时，我们通过如下流程获取</p>
            <ul>
                <li>1.应用收到通知，有一个新的业务变动，于是以这次业务变动对应的主链交易Hash为参数，请求主链获取业务数据</li>
                <li>2.主链通过主链交易hash找到对应的子链的交易hash、对应上链应用的数据获取API地址，朝数据上链方(图中假设为应用B)请求数据</li>
                <li>3.应用B通过交易hash查询子链B，获取写入的业务数据</li>
                <li>4.子链B返回业务数据给应用B</li>
                <li>5.应用B返回业务数据给主链</li>
                <li>6.主链返回业务数据给应用A</li>
            </ul>
            <h2>2.快速开始</h2>
            <h3>2.1 创建跨链通道</h3>
            <p>跨链通道对应主链上的一个智能合约，创建跨链通道即在主链上部署一个智能合约。您和您的业务关联方的上链数据都会记录在此合约中。</p>
            <h3>2.2 添加跨链通道成员</h3>
            <p>在跨链通道列表中，选择对应的跨链通道，点击“成员”按钮，即可添加成员。添加成员的三个参数含义如下。</p>
            <ul>
                <li>1.成员名称：成员的名称备注</li>
                <li>2.成员账号：成员在平台的登录账号</li>
                <li>3.获取数据URL：成员应该提供一个接口，用于主链去获取业务数据。</li>
            </ul>
            <h3>2.3 创建交易</h3>
            <p>我们以图书借还业务来描述整个交易流程。 应用调用API，针对某个具体的业务，创建一个交易，开始一个业务流程。</p>
            <p>此处业务是图书借还，那么创建一个交易，借走一本书。</p>
            <h3>2.4 监听交易</h3>
            <p>应用B通过WebSocket订阅跨链通道事件。即图书馆收到借书事件</p>
            <h3>2.5 获取业务数据</h3>
            <p>应用B通过事件在主链的交易hash，调用接口查询业务数据。即查询谁借走了书，借走了哪本书，预期什么时候归还。</p>
            <h3>2.6 更新业务数据</h3>
            <p>应用B获取到业务数据后，对业务数据进行处理，将处理结果写入子链B。随后将子链的交易Hash和业务处理结果数据hash写入主链</p>
        </section> -->
        <div class="markdown-body">
            <myMarkdown />
        </div>
    </div>
</template>
<script>
import myMarkdown from "../../../assets/main-chain.md";
// 代码高亮
import "highlight.js/styles/github.css";
// 其他元素使用 github 的样式
import "github-markdown-css";
export default {
    name: 'apidoc',
    components: {
        myMarkdown
    },
    data() {
        return {

        };
    },

    mounted() {
    }
        ,

    methods: {

    },
};
</script>

<style lang="scss" scoped>
.markdown-body code,
.markdown-body pre {
    font-family: "-apple-system", BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, "sans-serif", "Apple Color Emoji", "Segoe UI Emoji" !important;
    font-size: 16px !important;
}

.app-container {

    h1,
    h2,
    h3 {

        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 800;
        line-height: 1.25;
        font-size: 24px;
    }

    h1 {
        padding-bottom: 10px;
        border-bottom: 1px solid #eaecef;
    }

    h2 {
        font-size: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eaecef;
    }

    h3 {
        font-size: 18px;
    }

    hr {
        height: 0.25em;
        padding: 0;
        margin: 24px 0;
        background-color: #e1e4e8;
        border: 0;
    }

    img {
        max-width: 100%;
        -webkit-box-sizing: initial;
        box-sizing: initial;
        background-color: #fff;
    }

    ul {
        padding: 0 16px 16px;
        list-style: none;

        li {
            margin: 10px 0;
        }
    }
}
</style>