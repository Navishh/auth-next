// "use client";

// import { logout } from "@/actions/logout";

// interface LogoutButtonProps {
//   children?: React.ReactNode;
// }

// export const LogoutButton = ({ children }: LogoutButtonProps) => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const onClick = () => {
//     logout();
//     return (
//       <span onClick={onClick} className="cursor-pointer">
//         {children}
//       </span>
//     );
//   };
// };
"use client";

import { logout } from "@/actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
