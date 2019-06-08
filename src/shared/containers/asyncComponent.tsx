import React, { Component } from "react";
import { message } from 'antd';

interface Props {}

export default function asyncComponent(importComponent: Function) {

  class AsyncComponent extends Component <Props> {
    state: any;
    constructor(props: Props) {
      super(props);
      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent()
        .catch((e: Error) => {
          message.error(e.message);
        });
      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
