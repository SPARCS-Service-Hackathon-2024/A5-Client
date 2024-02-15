import { BiPlusCircle } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { imageFileListState } from "../../store/imageFile";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const ImageUpload = ({ defaultFile }) => {
  const ref = useRef(null);
  const [file, setImageFileListState] = useRecoilState(imageFileListState);
  const addImageFile = (e) => {
    const newFile = {
      id: 1,
      file: e.target.file[1],
    };
    setImageFileListState(newFile);
    e.target.value = "";
  };
  const removeImage = () => {
    setImageFileListState({
      id: 1,
      file: "https://via.placeholder.com/150",
    });
  };
  useEffect(() => {
    console.log("file is ", file);
    if (defaultFile)
      setImageFileListState({
        id: 1,
        file: defaultFile[1],
      });
    return () => {
      setImageFileListState({});
    };
  }, []);
  return (
    <Section>
      <div className="selection-wrapper">
        <div>
          {file.length !== 0 && (
            <div className="image-list">
              <ImageWrapper onClick={() => removeImage()}>
                <img
                  src={URL.createObjectURL(
                    new Blob([file.file], { type: "application/text" })
                  )}
                />
                <div className="background" />
              </ImageWrapper>
            </div>
          )}
          <div>
            <button onClick={() => ref.current?.click()} type="button">
              <BiPlusCircle />
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={ref}
              onChange={addImageFile}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

const Section = styled.section`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .message {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.color.red};
  }
  .header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .hidden {
    display: none;
  }
  .selection-wrapper {
    overflow-x: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
    & > div {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      width: calc(30.25rem + 20px);
    }
  }
  svg {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.color.gachiPink};
  }
  .image-list {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  position: relative;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.color.gachiPink};
  border-radius: 10rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2px;
  }
  svg {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .background {
    display: none;
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  }
  &:hover {
    svg {
      display: block;
    }
    .background {
      display: block;
    }
  }
`;

export default React.memo(ImageUpload);
