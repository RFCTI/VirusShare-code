// src/components/HashList.js

import React from 'react';

class HashList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashList: '',
    };
  }

  handleChange = (event) => {
    this.setState({ hashList: event.target.value });
  };

  showLoading = () => {
    // 在页面中显示等待样式
  };

  hideLoading = () => {
    // 隐藏页面中的等待样式
  };

  sendRequest = (hash) => {
    // 发送请求的逻辑
    this.showLoading();
    // 发送请求的代码
    // ...
    // 请求完成后的回调函数
    // ...
    this.hideLoading();
  };

  sendRequests = () => {
    // 依次发送每个哈希的请求，间隔为 25 秒
    const hashList = this.state.hashList.split('\n');
    hashList.forEach((hash, index) => {
      setTimeout(() => {
        this.sendRequest(hash);
      }, index * 25000); // 25 秒的间隔
    });
  };

  render() {
    return (
      <div>
        <textarea
          id="hash-list"
          value={this.state.hashList}
          onChange={this.handleChange}
        ></textarea>
        <button onClick={this.sendRequests}>Send Requests</button>
      </div>
    );
  }
}

export default HashList;
