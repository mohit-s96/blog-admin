import React, { ReactElement, useContext, useRef, useState } from "react";
import { ImageData } from "../../types/blogTypes";
import { FilesData } from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import { uploadImages } from "../../utils/fetchResource";
import { generateResponsiveImageHtml } from "../../utils/misc";
import Button from "../login/button";
import Input from "../login/input";
import { useTheme } from "../provider/Provider";
import { Upload } from "../svg/svg.collection";
import { EditorContext } from "./editorMain";
import ImageLink from "./imageLink";

interface Props {
  name: string;
  labelClassName?: string;
}

function AddImage({ name, labelClassName }: Props): ReactElement {
  const { dispatch, heroImg, files, slugType } = useContext(EditorContext);

  const { theme } = useTheme();

  const [alt, setAlt] = useState("");

  const [currentFileName, setCurrentFileName] = useState("select an image");

  const [uri, setUri] = useState("");

  const clickRef = useRef(null);

  const setHero = (id: string) => {
    dispatch!({
      type: "SET_HERO_IMG",
      payload: id as any,
    });
  };

  const handleClick = () => {
    if (clickRef.current) {
      (clickRef.current as HTMLInputElement).click();
    }
  };

  const uploadImageAndGenerateHtml = async (
    blobUri: string
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const file = files.find((file) => file.blobUri === blobUri)!;
        const response = await uploadImages([file]);
        let newImages = heroImg.map((img) => {
          if (img.uri === blobUri) {
            img.permUri = response[0].uri;
          }
          return img;
        });

        dispatch!({ payload: newImages as any, type: "SET_PERM_URI" });

        const html = generateResponsiveImageHtml(response[0]);

        resolve(html);
      } catch (error) {
        console.log(error);

        reject((error as any).message);
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file && file.name) {
      setCurrentFileName(file.name);
      const tempUri = window.URL.createObjectURL(file);
      const fileData: FilesData = {
        file,
        blobUri: tempUri,
      };

      dispatch &&
        dispatch({
          payload: files.concat(fileData) as any,
          type: "ADD_FILE",
        });
      setUri(tempUri);
    }
  };

  const handleAdd = () => {
    if (uri.length > 25 && alt) {
      dispatch &&
        dispatch({
          payload: { alt, uri } as ImageData as any,
          type: "HEROIMG",
        });
    }
    setAlt("");
    setUri("");
    setCurrentFileName("select an image");
  };

  const removeImg = (id: string) => {
    setCurrentFileName("select an image");
    dispatch &&
      dispatch({
        payload: id as any,
        type: "REM_IMG",
      });
    const newFiles = files?.filter((file) => file.blobUri !== id);
    window.URL.revokeObjectURL(id);
    dispatch &&
      dispatch({
        payload: newFiles as any,
        type: "ADD_FILE",
      });
  };

  return (
    <div className={`p-2 m-2 flex-col flex items-center w-full`}>
      <div className={`w-10/12 border ${getClasses("border", theme, "btn")}`}>
        <label
          className={`${getClasses(
            "text",
            theme,
            "btn"
          )} p-2 text-lg font-bold w-full ${labelClassName}`}
          style={{
            textAlign: "left",
          }}
        >
          {name}:{" "}
        </label>
        {slugType === "nm" || slugType === "md" ? (
          <>
            <div
              className={`p-2 pl-0 min-h-[24px] w-full flex items-center flex-wrap justify-center`}
            >
              {heroImg.length
                ? heroImg.map((i) => (
                    <ImageLink
                      isHero={i.isHero!}
                      setHero={() =>
                        setHero((i.uri || i.permUri![0].data?.Key) as string)
                      }
                      key={(i.uri || i.permUri![0].data?.Key) as string}
                      theme={theme}
                      uri={(i.uri || i.permUri![0].data?.Key) as string}
                      alt={i.alt}
                      removeCb={() =>
                        removeImg((i.uri || i.permUri![0].data?.Key) as string)
                      }
                      uploadImage={() =>
                        uploadImageAndGenerateHtml(
                          (i.uri || i.permUri![0].data?.Key) as string
                        )
                      }
                    />
                  ))
                : null}
            </div>
            <div className={`p-2 w-full ${getClasses("border", theme, "btn")}`}>
              <span
                onClick={handleClick}
                className={`${getClasses(
                  "text",
                  theme,
                  "btn"
                )} flex w-2/5 justify-between`}
              >
                <Upload
                  color={getClasses("accent", theme, "icon")}
                  className="cursor-pointer hover:scale-150 transition-transform duration-300"
                />
                {currentFileName}
              </span>
              <Input
                name="image alt"
                onChange={(e) => setAlt(e.target.value)}
                type="text"
                value={alt}
                label={false}
                className={`mt-2 p-2`}
              />
              <div className="flex">
                <Button
                  value="add image"
                  onClick={handleAdd}
                  className="mt-0 w-2/12"
                />
              </div>
            </div>
            <Input
              name="add images"
              onChange={handleChange as any}
              type="file"
              label={false}
              className="hidden"
              clickRef={clickRef}
            />
          </>
        ) : (
          <span className={`p-2 block ${getClasses("text", theme, "btn")}`}>
            uploading images from local is only supported when editor mode is
            nomark or markdown
          </span>
        )}
      </div>
    </div>
  );
}

export default AddImage;
