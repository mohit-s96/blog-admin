export type DeviceTypes = "mobile" | "ipad" | "regular";
export type LayoutType = "horiz" | "vert";
export type ThemeType = "light" | "dark" | "neon";
export type SizeVariantType = "sm" | "md";

export type SetThemeType = React.Dispatch<React.SetStateAction<ThemeType>>;

export type ThemeContextType = {
  theme: ThemeType;
  setTheme?: SetThemeType;
};

export type AuthContextType = {
  isAuth: boolean;
  signin: (uname: string, pass: string) => Promise<void>;
  logout: () => void;
};

export interface FilesData {
  file: File;
  blobUri: string;
}

export   interface NewImageData {
  permUri: string;
  alt: string;
  uri: string;
  isHero?: boolean | undefined;
};