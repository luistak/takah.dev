import 'styled-components';

export const tokens = {
  colors: {
    gray: '#262626',
    white: '#ffffff',
  },
};

export type PomodoroTheme = typeof tokens;

declare module 'styled-components' {
  export interface DefaultTheme extends PomodoroTheme {}
}
