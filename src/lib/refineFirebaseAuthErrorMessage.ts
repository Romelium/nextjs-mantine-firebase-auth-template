export default function refineFirebaseAuthErrorMessage(errorMesssage: string): string {
    return errorMesssage
      .replace('Firebase: ', '')
      .replace(/\(auth.*\)\.?/, '');
  }