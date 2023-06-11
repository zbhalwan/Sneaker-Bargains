declare module 'firebase' {
    export const auth: any;
    export const provider: any;
    export function signInWithPopup(auth: any, provider: any): Promise<any>;
  }
  