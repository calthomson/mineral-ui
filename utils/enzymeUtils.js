/* @flow */
import React from 'react';
import { mount } from 'enzyme';
import type { ReactWrapper } from 'enzyme';
import ThemeProvider from '../src/library/themes/ThemeProvider';

export const mountInThemeProvider = (
  Component: React$Element<*>,
  options: { attachToDom?: boolean } = {}
) => {
  let mountNode, mountOptions;

  if (options.attachToDom) {
    mountNode = global.document.createElement('div');
    global.document.body.appendChild(mountNode);

    mountOptions = {
      attachTo: mountNode
    };
  }

  const themeProvider = mount(
    <ThemeProvider>{Component}</ThemeProvider>,
    mountOptions
  );

  if (options.attachToDom) {
    // $FlowFixMe - Add custom destroy function to make test cleanup easier
    themeProvider.destroy = () => {
      global.document.body.removeChild(mountNode);
      themeProvider.detach();
    };
  }

  const component = themeProvider.find(Component.type);

  return [themeProvider, component];
};

export const spyOn = (wrapper: ReactWrapper, method: string) => {
  const spy = jest.spyOn(wrapper.instance(), method);
  // https://github.com/airbnb/enzyme/issues/365#issuecomment-362166762
  wrapper.instance().forceUpdate();
  return spy;
};
