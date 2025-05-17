declare module '@kinde-oss/kinde-auth-nextjs/server' {
  export function getKindeServerSession(): {
    getUser: () => Promise<any>
  }
}

declare module '@kinde-oss/kinde-auth-nextjs/components' {
  export const RegisterLink: React.FC<{ className?: string }>
  export const LoginLink: React.FC<{ className?: string }>
}
