import Image from "next/image";
import { Box } from "./Card";


export function ImageBox({ image}) {
    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
    }
     const bodyText = (text, wordLimit = 1) => {
    const words = text.trim().split("-");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  return (
    <Box style={style}>
      <div className="image-box">
        <Image src={image.path} alt="Image name" width={image.dimensions.width} height={image.dimensions.height} />
      </div>
      <div className="image-details">{bodyText(image.name)}</div>
    </Box>
  );
}
