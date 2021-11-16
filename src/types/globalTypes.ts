import { ImageData } from "./blogTypes";

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

export interface NewImageData {
  permUri?: SupaUploadResponseType[];
  alt: string;
  uri?: string;
  isHero?: boolean | undefined;
}

export type SlugType = "html" | "md" | "nm";

export interface SlugTuple {
  name: string;
  type: SlugType;
}

export type EditorActionType =
  | "TITLE"
  | "EXCERPT"
  | "RTIME"
  | "BODY"
  | "TAGS"
  | "HEROIMG"
  | "ALL"
  | "REM_IMG"
  | "ADD_FILE"
  | "CHANGE_MODE"
  | "SET_COMMENT"
  | "SET_SLUG"
  | "SET_LOADING"
  | "SET_ERROR"
  | "SET_PERM_URI";

export type Action = {
  type: EditorActionType;
  payload: any;
};

export interface EditorType {
  title: string;
  heroImg: ImageData[];
  tags: Array<string>;
  excerpt: string;
  readingTime: string;
  body: string;
  files: FilesData[];
  slugType: SlugType;
  commentsAllowed: boolean;
  author?: string;
  slug: string;
  loading?: boolean;
  error?: string;
  dispatch?: React.Dispatch<Action>;
}

export type WidthActionType =
  | "E-RECT"
  | "P-RECT"
  | "E-WIDTH"
  | "P-WIDTH"
  | "PARENT";

export type WidthAction = {
  type: WidthActionType;
  payload: any;
};

export interface WidthContextType {
  editorRect: DOMRect | {};
  previewRect: DOMRect | {};
  parentRect: DOMRect | {};
  editorWidth: number | null;
  previewWidth: number | null;
  wDispatch?: React.Dispatch<WidthAction>;
}

export type SupaUploadResponseType = {
  data: {
    Key: string;
  } | null;
  error: Error | null;
};

export type UploadResponse = {
  message: string;
  uri: SupaUploadResponseType[];
};
