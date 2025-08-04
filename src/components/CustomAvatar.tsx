import React from "react";

interface CustomAvatarProps {
  alt: string;
  name: string;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ alt, name }) => {
  return <div>CustomAvatar</div>;
};

export default CustomAvatar;
