import { ReactElement } from "react";
import { SupaUploadResponseType } from "../../types/globalTypes";

interface Props {
  uris: SupaUploadResponseType[];
  alt: string;
  className?: string;
}

function ResImage({ uris, alt, className = "" }: Props): ReactElement {
  return (
    <picture>
      <source media="(max-width: 799px)" srcSet={uris[1].data?.Key} />
      <source media="(min-width: 800px)" srcSet={uris[2].data?.Key} />
      <img
        src={uris[2].data?.Key}
        alt={alt}
        className={className}
        width="400"
        height="225"
      />
    </picture>
  );
}

export default ResImage;
