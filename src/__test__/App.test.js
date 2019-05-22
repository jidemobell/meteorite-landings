import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import React from 'React';
import { shallow, mount, render } from 'enzyme';
import ReactDOM from 'react-dom';
// import {act} from 'react-dom/test-utils';
import App from '../App';




// let container;

// beforeEach(() => {
//     container = document.createElement('div');
//     document.body.appendChild(container);
// });

// afterEach(() => {
//     document.body.removeChild(container);
//     container = null;
// })

// it('can render a table ', ()=> {
//     act(() => {
//         ReactDOM.render(<App />, container);
//         const button = container.querySelector('.enter');

//         expect(button.hasAttribute("value")).toBe(true);
//     })
// })

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
})

describe('App component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
      });
    
    it('it has a text instead of a table', () => {
        const wrapper = shallow(<App />);
        const beforeTable = wrapper.find('span.initial').text();
        expect(beforeTable).toEqual(
            'Please search a meteor landing by name or simply click search to list all landings'
        );
    
    })
    
    it("it has a new text if table don't render", () => {
        const wrapper = shallow(<App />);
        const beforeTable = wrapper.find('span.initial').text();
        const search = wrapper.find('input.enter');
        search.simulate('click');
        setTimeout(() => {
            expect(beforeTable).toEqual('Please confirm your meteor query'); 
        }, 3000);
    })
})


