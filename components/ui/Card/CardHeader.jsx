import Image from "next/image";

const CardHeader = ({ image, alt }) => {
  if (!image) return null;

  return (
    <div className="aspect-video relative">
      <Image
        src={image}
        alt={alt || "Card image"}
        fill
        className="object-cover"
      />
    </div>
  );
};

export default CardHeader;
