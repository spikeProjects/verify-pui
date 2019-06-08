import React from 'react';
import * as enzyme from 'enzyme';
import Login from './login';

it('renders the correct text when no enthusiasm level is given', () => {
  const hello = enzyme.shallow(<Login testNumber={45} />);
  expect(hello.find(".box").text()).toEqual('login page with test number 45;')
});
