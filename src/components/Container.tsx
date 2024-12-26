import { CSSProperties } from 'react';

interface ContainerProps {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  className,
}) => {
  return (
    <div
      className={`w-[90%] h-[90%] mx-auto flex flex-col mb-10  ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
