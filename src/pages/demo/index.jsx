import React from 'react';
import img from '../../assets/img/xb.jpg';
import './index.less';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleClick = () => {
    this.setState((preState) => {
      return {
        count: preState.count + 1
      }
    });
  };

  render() {
    const { count } = this.state;
    // 可选链操作
    const data = count?.data;
    console.log('data', data);
    return (
      <div className="demo">
        <div className="demo__img">
          <img src={img} alt="" />
        </div>
        <div>{count}</div>
        <button onClick={this.handleClick}>点我试试</button>
      </div>
    );
  }
}

export default Demo;
