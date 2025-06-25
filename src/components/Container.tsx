import { CSSProperties, forwardRef } from 'react';

interface ContainerProps {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(({
  children,
  style,
  className,
}, ref) => {
  return (
    <div
      ref={ref}
      className={`w-full px-4 sm:px-6 lg:px-8 xl:px-12 mx-auto ${className}`}
      style={style}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';
