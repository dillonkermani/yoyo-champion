"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        default: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
        "2xl": "h-20 w-20 text-xl",
      },
      variant: {
        default: "ring-2 ring-gray-200",
        brand: "ring-2 ring-fun-blue shadow-md shadow-fun-blue/25",
        gold: "ring-2 ring-brand-gold shadow-md shadow-brand-gold/25",
        none: "",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  online?: boolean;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, variant, online, ...props }, ref) => (
  <div className="relative inline-block">
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size, variant, className }))}
      {...props}
    />
    {online !== undefined && (
      <span
        className={cn(
          "absolute bottom-0 right-0 block rounded-full ring-2 ring-white",
          size === "xs" && "h-1.5 w-1.5",
          size === "sm" && "h-2 w-2",
          (size === "default" || !size) && "h-2.5 w-2.5",
          size === "lg" && "h-3 w-3",
          size === "xl" && "h-3.5 w-3.5",
          size === "2xl" && "h-4 w-4",
          online ? "bg-xp" : "bg-gray-400"
        )}
      />
    )}
  </div>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-700 font-medium",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Avatar group for showing multiple users
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: VariantProps<typeof avatarVariants>["size"];
  children: React.ReactNode;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max = 4, size = "default", children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = childArray.slice(0, max);
    const remainingCount = childArray.length - max;

    const overlapMap = {
      xs: "-space-x-2",
      sm: "-space-x-2.5",
      default: "-space-x-3",
      lg: "-space-x-4",
      xl: "-space-x-5",
      "2xl": "-space-x-6",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          overlapMap[size || "default"],
          className
        )}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div key={index} className="relative" style={{ zIndex: max - index }}>
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
                  size,
                })
              : child}
          </div>
        ))}
        {remainingCount > 0 && (
          <Avatar size={size} variant="default" className="bg-gray-100">
            <AvatarFallback className="text-gray-500 text-xs">
              +{remainingCount}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

// User avatar with name and role
export interface UserAvatarProps extends AvatarProps {
  name?: string;
  role?: string;
  src?: string;
  showInfo?: boolean;
}

const UserAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  UserAvatarProps
>(({ name, role, src, showInfo = false, size, variant, className, ...props }, ref) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  if (showInfo) {
    return (
      <div className="flex items-center gap-3">
        <Avatar ref={ref} size={size} variant={variant} className={className} {...props}>
          <AvatarImage src={src} alt={name || "User"} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          {name && <span className="text-sm font-medium text-gray-900">{name}</span>}
          {role && <span className="text-xs text-gray-500">{role}</span>}
        </div>
      </div>
    );
  }

  return (
    <Avatar ref={ref} size={size} variant={variant} className={className} {...props}>
      <AvatarImage src={src} alt={name || "User"} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
});
UserAvatar.displayName = "UserAvatar";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, UserAvatar };
