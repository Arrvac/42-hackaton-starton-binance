import {
  ChangeEvent,
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import { ReactComponent as UploadIcon } from "../assets/svg-icons/download-square.svg";
import { Button, createTheme, TextField } from "@mui/material";
import { colors } from "../theme/colors";
import { getS3Url, uploadFile } from "../services/image";
import { api } from "../services/api";
import { Navbar } from "../components/Navbar";
import axios from "axios";

const FormData = require("form-data");

const starton = axios.create({
  baseURL: "https://api.starton.io/v2",
  headers: {
    "x-api-key": "39TGReMLuduQkPr978dxj9mUdIBHKWkO",
  },
});

export const CreateBooks: FC = () => {
  const inputFile = useRef() as MutableRefObject<HTMLInputElement>;

  const [imageName, setImageName] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);

  const [alreadySubmit, setAlreadySubmit] = useState(false);

  const uploadImage = async (image: File) => {
    const data = await getS3Url();
    const res = await uploadFile(image, data.url);
    if (!res.errorMessage) {
      setImageName(res.uploadedFilename ?? null);
    }
  };

  const deleteLogo = async () => {
    inputFile.current.value = "";
    setImageName(null);
  };

  const uploadMetadataOnIpfs = async (media_url: string) => {
    const metadataJson = {
      name: name,
      description: description,
      author: author,
      media_url: media_url,
    };
    const ipfsMetadata = await starton.post("/pinning/content/json", {
      name: name,
      content: metadataJson,
      isSync: true,
    });
    return ipfsMetadata.data;
  };

  const handleSubmit = async () => {
    const metaData = await uploadMetadataOnIpfs(
      `https://d2q4io46p490bd.cloudfront.net/${imageName}`,
    );

    await starton.post(
      "/smart-contract/avalanche-fuji/0x8111436514De4a9407761aae536626D60EedEDEf/call",
      {
        functionName: "safeMint",
        signerWallet: "0x0cd6392592d1b7B4bf2BcE009f6a1aCC8899C645",
        speed: "low",
        params: [
          document.cookie, // address 0x0000000000000000000000000000000000000000
          metaData.pinStatus.pin.cid, // string 'my metadataURI'
        ],
      },
    );

    await api.post(`/books`, {
      media_url: `https://d2q4io46p490bd.cloudfront.net/${imageName}`,
      name: name,
      description: description,
      address: document.cookie,
      author: author,
    });
    setAlreadySubmit(true);
    return;
  };

  return (
    <>
      <Navbar />
      <CardWrapper>
        <FormWrapper>
          <Title>Publication d'un livre</Title>
          <InputsWrapper>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              onChange={(text: any) => {
                setName(text.target.value);
              }}
            />
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              onChange={(text: any) => {
                setDescription(text.target.value);
              }}
            />
            <TextField
              id="standard-basic"
              label="Auteur"
              variant="standard"
              onChange={(text: any) => {
                setAuthor(text.target.value);
              }}
            />
          </InputsWrapper>

          <input
            ref={inputFile}
            type="file"
            style={{ display: "none" }}
            onChange={(e: any) => uploadImage(e.target.files[0])}
          />
          {imageName ? (
            <UploadContainer>
              <Label>{"Book's cover"}</Label>
              <Upload>
                {imageName ? (
                  <Logo
                    src={`https://d2q4io46p490bd.cloudfront.net/${imageName}`}
                    alt="Logo"
                  />
                ) : (
                  <UploadText>No image uploaded</UploadText>
                )}
                <ButtonContainer>
                  <Button onClick={deleteLogo}>Delete image</Button>
                </ButtonContainer>
              </Upload>
            </UploadContainer>
          ) : (
            <UploadContainer>
              <Label>{"Logo (facultatif)"}</Label>
              <Upload onClick={() => inputFile.current.click()}>
                <UploadIcon />
                <UploadText>
                  Téléchargez votre image pour qu’elle apparaisse sur
                  l’application mobile. <br />
                </UploadText>
              </Upload>
            </UploadContainer>
          )}

          {!alreadySubmit ? (
            <Button color="error" onClick={() => handleSubmit()}>
              Publier le livre
            </Button>
          ) : null}
        </FormWrapper>
      </CardWrapper>
    </>
  );
};

const CardWrapper = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  padding: 24px;
  width: 750px;
  box-shadow: 0px 12px 24px rgba(186, 186, 186, 0.5);
  border-radius: 8px;
  padding: 8px;
`;

const FormWrapper = styled.form`
  width: 100%;

  & > a:first-child {
    display: inline-block;
    margin-bottom: 12px;
  }

  & > * {
    margin-bottom: 24px;
  }
`;

const InputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  & > * {
    width: 48%;
  }

  @supports (gap: 24px 28px) {
    gap: 24px 28px;
  }
  @supports not (gap: 24px 28px) {
    & > * {
      margin-bottom: 24px;
    }
  }
`;

const UploadContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const Upload = styled.div`
  width: 100%;
  border: 1px dotted ${colors.main.black};
  border-radius: 5px;
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.p`
  margin-top: 0;
  margin-bottom: 4px;
  color: ${colors.main.grey};
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
`;
const UploadText = styled.p`
  color: ${colors.main.grey};
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
`;

const Logo = styled.img`
  width: 50%;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  width: 50%;
`;

const Title = styled.p`
  color: ${colors.main.black};
  font-family: Work Sans;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.01em;
`;
