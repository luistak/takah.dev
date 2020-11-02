import 'styled-components';

export const tokens = {
  colors: {
    gray: {
      100: '#4e4d4d',
      200: '#262626',
    },
    white: '#ffffff',
  },
};

export type PomodoroTheme = typeof tokens;

declare module 'styled-components' {
  export interface DefaultTheme extends PomodoroTheme {}
}
