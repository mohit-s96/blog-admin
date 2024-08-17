import { ReactElement } from "react";

interface Props {
  src: string;
  alt: string;
}

function BlogImage({ alt, src }: Props): ReactElement {
  return (
    <div className="flex p-2 m-1 w-full justify-center">
      <img src={src} alt={alt} title={alt} className="" />
    </div>
  );
}

export default BlogImage;
