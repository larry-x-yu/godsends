import React from "react";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Home from "./Home";

configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';

const wrapper = shallow(<Home />);