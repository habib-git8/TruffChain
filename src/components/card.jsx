import React from 'react';
import classnames from 'classnames'; // This imports the classnames library

const Card = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={classnames('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
      {...rest}
    />
  );
});
Card.displayName = 'Card';

// Repeat this update for all components

const CardHeader = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={classnames('flex flex-col space-y-1.5 p-6', className)}
      {...rest}
    />
  );
});
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <h3
      ref={ref}
      className={classnames('text-2xl font-semibold leading-none tracking-tight', className)}
      {...rest}
    />
  );
});
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <p
      ref={ref}
      className={classnames('text-sm text-muted-foreground', className)}
      {...rest}
    />
  );
});
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={classnames('p-6 pt-0', className)}
      {...rest}
    />
  );
});
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={classnames('flex items-center p-6 pt-0', className)}
      {...rest}
    />
  );
});
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
