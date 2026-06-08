jest.mock('react-native-svg', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (props: any) => React.createElement('Svg', props, props.children),
    Svg: (props: any) => React.createElement('Svg', props, props.children),
    Circle: (props: any) => React.createElement('Circle', props, props.children),
    Defs: (props: any) => React.createElement('Defs', props, props.children),
    LinearGradient: (props: any) => React.createElement('LinearGradient', props, props.children),
    Stop: (props: any) => React.createElement('Stop', props, props.children),
  };
});

jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (props: any) => React.createElement('DateTimePicker', props, props.children),
  };
});

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  return {
    __esModule: true,
    Ionicons: (props: any) => React.createElement('Ionicons', props, props.children),
    AntDesign: (props: any) => React.createElement('AntDesign', props, props.children),
  };
});

jest.mock('expo-router', () => {
  return {
    __esModule: true,
    router: {
      navigate: jest.fn(),
      back: jest.fn(),
    },
    useLocalSearchParams: () => ({}),
  };
});

jest.mock('react-native-paper', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    PaperProvider: (props: any) => React.createElement(View, props, props.children),
    Portal: (props: any) => React.createElement(View, props, props.children),
    Modal: (props: any) => React.createElement(View, props, props.children),
    IconButton: (props: any) => React.createElement(View, props, props.children),
    RadioButton: (props: any) => React.createElement(View, props, props.children),
    ActivityIndicator: (props: any) => React.createElement(View, props, props.children),
    Searchbar: (props: any) => React.createElement(View, props, props.children),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});