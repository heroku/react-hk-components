import registerRequireContextHook from 'babel-plugin-require-context-hook/register'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
registerRequireContextHook()

Enzyme.configure({ adapter: new Adapter() })
