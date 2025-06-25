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
      className={`w-full px-4 sm:px-6 lg:px-8 xl:px-12 mx-auto ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
